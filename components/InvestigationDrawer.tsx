"use client";

import React, { useEffect, useState } from "react";
import { X, Search, ShieldCheck, Clock, CheckCircle2, ShieldAlert, AlertTriangle, Activity, Share2, Target, FileText, ChevronDown, Check } from "lucide-react";
import { TransactionInput } from "@/lib/types";
import { MLInferenceResult } from "@/lib/riskEngine";
import { useCases } from "@/lib/casesStore";
import XAIFactors from "./XAIFactors";
import NetworkGraph from "./NetworkGraph";

interface InvestigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tx: TransactionInput;
  riskOutput: MLInferenceResult | null;
  onCreateCase?: () => void;
}

export default function InvestigationDrawer({ isOpen, onClose, tx, riskOutput, onCreateCase }: InvestigationDrawerProps) {
  const [timestamp, setTimestamp] = useState("");
  const [status, setStatus] = useState("NEW");
  const [disposition, setDisposition] = useState("");
  const [notes, setNotes] = useState("");
  const [isWhyActionOpen, setIsWhyActionOpen] = useState(false);

  const { addCase } = useCases();

  useEffect(() => {
    if (isOpen) {
      setTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  }, [isOpen]);

  if (!isOpen || !riskOutput) return null;

  // Derivations for narratives based on output
  let narrative = "Transaction appears normal, indicating established behavioral patterns. No immediate action required.";
  if (riskOutput.riskLevel === "CRITICAL") {
    narrative = `The transaction shows elevated risk due to a significant combination of factors including ${riskOutput.xaiFactors.map(f => f.label.toLowerCase()).slice(0,2).join(" and ")}. Network analysis also indicates elevated interaction patterns.\n\nRecommended next step:\nHuman review and escalation.`;
  } else if (riskOutput.riskLevel === "MODERATE") {
    narrative = "The transaction presents moderate risk signals, indicating slight behavioral deviations. Verify user authenticity before proceeding.";
  }

  const getActionIcon = () => {
    if (riskOutput.recommendedAction === "BLOCK_AND_ESCALATE") return <ShieldAlert className="w-5 h-5 text-red-600" />;
    if (riskOutput.recommendedAction === "CHALLENGE_OTP_BIOMETRIC") return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    return <CheckCircle2 className="w-5 h-5 text-green-600" />;
  };

  const getActionTitle = () => {
    return riskOutput.recommendedAction.replace(/_/g, " & ").replace("CHALLENGE", "CHALLENGE —");
  };

  const padZero = (num: number) => num.toString().padStart(2, '0');

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] transition-opacity" onClick={onClose} />
      
      <div className={`fixed right-0 top-0 bottom-0 w-full max-w-3xl bg-slate-50 shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-slate-200 overflow-hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* HEADER */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-1.5 bg-blue-100 rounded-lg"><Search className="h-5 w-5 text-blue-700" /></div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">AI-Assisted Investigation</h2>
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold tracking-wider rounded uppercase border border-indigo-100">Synthetic Data Only</span>
            </div>
            <p className="text-xs text-slate-500 font-mono tracking-wide ml-10">TXN-SYN-8F31A2</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Final Risk</div>
              <div className={`text-lg font-bold ${riskOutput.riskLevel === 'CRITICAL' ? 'text-red-600' : riskOutput.riskLevel === 'MODERATE' ? 'text-amber-600' : 'text-green-600'}`}>
                {riskOutput.finalRiskScore}% • {riskOutput.riskLevel}
              </div>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
          
          {/* 1. WHAT HAPPENED? */}
          <section>
            <h3 className="text-sm font-bold text-slate-800 tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span> 1. What Happened?
            </h3>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 text-sm">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Amount</div>
                  <div className="font-semibold text-slate-800 text-lg">৳{tx.amount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Type</div>
                  <div className="font-semibold text-slate-800 mt-1">{tx.type.replace("_", " ")}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Time</div>
                  <div className="font-semibold text-slate-800 mt-1">{padZero(tx.hourOfDay)}:12 AM</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Transaction Velocity</div>
                  <div className="font-semibold text-slate-800 mt-1">{tx.transactionVelocity} in last hour</div>
                </div>
              </div>
              <div className="bg-slate-50 border-t border-slate-100 p-4 px-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400 font-medium">Customer:</span> <span className="font-mono text-slate-700 ml-1">{tx.senderAccount}</span> 
                  <span className="text-slate-400 text-xs ml-2">({tx.accountAgeDays} days old)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Receiver:</span> <span className="font-mono text-slate-700 ml-1">{tx.receiverAccount}</span>
                  <span className="text-slate-400 text-xs ml-2">({tx.receiverIsNew ? "New" : "Established"})</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. WHY IS IT RISKY? */}
          <section>
            <h3 className="text-sm font-bold text-slate-800 tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span> 2. Why Is It Risky?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* ML Scores */}
              <div className="col-span-4 flex flex-col gap-3">
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fraud Probability</span>
                  <span className="font-bold text-slate-800">{riskOutput.fraudProbability}%</span>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Behavior Anomaly</span>
                  <span className="font-bold text-slate-800">{riskOutput.anomalyScore}%</span>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Network Risk</span>
                  <span className="font-bold text-slate-800">{riskOutput.networkRiskScore}%</span>
                </div>
              </div>

              {/* XAI Visualization & Evidence */}
              <div className="col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Top Risk Drivers</h4>
                  <span className="text-[10px] uppercase font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Model-derived explanation</span>
                </div>
                
                <div className="space-y-4">
                  {riskOutput.xaiFactors.map((factor, idx) => (
                    <div key={idx} className="flex flex-col space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-slate-700">{factor.label}</span>
                        <span className={`font-bold ${factor.direction === 'POSITIVE' ? 'text-amber-600' : 'text-green-600'}`}>
                          {factor.direction === 'POSITIVE' ? '+' : '-'}{factor.weight}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                        <div className={`h-full ${factor.direction === 'POSITIVE' ? 'bg-amber-400' : 'bg-green-400'}`} style={{ width: `${Math.min(factor.weight, 100)}%` }} />
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 font-medium mt-1">
                        <Target className="w-3 h-3" /> Source: {factor.label.includes("Network") ? "Graph Engine" : "Transaction Feature & SHAP"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* AI INVESTIGATION SUMMARY */}
          <section className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Search className="w-3 h-3" /> AI INVESTIGATION SUMMARY
            </h4>
            <div className="text-sm text-indigo-900 leading-relaxed font-medium">
              {narrative.split("\n\n").map((para, i) => (
                <p key={i} className={i > 0 ? "mt-3" : ""}>{para}</p>
              ))}
            </div>
          </section>

          {/* 3. USER BEHAVIOR & NETWORK */}
          <section>
            <h3 className="text-sm font-bold text-slate-800 tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span> 3. What is happening around this user?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* User Behavior */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
                <div className="bg-slate-50 p-3 border-b border-slate-100"><h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">User Behavior Intelligence</h4></div>
                <div className="p-4 flex-1 text-sm">
                  <div className="grid grid-cols-3 mb-3 border-b border-slate-100 pb-2 text-[10px] font-bold text-slate-400 uppercase">
                    <div>Metric</div><div>Usual Pattern</div><div>Current Event</div>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3"><div className="font-medium text-slate-600">Amount</div><div className="text-slate-500">৳2,850</div><div className={`font-semibold ${tx.amount > 15000 ? 'text-amber-600' : 'text-slate-800'}`}>৳{tx.amount.toLocaleString()}</div></div>
                    <div className="grid grid-cols-3"><div className="font-medium text-slate-600">Time</div><div className="text-slate-500">14:20</div><div className={`font-semibold ${tx.hourOfDay < 6 ? 'text-amber-600' : 'text-slate-800'}`}>{padZero(tx.hourOfDay)}:12</div></div>
                    <div className="grid grid-cols-3"><div className="font-medium text-slate-600">Device</div><div className="text-slate-500">Known</div><div className={`font-semibold ${tx.isNewDevice ? 'text-red-600' : 'text-green-600'}`}>{tx.isNewDevice ? "New Device" : "Known"}</div></div>
                    <div className="grid grid-cols-3"><div className="font-medium text-slate-600">Location</div><div className="text-slate-500">Dhaka</div><div className={`font-semibold ${tx.isUnusualLocation ? 'text-red-600' : 'text-green-600'}`}>{tx.isUnusualLocation ? "Unusual" : "Dhaka"}</div></div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-3">Behavioral Timeline</h5>
                    <div className="space-y-3 text-xs relative before:absolute before:inset-y-1 before:left-[11px] before:w-px before:bg-slate-200">
                      <div className="flex gap-4 relative"><div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white text-slate-400 text-[10px] shrink-0">1</div><div className="pt-1"><span className="text-slate-500 w-12 inline-block">02:41</span> SEND_MONEY ৳4,500</div></div>
                      <div className="flex gap-4 relative"><div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white text-slate-400 text-[10px] shrink-0">2</div><div className="pt-1"><span className="text-slate-500 w-12 inline-block">02:57</span> CASH_OUT ৳8,000</div></div>
                      <div className="flex gap-4 relative"><div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white text-blue-600 text-[10px] shrink-0 z-10 font-bold">●</div><div className="pt-1 font-bold"><span className="text-slate-800 w-12 inline-block">03:12</span> {tx.type} ৳{tx.amount.toLocaleString()} <span className="text-blue-500 font-bold ml-1 text-[10px] uppercase">Current</span></div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Graph */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
                <div className="bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Network Intelligence</h4>
                  <span className="text-[10px] flex items-center gap-1 font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200"><Check className="w-3 h-3"/> Available</span>
                </div>
                <div className="p-4 flex-1 flex flex-col items-center justify-center gap-4">
                  <div className="w-full flex-1">
                    {/* Render existing Phase 4J lightweight UI */}
                    <NetworkGraph tx={tx} />
                  </div>
                  
                  <div className="w-full bg-slate-50 rounded-lg p-3 border border-slate-100 text-xs text-slate-600 leading-relaxed font-medium">
                    <span className="font-bold text-slate-800 text-[10px] uppercase block mb-1">Observation</span>
                    {(tx.transactionVelocity ?? 0) > 10 && tx.receiverIsNew ? "Pattern is consistent with a potential funnel-like transaction structure involving multiple new counterparties within a short period." : "Network connections represent standard topology with direct, known counterparties."}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* 4. RECOMMENDATION & TRANSPARENCY */}
          <section>
            <h3 className="text-sm font-bold text-slate-800 tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span> 4. What Should Upay Do Next?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <div className="space-y-4">
                <div className={`rounded-xl border p-5 shadow-sm bg-slate-50
                  ${riskOutput.riskLevel === 'CRITICAL' ? 'border-red-200' : riskOutput.riskLevel === 'MODERATE' ? 'border-amber-200' : 'border-green-200'}
                `}>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Recommended Action</div>
                  <div className="flex items-center gap-2 mb-4">
                    {getActionIcon()}
                    <div className={`text-xl font-bold tracking-tight ${riskOutput.riskLevel === 'CRITICAL' ? 'text-red-700' : riskOutput.riskLevel === 'MODERATE' ? 'text-amber-700' : 'text-green-700'}`}>{getActionTitle()}</div>
                  </div>
                  
                  <div className="text-sm space-y-2 mb-3">
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                      <span className="text-slate-500 font-medium">Risk Level:</span>
                      <span className="font-bold text-slate-800">{riskOutput.riskLevel}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                      <span className="text-slate-500 font-medium">Human Review:</span>
                      <span className="font-bold text-slate-800">{riskOutput.riskLevel === 'LOW' ? 'Optional' : 'Required'}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsWhyActionOpen(!isWhyActionOpen)}
                    className="w-full flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider bg-white border border-slate-200 rounded py-2 px-3 hover:bg-slate-50 transition"
                  >
                    Why This Action? <ChevronDown className={`w-4 h-4 transform transition-transform ${isWhyActionOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isWhyActionOpen && (
                    <div className="mt-3 bg-white p-3 border border-slate-200 rounded-lg text-xs space-y-2 animate-in fade-in slide-in-from-top-2">
                      <div className="font-bold text-slate-700 uppercase mb-1">Supporting Signals:</div>
                      {riskOutput.fraudProbability > 70 && <div className="text-slate-600">✓ Fraud probability elevated ({riskOutput.fraudProbability}%)</div>}
                      {riskOutput.anomalyScore > 70 && <div className="text-slate-600">✓ Behavioral anomaly elevated ({riskOutput.anomalyScore})</div>}
                      {riskOutput.networkRiskScore > 70 && <div className="text-slate-600">✓ Network risk elevated</div>}
                      <div className="text-slate-600">✓ Action dictated by established risk policy map</div>
                    </div>
                  )}
                </div>
              </div>

              {/* TIMELINE & TRANSPARENCY */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Investigation Timeline</h4>
                  <div className="space-y-3 text-xs font-medium text-slate-500 relative before:absolute before:inset-y-1 before:left-1.5 before:w-px before:bg-slate-200">
                    <div className="flex gap-3 relative z-10"><div className="w-3 h-3 bg-white border-2 border-slate-300 rounded-full shrink-0" /><div><span className="font-bold text-slate-400 w-16 inline-block">{timestamp}</span> Transaction Detected</div></div>
                    {riskOutput.anomalyScore > 60 && <div className="flex gap-3 relative z-10"><div className="w-3 h-3 bg-white border-2 border-amber-300 rounded-full shrink-0" /><div><span className="font-bold text-slate-400 w-16 inline-block">{timestamp}</span> Behavior Anomaly Detected</div></div>}
                    {riskOutput.networkRiskScore > 60 && <div className="flex gap-3 relative z-10"><div className="w-3 h-3 bg-white border-2 border-amber-300 rounded-full shrink-0" /><div><span className="font-bold text-slate-400 w-16 inline-block">{timestamp}</span> Network Risk Identified</div></div>}
                    <div className="flex gap-3 relative z-10"><div className="w-3 h-3 bg-white border-2 border-blue-400 rounded-full shrink-0" /><div><span className="font-bold text-slate-400 w-16 inline-block">{timestamp}</span> AI Risk Score Generated</div></div>
                    <div className="flex gap-3 relative z-10"><div className="w-3 h-3 bg-white border-2 border-indigo-400 rounded-full shrink-0" /><div><span className="font-bold text-slate-400 w-16 inline-block">{timestamp}</span> XAI Explanation Generated</div></div>
                    <div className="flex gap-3 relative z-10"><div className="w-3 h-3 bg-white border-2 border-slate-400 rounded-full shrink-0" /><div><span className="font-bold text-slate-400 w-16 inline-block">{timestamp}</span> Investigation Opened</div></div>
                    <div className="flex gap-3 relative z-10"><div className={`w-3 h-3 bg-white border-2 rounded-full shrink-0 ${riskOutput.riskLevel === 'CRITICAL' ? 'border-red-500' : 'border-amber-500'}`} /><div><span className="font-bold text-slate-400 w-16 inline-block">{timestamp}</span> Recommended Action</div></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2 mb-2">Model Transparency</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-slate-400 font-medium mb-0.5">Fraud Model</div>
                      <div className="font-bold text-slate-700">{riskOutput.modelVersion.fraud} <span className="text-green-500 ml-1">✓</span></div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-medium mb-0.5">Behavior Model</div>
                      <div className="font-bold text-slate-700">{riskOutput.modelVersion.anomaly} <span className="text-green-500 ml-1">✓</span></div>
                    </div>
                    <div className="mt-2">
                      <div className="text-slate-400 font-medium mb-0.5">Network Engine</div>
                      <div className="font-bold text-slate-700">{riskOutput.modelVersion.network} <span className="text-green-500 ml-1">✓</span></div>
                    </div>
                    <div className="mt-2">
                      <div className="text-slate-400 font-medium mb-0.5">Explainability</div>
                      <div className="font-bold text-slate-700">SHAP <span className="text-green-500 ml-1">✓</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. CREATE CASE WORKFLOW */}
          <section className="bg-slate-100 rounded-xl p-5 border border-slate-200 shadow-inner flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800 tracking-widest uppercase flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-slate-500" /> Operationalize Risk
              </h3>
              <p className="text-xs text-slate-500 font-medium">Create a tracking case to assign an analyst, review evidence, and record disposition outcome.</p>
            </div>
            
            <button 
              onClick={() => {
                addCase({
                  caseId: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
                  transaction: tx,
                  riskAssessment: riskOutput,
                  status: "NEW",
                  assignedTo: "",
                  notes: [],
                  disposition: "",
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  auditEvents: [{
                    id: Math.random().toString(),
                    action: "Investigation opened and case created",
                    actor: "System",
                    timestamp: new Date().toISOString()
                  }]
                });
                onCreateCase?.();
              }}
              className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              + Create Case
            </button>
          </section>

        </div>
      </div>
    </>
  );
}
