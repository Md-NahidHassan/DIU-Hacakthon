"use client";

import React, { useState, useEffect } from "react";
import { LayoutDashboard, SlidersHorizontal, Search, ServerOff, Server } from "lucide-react";
import { TransactionInput } from "@/lib/types";
import { analyzeTransaction, MLInferenceResult } from "@/lib/riskEngine";
import RiskScore from "./RiskScore";
import XAIFactors from "./XAIFactors";
import RecommendationCard from "./RecommendationCard";
import KPICards from "./KPICards";
import BehaviorInsights from "./BehaviorInsights";
import NetworkGraph from "./NetworkGraph";
import InvestigationDrawer from "./InvestigationDrawer";

// Use the same presets
const PRESETS = {
  NORMAL: { amount: 1500, type: "SEND_MONEY" as const, hourOfDay: 14, isNewDevice: false, isUnusualLocation: false, accountAgeDays: 900, receiverIsNew: false, transactionVelocity: 1 },
  SIM_SWAP: { amount: 18500, type: "CASH_OUT" as const, hourOfDay: 3, isNewDevice: true, isUnusualLocation: true, accountAgeDays: 35, receiverIsNew: true, transactionVelocity: 12 },
  MULE: { amount: 42000, type: "SEND_MONEY" as const, hourOfDay: 2, isNewDevice: true, isUnusualLocation: true, accountAgeDays: 18, receiverIsNew: true, transactionVelocity: 25 }
};

export default function IntelligenceDashboard() {
  const [txInput, setTxInput] = useState<TransactionInput>({
    senderAccount: "AC••••1234",
    receiverAccount: "AC••••5678",
    ...PRESETS.NORMAL
  });

  const [riskOutput, setRiskOutput] = useState<MLInferenceResult | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchRisk = async () => {
      setIsLoading(true);
      const output = await analyzeTransaction(txInput);
      if (!active) return;
      if (output) {
        setRiskOutput(output);
        setIsOffline(false);
      } else {
        setRiskOutput(null);
        setIsOffline(true);
      }
      setIsLoading(false);
    };
    
    // Add small debounce to avoid spamming the backend while dragging sliders
    const timeoutId = setTimeout(() => {
      fetchRisk();
    }, 300);
    
    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [txInput]);

  const handleInputChange = (field: keyof TransactionInput, value: any) => {
    setTxInput(prev => ({ ...prev, [field]: value }));
  };

  const loadPreset = (presetKey: keyof typeof PRESETS) => {
    setTxInput(prev => ({ ...prev, ...PRESETS[presetKey] }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out pb-10">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-blue-600" />
          Intelligence Dashboard
        </h2>
        <div className="text-sm text-slate-500 font-medium">
          AI-generated risk assessment
        </div>
      </div>

      <KPICards />

      {/* Model Status Bar (Phase 3F) */}
      <div className="glass-card rounded-xl p-4 border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center justify-between text-xs font-semibold text-slate-600 bg-white">
        <div className="flex items-center gap-2 text-slate-500 uppercase tracking-widest"><Server className="w-4 h-4 text-blue-500" /> AI MODEL STATUS</div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
            XGBoost Fraud Classifier <span className={`ml-1 ${!isOffline ? "text-green-500" : "text-slate-400"}`}>● ONLINE</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
            Isolation Forest <span className={`ml-1 ${!isOffline ? "text-green-500" : "text-slate-400"}`}>● ONLINE</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
            Graph Risk Engine <span className={`ml-1 ${!isOffline ? "text-green-500" : "text-slate-400"}`}>● ONLINE</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
            SHAP Explainability <span className={`ml-1 ${!isOffline ? "text-green-500" : "text-slate-400"}`}>● ONLINE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        <div className="lg:col-span-8 space-y-6">
          {/* Simulator */}
          <section className="glass-card rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-blue-500" />
                Transaction Simulator
              </h3>
              <div className="flex space-x-2">
                <button onClick={() => loadPreset("NORMAL")} className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition">NORMAL SEND MONEY</button>
                <button onClick={() => loadPreset("SIM_SWAP")} className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition">MIDNIGHT SIM-SWAP</button>
                <button onClick={() => loadPreset("MULE")} className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition">MULE NETWORK</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Amount (BDT): {txInput.amount}</label>
                <input type="range" min="50" max="100000" step="50" value={txInput.amount} onChange={(e) => handleInputChange("amount", Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Hour of Day: {txInput.hourOfDay}:00</label>
                <input type="range" min="0" max="23" value={txInput.hourOfDay} onChange={(e) => handleInputChange("hourOfDay", Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Account Age (Days): {txInput.accountAgeDays}</label>
                <input type="range" min="1" max="1500" value={txInput.accountAgeDays} onChange={(e) => handleInputChange("accountAgeDays", Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Velocity (last hour): {txInput.transactionVelocity}</label>
                <input type="range" min="0" max="50" value={txInput.transactionVelocity} onChange={(e) => handleInputChange("transactionVelocity", Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Transaction Type</label>
                <select value={txInput.type} onChange={(e) => handleInputChange("type", e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-sm text-slate-700 bg-white">
                  <option value="SEND_MONEY">SEND MONEY</option>
                  <option value="CASH_OUT">CASH OUT</option>
                  <option value="MERCHANT_PAY">MERCHANT PAY</option>
                  <option value="AIRTIME">AIRTIME</option>
                </select>
              </div>
              <div className="flex flex-col space-y-3 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={txInput.isNewDevice} onChange={(e) => handleInputChange("isNewDevice", e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-slate-700">New Device</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={txInput.isUnusualLocation} onChange={(e) => handleInputChange("isUnusualLocation", e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-slate-700">Unusual Location</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={txInput.receiverIsNew} onChange={(e) => handleInputChange("receiverIsNew", e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-slate-700">New Recipient</span>
                </label>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BehaviorInsights tx={txInput} />
            <NetworkGraph tx={txInput} />
          </div>
        </div>

        {/* Right Column: AI Analysis, Recommendation */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20 self-start">
          
          {/* Offline Fallback */}
          {isOffline && (
            <div className="p-6 bg-slate-100 border-2 border-slate-300 border-dashed rounded-xl flex flex-col items-center justify-center text-center space-y-4 shadow-inner">
              <div className="p-3 bg-white rounded-full"><ServerOff className="w-8 h-8 text-slate-400" /></div>
              <h3 className="font-bold text-slate-800">AI INFERENCE SERVICE UNAVAILABLE</h3>
              <p className="text-sm text-slate-500">Please start the local ML FastAPI service to evaluate risks via Python ML endpoints.</p>
              <div className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded">DEMO FALLBACK — ML SERVICE OFFLINE</div>
            </div>
          )}

          {/* Model Output (Phase 3G & 3H) */}
          {!isOffline && riskOutput && (
            <section className={`glass-card rounded-xl p-6 border border-slate-200 flex flex-col overflow-hidden transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
              <div className="flex flex-col mb-6 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Model Output</h3>
                
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-sm font-medium text-slate-600">Fraud Probability</span>
                  <span className="font-bold text-slate-800">{riskOutput.fraudProbability}%</span>
                </div>
                
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-sm font-medium text-slate-600">Behavior Anomaly</span>
                  <span className="font-bold text-slate-800">{riskOutput.anomalyScore}%</span>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-sm font-medium text-slate-600">Network Risk</span>
                  <span className="font-bold text-slate-800">{riskOutput.networkRiskScore}%</span>
                </div>
              </div>

              <div className="flex justify-center border-t border-slate-100 pt-6">
                <RiskScore score={riskOutput.finalRiskScore} level={riskOutput.riskLevel} />
              </div>
              
              <XAIFactors factors={riskOutput.xaiFactors} />
            </section>
          )}

          {/* Recommended Action */}
          {!isOffline && riskOutput && (
            <div className={`animate-in fade-in duration-500 relative transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
              <RecommendationCard action={riskOutput.recommendedAction} />
              
              {riskOutput.riskLevel !== "LOW" && (
                <button onClick={() => setIsDrawerOpen(true)} className="w-full mt-3 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg shadow flex items-center justify-center gap-2 transition-colors">
                  <Search className="w-4 h-4" />
                  Investigate Details
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <InvestigationDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        tx={txInput} 
        riskOutput={riskOutput as any} // we cast this because the structural types in typescript might differ if we changed them, though we didn't significantly
      />
    </div>
  );
}
