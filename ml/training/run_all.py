import os
import subprocess

def run_script(script_name):
    script_path = os.path.join(os.path.dirname(__file__), script_name)
    print(f"Running {script_name}...")
    subprocess.run(["python", script_path], check=True)

if __name__ == "__main__":
    run_script("generate_data.py")
    run_script("train_fraud_model.py")
    run_script("train_anomaly_model.py")
    run_script("build_transaction_graph.py")
    print("All ML models generated and saved successfully!")
