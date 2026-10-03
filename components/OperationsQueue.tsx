"use client";

import React, { useState } from "react";
import { useCases } from "@/lib/casesStore";
import CaseWorkspace from "./CaseWorkspace";
import { Search, Filter, AlertTriangle, ShieldCheck, Activity, Users } from "lucide-react";

export default function OperationsQueue() {
  const { cases } = useCases();
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterRisk, setFilterRisk] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  if (selectedCaseId) {
    return <CaseWorkspace caseId={selectedCaseId} onBack={() => setSelectedCaseId(null)} />;
  }

  // Derived Analytics
  const openCases = cases.filter(c => c.status !== "RESOLVED").length;
  const criticalCases = cases.filter(c => c.status !== "RESOLVED" && c.riskAssessment.riskLevel === "CRITICAL").length;
  const underReviewCases = cases.filter(c => c.status === "UNDER REVIEW").length;
  const escalatedCases = cases.filter(c => c.status === "ESCALATED").length;

  const filteredCases = cases.filter(c => {
    if (filterStatus !== "ALL" && c.status !== filterStatus) return false;
    if (filterRisk !== "ALL" && c.riskAssessment.riskLevel !== filterRisk) return false;
    if (searchQuery) {
      if (!c.caseId.toLowerCase().includes(searchQuery.toLowerCase()) && !c.transaction.senderAccount.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* 5A & 5S - OPERATIONAL ANALYTICS */}
      <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
        Risk Operations
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Activity className="w-3 h-3"/> Active Cases</div>
          <div className="text-2xl font-bold text-blue-600">{openCases}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5"><AlertTriangle className="w-3 h-3 text-red-500"/> Critical Review</div>
          <div className="text-2xl font-bold text-red-600">{criticalCases}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-amber-500"/> Under Review</div>
          <div className="text-2xl font-bold text-amber-600">{underReviewCases}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Users className="w-3 h-3 text-purple-500"/> Escalated</div>
          <div className="text-2xl font-bold text-purple-600">{escalatedCases}</div>
        </div>
      </div>

      {/* 5B - QUEUE FILTERING */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search Case ID or Customer..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" 
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 p-2 outline-none">
            <option value="ALL">All Status</option>
            <option value="NEW">New</option>
            <option value="UNDER REVIEW">Under Review</option>
            <option value="ESCALATED">Escalated</option>
            <option value="RESOLVED">Resolved</option>
          </select>
          <select value={filterRisk} onChange={e => setFilterRisk(e.target.value)} className="bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 p-2 outline-none">
            <option value="ALL">All Risk</option>
            <option value="CRITICAL">Critical</option>
            <option value="MODERATE">Moderate</option>
          </select>
        </div>
      </div>

      {/* CASING TABLE */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 px-4">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Case ID</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Risk</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Transaction</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Owner</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map(c => (
                <tr key={c.caseId} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-700 whitespace-nowrap">
                    {c.caseId}<br/>
                    <span className="text-[10px] text-slate-400 font-medium">UPY-****-{c.transaction.senderAccount.substring(6)}</span>
                  </td>
                  <td className="p-4">
                    <div className={`font-bold ${c.riskAssessment.riskLevel === 'CRITICAL' ? 'text-red-600' : 'text-amber-600'}`}>
                      {c.riskAssessment.finalRiskScore}%
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase mt-0.5">{c.riskAssessment.riskLevel}</div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="font-bold text-slate-700">৳{c.transaction.amount.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5">{c.transaction.type.replace(/_/g, " ")}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded border border-slate-200">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-500 font-medium whitespace-nowrap">
                    {c.assignedTo || "Unassigned"}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setSelectedCaseId(c.caseId)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs rounded transition-colors whitespace-nowrap border border-blue-200"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 text-sm">
                    No matching cases found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
