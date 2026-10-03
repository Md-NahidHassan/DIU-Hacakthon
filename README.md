# upay Shield — AI-Powered Trust & Risk Intelligence

> Intelligence that protects every transaction.

**AI DEV FEST 2026 — Hackathon Track 01: Trust & Risk Intelligence**

upay Shield is a premium, full-stack fintech risk operations platform that uses Machine Learning (XGBoost, Isolation Forest, Graph Analytics) and Explainable AI (SHAP) to analyze, explain, and manage transaction risks in real-time.

---

## 🚀 Live Demo (Deployed Links)

The project has been successfully deployed and can be tested live!

- **🌐 Frontend (Next.js Application):** [https://diu-hacakthonmababardoua.vercel.app](https://diu-hacakthonmababardoua.vercel.app)
- **🧠 Backend (FastAPI ML Inference):** [https://upayshield-api.onrender.com](https://upayshield-api.onrender.com)

*(Note: The Render backend is on a free tier. If it goes to sleep due to inactivity, the first API request may take up to 40 seconds to load. Please visit the backend link once to "wake up" the server before fully testing the frontend.)*

---

## 🏗️ Architecture

1. **Frontend:** Next.js (App Router), Tailwind CSS, Lucide React (Deployed on **Vercel**).
2. **Backend:** Python FastAPI, Uvicorn, Pandas, Numpy (Deployed on **Render**).
3. **Machine Learning:** 
   - **XGBoost:** Fraud Probability Classification
   - **Isolation Forest:** Behavioral Anomaly Detection
   - **NetworkX:** Graph-based Network Risk Analytics
   - **SHAP:** Explainable AI (XAI) factors

*(All machine learning models are trained purely on synthetic data created for this hackathon. No real PI/financial data is used).*

---

## 🛠️ Local Development

To run this project locally on your machine:

### 1. Start the Machine Learning Backend
```bash
# Navigate to the ml directory (assuming Python 3.10+)
pip install -r ml/requirements.txt
python ml/inference/main.py
# Server runs on http://localhost:8000
```

### 2. Start the Frontend
```bash
# In the root directory
npm install
npm run dev
# App runs on http://localhost:3000
```

*Be sure to set `NEXT_PUBLIC_API_URL=http://localhost:8000` in your `.env` (or environment variables) if you prefer to run against the local backend instead of the cloud backend.*

---

## 🔥 Key Features

- **Real-Time Risk Simulator:** Simulate high-risk scenarios (e.g., Midnight SIM Swap, Account Takeover) and see real-time probability deductions.
- **Explainable AI (SHAP):** Every risk score is broken down by the exact transaction features that influenced the model.
- **Investigation Drawer:** Interactive evidence workbench tracking behavioral context, graph network risks, and device history.
- **Risk Operations Queue:** Automated case creation for suspicious transactions for analyst review.
- **Risk Command Center:** Executive intelligence dashboard summarizing AI outcomes vs Human Analyst dispositions. 

---
*Built with ❤️ for AI DEV FEST 2026*
