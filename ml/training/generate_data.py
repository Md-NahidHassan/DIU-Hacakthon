import pandas as pd
import numpy as np
import random
import os

SEED = 42
random.seed(SEED)
np.random.seed(SEED)

def generate_account():
    return f"AC{random.randint(1000, 9999)}"

def generate_synthetic_transactions(n=5000):
    data = []
    types = ["CASH_OUT", "SEND_MONEY", "MERCHANT_PAY", "AIRTIME"]
    
    # Pre-generate some accounts to simulate repeated behavior
    accounts = [generate_account() for _ in range(500)]
    
    for _ in range(n):
        label = 0
        scenario = "NORMAL"
        
        # 15% chance of anomalous behavior
        if random.random() < 0.15:
            label = 1
            scenario = random.choice(["ATO", "MULE", "SCAM", "CASH_OUT_RISK"])
            
        sender = random.choice(accounts)
        
        # Default Normal
        receiver = random.choice(accounts)
        amount = np.random.lognormal(mean=7, sigma=1) # heavily gathered at lower amounts
        type_ = random.choice(types)
        hour = int(np.random.normal(14, 4)) % 24
        account_age = random.randint(100, 1500)
        is_new_device = int(random.random() < 0.1)
        is_unusual_location = int(random.random() < 0.05)
        receiver_is_new = int(random.random() < 0.2)
        velocity = random.randint(0, 3)
        device_age = random.randint(30, 700)
        
        if scenario == "ATO":
            is_new_device = 1
            is_unusual_location = 1
            hour = random.randint(1, 4)
            amount = random.randint(15000, 30000)
            receiver_is_new = 1
            velocity = random.randint(5, 10)
            device_age = 0
        elif scenario == "MULE":
            velocity = random.randint(15, 30)
            amount = random.randint(10000, 50000)
            receiver_is_new = 1
            account_age = random.randint(1, 30)
        elif scenario == "SCAM":
            receiver_is_new = 1
            amount = random.randint(15000, 25000)
            is_unusual_location = 1
        elif scenario == "CASH_OUT_RISK":
            type_ = "CASH_OUT"
            amount = random.randint(20000, 50000)
            is_new_device = 1
            velocity = random.randint(3, 8)
            hour = random.randint(0, 5)

        data.append({
            "sender_account": sender,
            "receiver_account": receiver,
            "amount": amount,
            "type": type_,
            "hour_of_day": hour,
            "account_age_days": account_age,
            "is_new_device": is_new_device,
            "is_unusual_location": is_unusual_location,
            "receiver_is_new": receiver_is_new,
            "transaction_velocity": velocity,
            "device_age_days": device_age,
            "is_fraud": label,
            "scenario": scenario
        })
        
    df = pd.DataFrame(data)
    # create deterministic timestamp
    start = pd.Timestamp("2026-10-01")
    df['timestamp'] = [start + pd.Timedelta(minutes=random.randint(0, 10000)) for _ in range(n)]
    return df

if __name__ == "__main__":
    print("Generating dataset...")
    df = generate_synthetic_transactions(15000)
    out_path = os.path.join(os.path.dirname(__file__), "..", "data", "synthetic_transactions.csv")
    df.to_csv(out_path, index=False)
    print(f"Generated {len(df)} transactions and saved to {out_path}")
