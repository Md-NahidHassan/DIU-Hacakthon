# upay Shield: Trust & Risk Intelligence 🛡️

*Track 01: Trust & Risk Intelligence | Team: Ma Babar Doua (Nahid, Farhan, Rakib)*

---

## 🔗 Live Deployment URL
**Frontend UI (Vercel):** [https://diu-hacakthonmababardoua.vercel.app/](https://diu-hacakthonmababardoua.vercel.app/)
**Backend API (Render):** [https://upayshield-api.onrender.com/health](https://upayshield-api.onrender.com/health)
*(Note: As the backend is hosted on a free Render tier, the first API request may take up to 50 seconds to wake up the server. Please be patient during the first test.)*

---

## 📖 Project Overview

**The Problem:** Traditional rule-based financial security systems flag too many false positives and lack explainability (the "Black Box" problem). Analysts waste time hunting for evidence across fragmented systems during active cyber-attacks like Account Takeovers (ATO) or Mule Networks.

**Proposed Solution:** A multi-layered intelligence platform called "upay Shield". It fuses supervised and unsupervised machine learning to detect fraud in real-time, completely explains its own reasoning using SHAP (Explainable AI), and pipes critical threats directly into a built-in Case Management CRM for human analysts to resolve.

**Purpose:** To bridge the gap between algorithmic AI detection and human security operations, ensuring complete regulatory compliance, ethical AI practices (human-in-the-loop), and zero risk to real customer data (trained via synthetic data).

---

## ✨ Features & AI Component Usage

**Implemented Features:**
1. **Interactive Threat Simulator:** Manually manipulate transaction variables (Amount, Time, Device) or use presets (e.g., *Midnight SIM-Swap*) to test real-time AI reactions.
2. **Investigation Workbench:** A digital evidence drawer providing plain-English threat summaries and raw data logs.
3. **Integrated Case Management (CMS):** A central queue where alerts are routed for analysts to assign statuses (Under Review, Escalated, Resolved).
4. **Risk Command Center:** Executive dashboard showing AI vs. Human decision matrices and model validation metrics.

**How AI Components Are Used:**
- **XGBoost (Supervised):** Detects known scam typologies based on 11 trained factors.
- **Isolation Forest (Unsupervised):** Detects "Zero-Day" unexpected anomalies by examining behavioral deviation outside the 95th percentile.
- **Graph Risk (Heuristic):** Escalates risk for rapid velocity to unrecognizable recipients (Mule detection).
- **SHAP (Explainable AI):** Decodes the black-box AI by assigning percentage weights to factors (e.g., "Velocity generated +13% risk"), proving reasoning to human operators.

---

## 🛠️ Technology Stack

**Frontend (Client & Analyst UI):**
- **Framework:** Next.js (React App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Hosting:** Vercel

**Backend (ML Inference Engine):**
- **Framework:** Python FastAPI, Uvicorn
- **Data Manipulation:** Pandas, NumPy
- **Machine Learning Models:** scikit-learn (Isolation Forest), XGBoost, joblib
- **Graph/Explainable AI:** NetworkX, SHAP
- **Hosting:** Render.com

---

## ⚙️ Requirements

To run this project locally, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher) for the frontend.
- **Python** (v3.9 or higher) for the ML backend.
- **Git** (for version control).
- Optionally, Docker if you wish to containerize the ML backend.

---

## 🚀 Installation and Setup

Complete step-by-step instructions for local setup:

**1. Clone the repository:**
```bash
git clone https://github.com/Md-NahidHassan/DIU-Hacakthon.git
cd DIU-Hacakthon
```

**2. Setup Frontend:**
```bash
npm install
```

**3. Setup Python Backend:**
```bash
cd ml
pip install -r requirements.txt
cd ..
```

---

## 🔐 Environment Variables

You must configure the frontend to communicate with the backend.
Create a `.env.local` file in the root directory (Next.js root) and add the following:

```env
# Required Variable: Points the UI to the AI Inference Engine
# Purpose: Instructs frontend fetches to use the Python backend for AI Risk Scoring
NEXT_PUBLIC_API_URL=http://localhost:8005
```

*(Placeholder for Production: `NEXT_PUBLIC_API_URL=https://upayshield-api.onrender.com`)*

---

## 🏃‍♂️ Run and Build Commands

You need two terminal windows to run both services simultaneously.

**Terminal 1: Start the ML Backend (FastAPI)**
```bash
# From the root directory:
python ml/inference/main.py
```
*The backend will run on `http://0.0.0.0:8005`.*

**Terminal 2: Start the Frontend (Next.js)**
```bash
# From the root directory:
npm run dev
```
*The frontend will run on `http://localhost:3000`.*

**Build for Production (Frontend):**
```bash
npm run build
npm start
```

---

## 🧪 Testing Instructions

Follow these steps to verify implemented features and end-to-end operation:

1. **Verify AI Connection:** Open `localhost:3000`. On the top right, ensure the badge says **"AI ENGINE ONLINE"**.
2. **Trigger an Attack:** On the `Real-time Analysis Simulator` tab, click the **"MIDNIGHT SIM-SWAP"** preset button.
3. **Observe Fusion & SHAP:** Look at the right panel. The Final Risk Score will jump to **CRITICAL**. Below it, the **SHAP Factors** (Explainable AI) will list exactly *why* (e.g., Amount and Velocity percentages).
4. **Human Escalation:** Click the yellow **"Investigate Details"** button. The Investigation Drawer will open with the AI summary. Scroll to the bottom and click the **"+ Create Case"** button.
5. **Analyst Resolution:** Navigate to the top **"Risk Operations & Cases"** tab. You'll see the new case in the Queue. Click **Investigate**, set the status to **"Resolved"**, insert analyst notes, and click **Save Decision**.
6. **Executive Matrix:** Navigate to the **"Risk Command Center"** tab and verify the "AI Prediction vs Human Decision Matrix" has updated with your manual feedback.

---

## 🔧 Other Configuration

- **ML Models & Artifacts:** Built `.joblib` models are version-controlled inside the `/ml/artifacts/` folder. 
- **Synthetic Data Regeneration:** If you wish to retrain or inspect data generation, run:
  ```bash
  python ml/data/generate_synthetic_data.py
  ```
- **CORS Requirements:** The backend `main.py` utilizes wildcard `allow_origins=["*"]` with `allow_credentials=False` for testing mobility. In strict production domains, this should be hardened to specify exact Vercel URLs.
