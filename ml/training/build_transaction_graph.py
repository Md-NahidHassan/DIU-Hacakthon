import pandas as pd
import networkx as nx
import joblib
import os
import json

def build_graph():
    data_path = os.path.join(os.path.dirname(__file__), "..", "data", "synthetic_transactions.csv")
    df = pd.read_csv(data_path)
    
    G = nx.DiGraph()
    
    print("Building Transaction Graph...")
    for _, row in df.iterrows():
        sender = row['sender_account']
        receiver = row['receiver_account']
        if G.has_edge(sender, receiver):
            G[sender][receiver]['weight'] += 1
            G[sender][receiver]['amount'] += row['amount']
        else:
            G.add_edge(sender, receiver, weight=1, amount=row['amount'])
            
    model_dir = os.path.join(os.path.dirname(__file__), "..", "artifacts", "network_model")
    os.makedirs(model_dir, exist_ok=True)
    
    # Save the graph using pickle/joblib
    graph_path = os.path.join(model_dir, "graph_v1.joblib")
    joblib.dump(G, graph_path)
    
    metadata = {
        "model_name": "Graph Analytics Network Risk",
        "version": "graph-v1",
        "nodes": G.number_of_nodes(),
        "edges": G.number_of_edges()
    }
    with open(os.path.join(model_dir, "metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"Graph saved to {graph_path}")

if __name__ == "__main__":
    build_graph()
