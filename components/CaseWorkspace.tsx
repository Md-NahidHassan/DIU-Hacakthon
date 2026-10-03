"use client";

import React, { useState } from "react";
import { useCases, RiskCase } from "@/lib/casesStore";
import { ArrowLeft, Clock, ShieldCheck, AlertTriangle, ShieldAlert, FileText, UserPlus, FileDown, Target } from "lucide-react";
import XAIFactors from "./XAIFactors";
import NetworkGraph from "./NetworkGraph";
import BehaviorInsights from "./BehaviorInsights";

export default function CaseWorkspace({ caseId, onBack }: { caseId: string, onBack: () => void }) {
  const { cases, updateCase, addNote, addAuditEvent } = useCases();
  const caseData = cases.find(c => c.caseId === caseId);
  const [newNote, setNewNote] = useState("");

  if (!caseData) return <div>Case not found</div>;

  const { riskAssessment: riskOutput, transaction: tx } = caseData;

  const handleStatusChange = (status: any) => {
    updateCase(caseId, { status });
    addAuditEvent(caseId, `Status updated to ${status}`, "Analyst 01");
  };

  const handleDispositionChange = (disposition: any) => {
    updateCase(caseId, { disposition });
    addAuditEvent(caseId, `Disposition recorded as ${disposition}`, "Analyst 01");
  };

  const handleAssignment = (assignedTo: string) => {
    updateCase(caseId, { assignedTo });
    addAuditEvent(caseId, `Assigned to ${assignedTo}`, "Analyst 01");
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    addNote(caseId, newNote, "Risk Analyst 01");
    addAuditEvent(caseId, "Note added", "Risk Analyst 01");
    setNewNote("");
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            {caseData.caseId}
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold tracking-wider rounded uppercase border border-indigo-100">Synthetic Data Only</span>
          </h2>
          <div className="text-sm text-slate-500 font-medium">Customer: UPY-****-{tx.senderAccount.substring(6)}</div>
        </div>

        <div className="ml-auto flex items-center gap-6">
          <div className="text-right">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Final Risk</div>
             <div className={`text-lg font-bold ${riskOutput.riskLevel === 'CRITICAL' ? 'text-red-600' : riskOutput.riskLevel === 'MODERATE' ? 'text-amber-600' : 'text-green-600'}`}>
                {riskOutput.finalRiskScore}% • {riskOutput.riskLevel}
             </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 border border-slate-200 rounded hover:bg-slate-50">
            <FileDown className="w-4 h-4" /> Report
          </button>
        </div>
      </div>

      {/* OPERATIONAL STATUS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Status</label>
          <select value={caseData.status} onChange={e => handleStatusChange(e.target.value)} className="w-full font-bold text-slate-700 bg-transparent outline-none">
            <option value="NEW">NEW</option>
            <option value="UNDER REVIEW">UNDER REVIEW</option>
            <option value="ESCALATED">ESCALATED</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Assigned To</label>
          <select value={caseData.assignedTo} onChange={e => handleAssignment(e.target.value)} className="w-full font-bold text-slate-700 bg-transparent outline-none">
            <option value="">-- Unassigned --</option>
            <option value="Risk Analyst 01">Risk Analyst 01</option>
            <option value="Risk Analyst 02">Risk Analyst 02</option>
            <option value="Fraud Operations">Fraud Operations</option>
            <option value="Senior Reviewer">Senior Reviewer</option>
          </select>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Transaction</label>
          <div className="font-bold text-slate-700 text-sm">৳{tx.amount.toLocaleString()} <span className="text-slate-400 font-medium">({tx.type})</span></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Recommendation</label>
          <div className="font-bold text-slate-700 text-sm truncate">{riskOutput.recommendedAction.replace(/_/g, " ")}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: ML ARTIFACTS AND EVIDENCE */}
        <div className="xl:col-span-8 space-y-6">
          <div className="glass-card rounded-xl p-5 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 tracking-widest uppercase mb-4 flex items-center gap-2">
               Risk Assessment
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Fraud Model</div><div className="text-xl font-bold">{riskOutput.fraudProbability}%</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Behavior Model</div><div className="text-xl font-bold">{riskOutput.anomalyScore}</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Graph Engine</div><div className="text-xl font-bold">{riskOutput.networkRiskScore}</div>
              </div>
            </div>
            
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Model-Derived Explanation (SHAP)</h4>
            <XAIFactors factors={riskOutput.xaiFactors} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BehaviorInsights tx={tx} />
            <NetworkGraph tx={tx} />
          </div>
          
          <div className="glass-card rounded-xl p-5 border border-slate-200 bg-white">
            <h3 className="text-sm font-bold text-slate-800 tracking-widest uppercase mb-4">Evidence Snapshot</h3>
            <div className="space-y-2 text-sm text-slate-600 font-medium">
              {tx.isNewDevice && <div className="flex gap-2 items-center"><Target className="w-4 h-4 text-amber-500" /> New device detected <span className="text-[10px] bg-slate-100 px-1 py-0.5 rounded ml-auto text-slate-400">FEATURE</span></div>}
              {tx.isUnusualLocation && <div className="flex gap-2 items-center"><Target className="w-4 h-4 text-amber-500" /> Location deviation detected <span className="text-[10px] bg-slate-100 px-1 py-0.5 rounded ml-auto text-slate-400">FEATURE</span></div>}
              {(tx.transactionVelocity ?? 0) > 3 && <div className="flex gap-2 items-center"><Target className="w-4 h-4 text-amber-500" /> Transaction velocity elevated <span className="text-[10px] bg-slate-100 px-1 py-0.5 rounded ml-auto text-slate-400">BEHAVIOR MODEL</span></div>}
              {tx.amount > 15000 && <div className="flex gap-2 items-center"><Target className="w-4 h-4 text-amber-500" /> Amount above behavioral baseline <span className="text-[10px] bg-slate-100 px-1 py-0.5 rounded ml-auto text-slate-400">SHAP / EXPLANATION</span></div>}
              {tx.receiverIsNew && (tx.transactionVelocity ?? 0) > 10 && <div className="flex gap-2 items-center"><Target className="w-4 h-4 text-red-500" /> Network activity elevated <span className="text-[10px] bg-slate-100 px-1 py-0.5 rounded ml-auto text-slate-400">GRAPH ENGINE</span></div>}
            </div>
            {(!tx.isNewDevice && !tx.isUnusualLocation && (tx.transactionVelocity ?? 0) <= 3 && tx.amount <= 15000) && (
              <div className="text-slate-400 text-sm">No significant risk evidence detected.</div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: WORKFLOW AND AUDIT */}
        <div className="xl:col-span-4 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-700 tracking-widest uppercase flex items-center gap-2">Analyst Disposition</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Outcome</label>
                <select value={caseData.disposition} onChange={e => handleDispositionChange(e.target.value)} className="w-full bg-white border border-slate-300 text-slate-700 rounded p-2 text-sm font-medium focus:ring-1 focus:ring-blue-500 outline-none">
                  <option value="">-- Select Decision --</option>
                  <option value="NO_ACTION">No Action Required / Cleared</option>
                  <option value="FALSE_POSITIVE">Confirmed False Positive</option>
                  <option value="ESCALATED_L2">Escalated to L2 Risk Team</option>
                  <option value="CONFIRMED_SUSPICIOUS">Confirmed Suspicious / Block</option>
                </select>
              </div>
              <div className="text-[10px] text-slate-400 font-medium italic">
                * Analyst feedback is captured for future model evaluation and improvement. It does not alter current ML outputs.
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 tracking-widest uppercase">Analyst Notes</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4 mb-4 max-h-[200px] overflow-y-auto pr-2">
                {caseData.notes.map(note => (
                  <div key={note.id} className="bg-amber-50/50 border border-amber-100 rounded p-3">
                    <p className="text-sm text-slate-700 mb-1">{note.text}</p>
                    <div className="text-[10px] text-slate-400 font-bold">{note.author} • {formatTime(note.timestamp)}</div>
                  </div>
                ))}
                {caseData.notes.length === 0 && <div className="text-xs text-slate-400 text-center py-4">No analyst notes.</div>}
              </div>
              <div className="flex flex-col gap-2 border-t border-slate-100 pt-3">
                <textarea 
                  value={newNote} onChange={e => setNewNote(e.target.value)}
                  placeholder="Type investigation notes here..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm resize-none focus:outline-none focus:border-blue-400 h-16"
                />
                <button onClick={handleAddNote} className="self-end px-4 py-1.5 bg-slate-800 text-white text-xs font-bold rounded shadow-sm hover:bg-slate-900 uppercase tracking-widest">Add Note</button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 tracking-widest uppercase">Audit Log</h3>
            </div>
            <div className="p-4 max-h-[300px] overflow-y-auto">
              <div className="space-y-4 relative before:absolute before:inset-y-1 before:left-1.5 before:w-px before:bg-slate-200 ml-1">
                {caseData.auditEvents.map(event => (
                  <div key={event.id} className="flex gap-4 relative z-10 text-xs">
                    <div className="w-3 h-3 bg-white border-2 border-slate-300 rounded-full mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-700">{event.action}</div>
                      <div className="text-[10px] text-slate-400">{event.actor} • {formatTime(event.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
