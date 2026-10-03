"use client";

import React, { useEffect, useState } from "react";
import { X, Search, ShieldCheck, Clock, CheckCircle2, ShieldAlert, AlertTriangle, Activity } from "lucide-react";
import { TransactionInput, RiskEngineOutput } from "@/lib/types";
import XAIFactors from "./XAIFactors";
import NetworkGraph from "./NetworkGraph";
import BehaviorInsights from "./BehaviorInsights";

interface InvestigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tx: TransactionInput;
  riskOutput: RiskEngineOutput | null;
}

export default function InvestigationDrawer({ isOpen, onClose, tx, riskOutput }: InvestigationDrawerProps) {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [isOpen]);

  if (!isOpen || !riskOutput) return null;

  // Derive narrative based on output
  let narrative = "Transaction appears normal. No immediate action required.";
  if (riskOutput.riskLevel === "CRITICAL") {
    narrative = `The transaction presents elevated risk due to a combination of ${riskOutput.xaiFactors.map(f => f.label.toLowerCase()).slice(0,3).join(", ")}, and other factors.\n\nThese signals collectively indicate a significant deviation from the established behavioral pattern.\n\nRecommended next step: Block and escalate for human review.`;
  } else if (riskOutput.riskLevel === "MODERATE") {
    narrative = "The transaction presents moderate risk signals indicating slight behavioral deviations. Proceed with OTP or Biometric verification to establish authentic identity.";
  }

  const getActionIcon = () => {
    if (riskOutput.recommendedAction === "BLOCK_AND_ESCALATE") return <ShieldAlert className="w-5 h-5 text-red-600" />;
    if (riskOutput.recommendedAction === "CHALLENGE_OTP_BIOMETRIC") return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    return <CheckCircle2 className="w-5 h-5 text-green-600" />;
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[90] transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed right-0 top-0 bottom-0 w-full max-w-xl bg-slate-50 shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-slate-200 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Search className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Investigation Details</h2>
              <p className="text-xs text-slate-500 font-medium tracking-wide font-mono mt-0.5">ID: {tx.id || "TXN-SYN-8921"}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Summary / Risk */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex bg-slate-50">
              <div className="flex-1 p-4 border-r border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Transaction</div>
                <div className="text-2xl font-bold text-slate-800">৳{tx.amount.toLocaleString()}</div>
                <div className="text-sm font-medium text-slate-500">{tx.type.replace("_", " ")}</div>
              </div>
              <div className="flex-1 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Risk Level</div>
                <div className={`text-2xl font-bold ${riskOutput.riskLevel === 'CRITICAL' ? 'text-red-600' : riskOutput.riskLevel === 'MODERATE' ? 'text-amber-600' : 'text-green-600'}`}>
                  {riskOutput.riskLevel} <span className="text-sm">({Math.round(riskOutput.fraudScore)}%)</span>
                </div>
                <div className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  {getActionIcon()} {riskOutput.recommendedAction.replace(/_/g, " ")}
                </div>
              </div>
            </div>
            <div className="p-4 flex gap-4 text-sm font-medium border-t border-slate-100">
              <div><span className="text-slate-400">From:</span> {tx.senderAccount}</div>
              <div className="text-slate-300">|</div>
              <div><span className="text-slate-400">To:</span> {tx.receiverAccount}</div>
            </div>
          </div>

          {/* AI Narrative */}
          <div>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">AI Investigation Summary</h3>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-900 leading-relaxed font-medium">
              {narrative.split("\n\n").map((para, i) => (
                <p key={i} className={i > 0 ? "mt-3" : ""}>{para}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* We re-use Behavioral Insights strictly bounded and slightly scaled down via grid */}
            <div className="col-span-1">
              <BehaviorInsights tx={tx} />
            </div>
            
            <div className="col-span-1">
              <NetworkGraph tx={tx} />
            </div>
          </div>

          {/* XAI Factors */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <XAIFactors factors={riskOutput.xaiFactors} />
          </div>

          {/* Audit Timeline */}
          <div>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Audit Timeline</h3>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 relative">
              <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-slate-100"></div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-sm relative z-10">
                  <div className="bg-slate-100 text-slate-500 p-1.5 rounded-full ring-4 ring-white"><Clock className="w-3.5 h-3.5" /></div>
                  <div className="pt-1 w-full">
                    <span className="font-bold text-slate-400 inline-block w-12">{timestamp}</span> Device recognized
                  </div>
                </li>
                {riskOutput.riskLevel === 'CRITICAL' && (
                  <li className="flex items-start gap-4 text-sm relative z-10">
                    <div className="bg-slate-100 text-slate-500 p-1.5 rounded-full ring-4 ring-white"><Clock className="w-3.5 h-3.5" /></div>
                    <div className="pt-1 w-full">
                      <span className="font-bold text-slate-400 inline-block w-12">{timestamp}</span> Location deviation detected
                    </div>
                  </li>
                )}
                <li className="flex items-start gap-4 text-sm relative z-10">
                  <div className="bg-blue-100 text-blue-600 p-1.5 rounded-full ring-4 ring-white"><Activity className="w-3.5 h-3.5" /></div>
                  <div className="pt-1 w-full">
                    <span className="font-bold text-slate-400 inline-block w-12">{timestamp}</span> Transaction initiated
                  </div>
                </li>
                <li className="flex items-start gap-4 text-sm relative z-10">
                  <div className="bg-green-100 text-green-600 p-1.5 rounded-full ring-4 ring-white"><ShieldCheck className="w-3.5 h-3.5" /></div>
                  <div className="pt-1 w-full flex justify-between">
                    <span><span className="font-bold text-slate-400 inline-block w-12">{timestamp}</span> Risk score generated</span>
                    <span className="font-bold">{Math.round(riskOutput.fraudScore)}%</span>
                  </div>
                </li>
                {riskOutput.riskLevel !== 'LOW' && (
                  <li className="flex items-start gap-4 text-sm relative z-10">
                    <div className={`p-1.5 rounded-full ring-4 ring-white ${riskOutput.riskLevel === 'CRITICAL' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div className="pt-1 w-full">
                      <span className="font-bold text-slate-400 inline-block w-12">{timestamp}</span> Alert created
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
