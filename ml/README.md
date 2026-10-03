# ML System for upay Shield

This directory contains the machine learning components for upay Shield Phase 2 (and future inference in Phase 3).

## Data
Synthetic transaction dataset used for training, ensuring privacy and compliance.

## Training Scripts
- `generate_data.py`: Creates realistic mock transaction profiles.
- `train_fraud_model.py`: Trains XGBoost for predictive fraud scoring.
- `train_anomaly_model.py`: Trains Isolation Forest for behavioral deviation detection.
- `build_transaction_graph.py`: Assembles the simulated network relationships for fast inference.

## Artifacts
Trained models and metadata saved in `.joblib` and `.json` formats inside `artifacts/`.
