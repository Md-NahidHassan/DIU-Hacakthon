export interface TransactionInput {
  id?: string;
  timestamp?: string;
  senderAccount: string;
  receiverAccount: string;
  amount: number;
  type: "CASH_OUT" | "SEND_MONEY" | "MERCHANT_PAY" | "AIRTIME";
  hourOfDay: number;
  isNewDevice: boolean;
  isUnusualLocation: boolean;
  accountAgeDays: number;
  receiverIsNew: boolean;
  
  // Optional contextual fields
  transactionVelocity?: number;
  recentTransactionCount?: number;
  averageTransactionAmount?: number;
  deviceAgeDays?: number;
  distanceFromUsualLocation?: number;
  previousRiskScore?: number;
}

export interface XAIFactor {
  label: string;
  weight: number;
  category: string;
  direction: "POSITIVE" | "NEGATIVE";
  explanation: string;
}

export type RecommendedAction = "AUTO_APPROVE" | "CHALLENGE_OTP_BIOMETRIC" | "BLOCK_AND_ESCALATE";
export type RiskLevel = "LOW" | "MODERATE" | "CRITICAL";

export interface RiskEngineOutput {
  fraudScore: number;
  riskLevel: RiskLevel;
  recommendedAction: RecommendedAction;
  xaiFactors: XAIFactor[];
}
