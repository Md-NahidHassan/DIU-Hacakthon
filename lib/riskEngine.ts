import { TransactionInput, RiskEngineOutput, XAIFactor, RiskLevel, RecommendedAction } from "./types";

export function analyzeTransaction(input: TransactionInput): RiskEngineOutput {
  let score = 0;
  const factors: XAIFactor[] = [];

  const addFactor = (label: string, weight: number, category: string, direction: "POSITIVE" | "NEGATIVE", explanation: string) => {
    score += (direction === "POSITIVE" ? weight : -weight);
    factors.push({ label, weight, category, direction, explanation });
  };

  // 1. Device Context
  if (input.isNewDevice) {
    addFactor("New Device", 28, "Device", "POSITIVE", "Transaction initiated from a previously unseen device.");
  } else {
    addFactor("Known Device", 5, "Device", "NEGATIVE", "Device has a history of safe transactions.");
  }

  // 2. Location Context
  if (input.isUnusualLocation) {
    addFactor("Unusual Location", 20, "Location", "POSITIVE", "Location significantly deviates from the user's historical pattern.");
  }

  // 3. Timing
  const isOffPeak = input.hourOfDay < 6 || input.hourOfDay > 23; 
  if (isOffPeak) {
    addFactor("Off-Peak Window", 18, "Behavior", "POSITIVE", "Transaction occurred during an unusual time (late night/early morning).");
  } else {
    // Normal timing
    score -= 2;
  }

  // 4. Recipient Context
  if (input.receiverIsNew) {
    addFactor("New Recipient", 15, "Network", "POSITIVE", "First-time transfer to this account.");
  } else {
    addFactor("Known Recipient", 5, "Network", "NEGATIVE", "User has successfully transacted with this recipient before.");
  }

  // 5. Account Age
  if (input.accountAgeDays < 30) {
    addFactor("Young Account", 15, "Account", "POSITIVE", "Account was recently created and lacks established trust.");
  } else if (input.accountAgeDays > 365) {
    addFactor("Established Account", 8, "Account", "NEGATIVE", "Account has a long, trustworthy history.");
  }

  // 6. Velocity & Amount
  if (input.transactionVelocity && input.transactionVelocity > 10) {
    addFactor("High Velocity", 25, "Behavior", "POSITIVE", "Rapid succession of transactions detected.");
  } else {
    // Normal velocity
    score -= 3;
  }

  if (input.amount > 15000) {
    addFactor("High Transaction Amount", 15, "Financial", "POSITIVE", "Amount is significantly larger than typical values.");
  }

  if (input.type === "CASH_OUT" && (input.isNewDevice || isOffPeak)) {
    addFactor("Suspicious Cash-out Pattern", 20, "Behavior", "POSITIVE", "Cash out behavior combined with high-risk signals.");
  }

  // Clamp final score between 0 and 100
  const fraudScore = Math.max(0, Math.min(100, score));

  let riskLevel: RiskLevel = "LOW";
  let recommendedAction: RecommendedAction = "AUTO_APPROVE";

  if (fraudScore >= 70) {
    riskLevel = "CRITICAL";
    recommendedAction = "BLOCK_AND_ESCALATE";
  } else if (fraudScore >= 35) {
    riskLevel = "MODERATE";
    recommendedAction = "CHALLENGE_OTP_BIOMETRIC";
  }

  // Sort factors by impact (weight)
  factors.sort((a, b) => b.weight - a.weight);

  return {
    fraudScore,
    riskLevel,
    recommendedAction,
    xaiFactors: factors,
  };
}
