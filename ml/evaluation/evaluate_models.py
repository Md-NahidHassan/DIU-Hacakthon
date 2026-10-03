import joblib
import json
import os
import pandas as pd

def evaluate():
    print("Evaluating models...")
    
    # 1. Load Fraud Model
    fraud_path = os.path.join(os.path.dirname(__file__), "..", "artifacts", "fraud_model")
    fraud_model = joblib.load(os.path.join(fraud_path, "xgb_v1.joblib"))
    with open(os.path.join(fraud_path, "metadata.json")) as f:
        fraud_meta = json.load(f)
    print(f"Loaded {fraud_meta['model_name']} v{fraud_meta['version']}")
    print(f"Metrics: {fraud_meta['metrics']}")
    
    # 2. Load Anomaly Model
    anomaly_path = os.path.join(os.path.dirname(__file__), "..", "artifacts", "anomaly_model")
    anomaly_model = joblib.load(os.path.join(anomaly_path, "iforest_v1.joblib"))
    with open(os.path.join(anomaly_path, "metadata.json")) as f:
        anomaly_meta = json.load(f)
    print(f"Loaded {anomaly_meta['model_name']} v{anomaly_meta['version']}")
    
    # 3. Load Graph
    graph_path = os.path.join(os.path.dirname(__file__), "..", "artifacts", "network_model")
    graph = joblib.load(os.path.join(graph_path, "graph_v1.joblib"))
    with open(os.path.join(graph_path, "metadata.json")) as f:
        graph_meta = json.load(f)
    print(f"Loaded {graph_meta['model_name']} v{graph_meta['version']}")
    print(f"Nodes: {graph_meta['nodes']}, Edges: {graph_meta['edges']}")
    
    print("All models validated successfully!")

if __name__ == "__main__":
    evaluate()
