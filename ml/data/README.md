# Synthetic Risk Dataset

## Purpose
This dataset is entirely synthetic and created for demonstration, model development, testing, and hackathon evaluation. It does not contain real customer, account, transaction, or payment information and must not be interpreted as production financial data.

## Details
- **Number of transactions**: 5,000
- **Random Seed**: 42 (Fully deterministic)
- **Time Window**: 30 days of data starting from 2026-09-01
- **Generator Script**: `generate_synthetic_data.py`

## Features
- `transaction_id`: Synthetic short UUID
- `customer_id`: Synthetic customer identifier
- `timestamp`: Date and time of transaction
- `amount`: Transaction value in BDT
- `transaction_type`: Types include SEND_MONEY, CASH_OUT, CASH_IN, BILL_PAY, MERCHANT_PAYMENT, MOBILE_RECHARGE
- `account_age_days`: Age of the customer's account based on registration
- `is_new_device`: Boolean indicating if the transaction triggered on a new device
- `device_age_days`: Time since the device was first registered
- `is_unusual_location`: Boolean location deviation
- `distance_from_usual_location`: Floating point proxy for geospatial deviation
- `receiver_id`: Synthetic receiver identifier
- `receiver_is_new`: Boolean indicating if receiver was previously seen for this customer
- `recipient_frequency`: Number of times the receiver has been used by the customer
- `transaction_velocity`: Transactions in the past 1 hour for the customer
- `recent_transaction_count`: Transactions in the past 24 hours for the customer
- `average_transaction_amount`: Rolling historical average transaction amount for the customer
- `amount_deviation_from_average`: Deviation between current amount and historical average
- `recent_failed_transactions`: Proxy feature for failed transaction risk
- `recent_cashout_frequency`: Number of cash-out events in the last 24 hours
- `merchant_id` & `agent_id`: References for merchant and agent counterparties
- `risk_pattern`: Synthetic evaluation ground truth label (e.g. ACCOUNT_TAKEOVER_LIKE, MULE_LIKE). **WARNING:** Do not use this as an input feature for ML.

## Risk Pattern Logic
- **NORMAL**: Represents established behavioral baselines with logical variation.
- **ACCOUNT_TAKEOVER_LIKE**: Contains new device, unusual location, abnormal hours, often coupled with high amounts.
- **MULE_LIKE**: Explicitly injects many-to-one fast fan-in graph structures with high amounts and new receiver relationships.
- **SCAM_LIKE**: Typical SEND_MONEY patterns directed to new or unusual receivers with moderate amounts.
- **CASH_OUT_RISK**: Significant cash-outs at obscure periods with high deviation from past events.

## Limitations
- Synthetic graphs may not fully represent real-world topology density.
- Location is abstracted to distance rather than geo-coordinates for prototype performance.
- Not a replacement for a production-trained dataset.
