import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score, confusion_matrix
import joblib
import os
import json

def train():
    data_path = os.path.join(os.path.dirname(__file__), "..", "data", "synthetic_transactions.csv")
    df = pd.read_csv(data_path)
    
    # Feature engineering for XGBoost
    features = [
        "amount", "hour_of_day", "account_age_days", "is_new_device",
        "is_unusual_location", "receiver_is_new", "transaction_velocity",
        "device_age_days"
    ]
    
    # One-hot encode categorical
    df = pd.get_dummies(df, columns=["type"], drop_first=True)
    
    # Update features list
    for col in df.columns:
        if col.startswith("type_"):
            features.append(col)
            
    X = df[features]
    y = df["is_fraud"]
    
    X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)
    X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42, stratify=y_temp)
    
    # Scale positive weights for imbalance
    scale_pos_weight = sum(y_train == 0) / sum(y_train == 1)
    
    model = xgb.XGBClassifier(
        n_estimators=100,
        max_depth=4,
        learning_rate=0.1,
        scale_pos_weight=scale_pos_weight,
        random_state=42
    )
    
    print("Training XGBoost Fraud Classifier...")
    model.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)
    
    # Evaluation
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]
    
    print("Optimization finished. Evaluating...")
    print(classification_report(y_test, y_pred))
    print(f"ROC AUC: {roc_auc_score(y_test, y_prob):.4f}")
    
    # Save artifacts
    model_dir = os.path.join(os.path.dirname(__file__), "..", "artifacts", "fraud_model")
    os.makedirs(model_dir, exist_ok=True)
    
    model_path = os.path.join(model_dir, "xgb_v1.joblib")
    joblib.dump(model, model_path)
    
    # Save metadata
    metadata = {
        "model_name": "XGBoost Fraud Classifier",
        "version": "xgb-v1",
        "features": features,
        "metrics": {
            "roc_auc": roc_auc_score(y_test, y_prob)
        }
    }
    with open(os.path.join(model_dir, "metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train()
