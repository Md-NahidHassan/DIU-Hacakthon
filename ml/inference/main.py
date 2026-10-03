import os
import json
import joblib
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import shap

app = FastAPI(title="upay Shield Phase 3 Inference Servce")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Models
base_dir = os.path.dirname(__file__)
fraud_dir = os.path.join(base_dir, "..", "artifacts", "fraud_model")
anomaly_dir = os.path.join(base_dir, "..", "artifacts", "anomaly_model")
graph_dir = os.path.join(base_dir, "..", "artifacts", "network_model")

fraud_model = None
anomaly_model = None
network_graph = None
meta = {}
explainer = None

try:
    fraud_model = joblib.load(os.path.join(fraud_dir, "xgb_v1.joblib"))
    with open(os.path.join(fraud_dir, "metadata.json")) as f:
        meta["fraud"] = json.load(f)["version"]
        
    anomaly_model = joblib.load(os.path.join(anomaly_dir, "iforest_v1.joblib"))
    with open(os.path.join(anomaly_dir, "metadata.json")) as f:
        meta["anomaly"] = json.load(f)["version"]
        
    network_graph = joblib.load(os.path.join(graph_dir, "graph_v1.joblib"))
    with open(os.path.join(graph_dir, "metadata.json")) as f:
        meta["network"] = json.load(f)["version"]
        
    # Keep raw metadata for metrics endpoint
    with open(os.path.join(fraud_dir, "metadata.json")) as f:
        meta["fraud_raw"] = json.load(f)
    with open(os.path.join(anomaly_dir, "metadata.json")) as f:
        meta["anomaly_raw"] = json.load(f)
    with open(os.path.join(graph_dir, "metadata.json")) as f:
        meta["network_raw"] = json.load(f)
        
    # Setup SHAP explainer
    explainer = shap.TreeExplainer(fraud_model)
except Exception as e:
    print(f"Error loading models: {e}")

class TransactionInput(BaseModel):
    amount: float
    type: str
    hourOfDay: int
    isNewDevice: bool
    isUnusualLocation: bool
    accountAgeDays: int
    receiverIsNew: bool
    transactionVelocity: int = 0
    deviceAgeDays: int = 300

@app.get("/health")
def health():
    return {
        "status": "ONLINE",
        "models": {
            "fraud": fraud_model is not None,
            "anomaly": anomaly_model is not None,
            "network": network_graph is not None,
            "shap": explainer is not None
        }
    }

@app.get("/metrics")
def get_metrics():
    return {
        "fraud": meta.get("fraud_raw", {}),
        "anomaly": meta.get("anomaly_raw", {}),
        "network": meta.get("network_raw", {})
    }

def prepare_fraud_features(tx: TransactionInput):
    # Match the features trained: "amount", "hour_of_day", "account_age_days", "is_new_device", "is_unusual_location", "receiver_is_new", "transaction_velocity", "device_age_days", type_SEND_MONEY...
    df = pd.DataFrame([{
        "amount": tx.amount,
        "hour_of_day": tx.hourOfDay,
        "account_age_days": tx.accountAgeDays,
        "is_new_device": int(tx.isNewDevice),
        "is_unusual_location": int(tx.isUnusualLocation),
        "receiver_is_new": int(tx.receiverIsNew),
        "transaction_velocity": tx.transactionVelocity,
        "device_age_days": tx.deviceAgeDays if not tx.isNewDevice else 0,
        "type_CASH_OUT": 1 if tx.type == "CASH_OUT" else 0,
        "type_MERCHANT_PAY": 1 if tx.type == "MERCHANT_PAY" else 0,
        "type_SEND_MONEY": 1 if tx.type == "SEND_MONEY" else 0
    }])
    return df

def prepare_anomaly_features(tx: TransactionInput):
     # "amount", "hour_of_day", "transaction_velocity", "account_age_days", "device_age_days"
     return pd.DataFrame([{
         "amount": tx.amount,
         "hour_of_day": tx.hourOfDay,
         "transaction_velocity": tx.transactionVelocity,
         "account_age_days": tx.accountAgeDays,
         "device_age_days": tx.deviceAgeDays if not tx.isNewDevice else 0,
     }])

@app.post("/analyze")
def analyze_transaction(tx: TransactionInput):
    if not fraud_model or not anomaly_model:
        raise HTTPException(status_code=500, detail="Models not loaded")

    # 1. Fraud Prediction
    f_features = prepare_fraud_features(tx)
    fraud_prob = float(fraud_model.predict_proba(f_features)[0][1])
    
    # 2. Anomaly Score (Isolation Forest returns 1 for normal, -1 for anomaly)
    # Convert to 0-1 range where 1 is highly anomalous
    a_features = prepare_anomaly_features(tx)
    decision = float(anomaly_model.decision_function(a_features)[0]) # roughly -0.5 to 0.5
    # lower decision = more anomalous
    anomaly_score = max(0.0, min(1.0, 0.5 - decision))
    
    # 3. Network Risk (heuristic graph mapping from features because we are simulating the nodes)
    # If velocity > 10 and new receiver, it increases network risk. 
    network_risk = 0.0
    if tx.transactionVelocity > 10:
        network_risk += 0.4
    if tx.receiverIsNew:
        network_risk += 0.3
    if tx.type == "SEND_MONEY" and tx.amount > 20000:
        network_risk += 0.2
        
    network_risk = min(1.0, network_risk)
    
    # 4. Risk Fusion
    # Weights: Fraud Model 50%, Behavior Anomaly 25%, Network Risk 15%, Context Signals 10%
    context_signal = (int(tx.isNewDevice) * 0.5 + int(tx.isUnusualLocation) * 0.5)
    final_score = (fraud_prob * 0.5) + (anomaly_score * 0.25) + (network_risk * 0.15) + (context_signal * 0.1)
    
    final_score = max(0.0, min(1.0, final_score))
    
    # Generate SHAP
    shap_vals = explainer.shap_values(f_features)
    # SHAP can return a list for multiclass or single array
    if isinstance(shap_vals, list):
        shap_vals = shap_vals[1][0]
    else:
        shap_vals = shap_vals[0]
        
    xai = []
    cols = f_features.columns
    for i, val in enumerate(shap_vals):
        weight = float(val) * 10 # scale for UI context
        if abs(weight) > 1:
            direction = "POSITIVE" if weight > 0 else "NEGATIVE"
            xai.append({
                "label": cols[i].replace("_", " ").title(),
                "weight": round(abs(weight), 1),
                "category": "Model",
                "direction": direction,
                "explanation": f"SHAP impact of {cols[i]}"
            })
            
    xai.sort(key=lambda x: x["weight"], reverse=True)
    
    # Risk Level
    fraud_pct = final_score * 100
    level = "LOW"
    action = "AUTO_APPROVE"
    if fraud_pct >= 70:
        level = "CRITICAL"
        action = "BLOCK_AND_ESCALATE"
    elif fraud_pct >= 35:
        level = "MODERATE"
        action = "CHALLENGE_OTP_BIOMETRIC"

    return {
        "fraudProbability": round(fraud_prob * 100, 1),
        "anomalyScore": round(anomaly_score * 100, 1),
        "networkRiskScore": round(network_risk * 100, 1),
        "finalRiskScore": round(fraud_pct, 1),
        "riskLevel": level,
        "recommendedAction": action,
        "modelVersion": meta,
        "xaiFactors": xai[:5]
    }

if __name__ == "__main__":
    import uvicorn
    # Start server locally
    uvicorn.run(app, host="0.0.0.0", port=8005)
