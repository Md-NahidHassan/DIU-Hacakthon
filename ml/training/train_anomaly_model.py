import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib
import os
import json

def train():
    data_path = os.path.join(os.path.dirname(__file__), "..", "data", "synthetic_transactions.csv")
    df = pd.read_csv(data_path)
    
    # Train primarily on normal cases to detect anomalies
    normal_df = df[df["is_fraud"] == 0]
    
    features = [
        "amount", "hour_of_day", "transaction_velocity", 
        "account_age_days", "device_age_days"
    ]
    
    X = normal_df[features]
    
    print("Training Isolation Forest Anomaly Model...")
    model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
    model.fit(X)
    
    model_dir = os.path.join(os.path.dirname(__file__), "..", "artifacts", "anomaly_model")
    os.makedirs(model_dir, exist_ok=True)
    
    model_path = os.path.join(model_dir, "iforest_v1.joblib")
    joblib.dump(model, model_path)
    
    metadata = {
        "model_name": "Isolation Forest Behavior Anomaly",
        "version": "iforest-v1",
        "features": features
    }
    with open(os.path.join(model_dir, "metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train()
