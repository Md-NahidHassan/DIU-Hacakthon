import { TransactionInput } from "./types";

// Simple deterministic pseudo-random number generator
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(12345); // deterministic seed

function generateId(prefix: string, length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = prefix + "-";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(random() * chars.length));
  }
  return result;
}

function generateMaskedAccount() {
  const num = Math.floor(random() * 9000) + 1000;
  return `AC••••${num}`;
}

export function generateSyntheticTransactions(count: number): TransactionInput[] {
  const transactions: TransactionInput[] = [];
  const types: Array<"CASH_OUT" | "SEND_MONEY" | "MERCHANT_PAY" | "AIRTIME"> = ["CASH_OUT", "SEND_MONEY", "MERCHANT_PAY", "AIRTIME"];

  for (let i = 0; i < count; i++) {
    const isSuspicious = random() > 0.85; // 15% chance of being suspicious

    const senderAccount = generateMaskedAccount();
    const receiverAccount = generateMaskedAccount();
    
    // Normal defaults
    let amount = Math.floor(random() * 5000) + 50; 
    let type = types[Math.floor(random() * types.length)];
    let hourOfDay = Math.floor(random() * 16) + 7; // 7am to 10pm
    let isNewDevice = random() > 0.9;
    let isUnusualLocation = random() > 0.9;
    let accountAgeDays = Math.floor(random() * 1000) + 100;
    let receiverIsNew = random() > 0.8;
    let transactionVelocity = Math.floor(random() * 5); // 0-4

    // Inject suspicious patterns
    if (isSuspicious) {
      const pattern = Math.floor(random() * 3);
      
      if (pattern === 0) {
        // Midnight Sim-Swap ATO
        hourOfDay = Math.floor(random() * 4) + 1; // 1am - 4am
        isNewDevice = true;
        isUnusualLocation = true;
        type = "CASH_OUT";
        amount = Math.floor(random() * 20000) + 10000; // 10k-30k
        transactionVelocity = Math.floor(random() * 10) + 5; // 5-14
      } else if (pattern === 1) {
        // Mule Network / Funnel
        accountAgeDays = Math.floor(random() * 25) + 1; // very young
        receiverIsNew = true;
        isNewDevice = true;
        transactionVelocity = Math.floor(random() * 20) + 10; // high velocity
        amount = Math.floor(random() * 40000) + 15000;
      } else {
        // Scam / Sudden high trust factor breach
        isUnusualLocation = true;
        receiverIsNew = true;
        amount = Math.floor(random() * 25000) + 15000;
      }
    }

    const tx: TransactionInput = {
      id: generateId("TXN-SYN", 6),
      timestamp: new Date(Date.now() - Math.floor(random() * 86400000)).toISOString(), // Last 24h
      senderAccount,
      receiverAccount,
      amount,
      type,
      hourOfDay,
      isNewDevice,
      isUnusualLocation,
      accountAgeDays,
      receiverIsNew,
      transactionVelocity,
    };
    
    transactions.push(tx);
  }

  return transactions;
}

// Generate 500 records
export const syntheticTransactions = generateSyntheticTransactions(500);
