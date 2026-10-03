import { TransactionInput, RiskEngineOutput, XAIFactor, RiskLevel, RecommendedAction } from "./types";

export interface MLInferenceResult {
  fraudProbability: number;
  anomalyScore: number;
  networkRiskScore: number;
  finalRiskScore: number;
  riskLevel: RiskLevel;
  recommendedAction: RecommendedAction;
  modelVersion: {
    fraud: string;
    anomaly: string;
    network: string;
  };
  xaiFactors: XAIFactor[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8005";

export async function checkMLServiceStatus(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
    return res.ok;
  } catch (error) {
    return false;
  }
}

export async function analyzeTransaction(input: TransactionInput): Promise<MLInferenceResult | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });
    
    if (!res.ok) {
      console.error("ML service returned an error", res.status);
      return null;
    }
    
    const data: MLInferenceResult = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to reach ML service:", error);
    return null; // Signals fallback / offline
  }
}
