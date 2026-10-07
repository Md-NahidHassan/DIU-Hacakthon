"use client";

import React from "react";
import { useCases } from "@/lib/casesStore";
import { Briefcase, Clock, TrendingDown, Target, ShieldCheck, Zap, Layers, UserCheck } from "lucide-react";

export default function BusinessImpact() {
  const { cases } = useCases();
  
  const totalCases = cases.length;
  const critical = cases.filter(c => c.riskAssessment.riskLevel === "CRITICAL").length;
  const moderate = cases.filter(c => c.riskAssessment.riskLevel === "MODERATE").length;
  const low = cases.filter(c => c.riskAssessment.riskLevel === "LOW").length;

  const traditionalMinPerCase = 30;
  const upayMinPerCase = 3;
  const savedMinPerCase = traditionalMinPerCase - upayMinPerCase;

  const demoCases = totalCases > 0 ? totalCases : 100; // Use actual cases if present, or demo count 100 if empty. Wait, instruction says "Use actual synthetic application data". "If local state is reset, acceptable". I will use totalCases directly, but if 0, show 0. To make a "Demo calculation" section as requested in requirement 9, I will provide a static illustrative demo calculation card, and also a dynamic one based on `totalCases`.

  const actualTraditionalMintues = totalCases * traditionalMinPerCase;
  const actualUpayMinutes = totalCases * upayMinPerCase;
  const actualSavedMinutes = totalCases * savedMinPerCase;
  const reductionPercentage = ((savedMinPerCase / traditionalMinPerCase) * 100).toFixed(0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" /> Business Impact & ROI
          </h2>
          <p className="text-sm text-slate-500 font-medium">Demonstration Metric — Simulated Prototype Estimate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* RISK OPERATIONS IMPACT */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">RISK OPERATIONS IMPACT</h3>
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest uppercase bg-blue-100 text-blue-700 rounded text-left">
                SIMULATED PROTOTYPE ESTIMATE
              </div>
              <p className="text-xs text-slate-400 italic mb-4">Illustrative estimate for hackathon demonstration. Not measured production performance.</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Investigations Assisted</div>
                  <div className="text-2xl font-bold text-slate-800 mt-2">{totalCases}</div>
                </div>
                <div className="border border-slate-200 rounded-lg p-4 bg-red-50">
                  <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Critical Alerts</div>
                  <div className="text-2xl font-bold text-red-600 mt-2">{critical}</div>
                </div>
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Est. Investigation Time</div>
                  <div className="text-2xl font-bold text-slate-800 mt-2">{upayMinPerCase} <span className="text-sm">min</span></div>
                </div>
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Estimated Time Saved</div>
                  <div className="text-2xl font-bold text-green-700 mt-2">{reductionPercentage}%</div>
                </div>
              </div>

              {/* Dynamic Calculation */}
              <div className="bg-white border border-slate-200 rounded-lg p-5 text-slate-600 text-sm font-mono flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="text-slate-400 uppercase text-[10px] tracking-widest font-sans">Cases Investigated</span>
                  <span className="text-xl text-slate-800 font-bold mt-1">{totalCases}</span>
                </div>
                <span className="text-slate-300 font-bold">×</span>
                <div className="flex flex-col items-center">
                  <span className="text-slate-400 uppercase text-[10px] tracking-widest font-sans">Est. Min Saved / Case</span>
                  <span className="text-xl text-slate-800 font-bold mt-1">{savedMinPerCase}</span>
                </div>
                <span className="text-slate-300 font-bold">=</span>
                <div className="flex flex-col items-center">
                  <span className="text-slate-400 uppercase text-[10px] tracking-widest font-sans">Est. Total Min Saved</span>
                  <span className="text-2xl font-bold text-emerald-600 mt-1">{actualSavedMinutes}</span>
                </div>
                <div className="flex flex-col items-center bg-emerald-50 text-emerald-700 font-bold px-4 py-2 rounded border border-emerald-100">
                  <span className="text-emerald-500 uppercase text-[10px] tracking-widest font-sans">Equivalent Hours</span>
                  <span className="text-xl mt-1">{(actualSavedMinutes / 60).toFixed(1)}h</span>
                </div>
              </div>

            </div>
          </section>

          {/* BEFORE VS AFTER */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">BEFORE vs AFTER COMPARISON</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              <div className="p-6">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">WITHOUT UPAY SHIELD</h4>
                <div className="flex flex-col gap-2 text-xs font-bold text-slate-500">
                  <div className="p-3 bg-slate-100 rounded text-center">Alert</div>
                  <div className="text-center text-slate-300">↓</div>
                  <div className="p-3 bg-slate-100 rounded text-center">Manual Investigation</div>
                  <div className="text-center text-slate-300">↓</div>
                  <div className="p-3 bg-slate-100 rounded text-center">Multiple Data Sources</div>
                  <div className="text-center text-slate-300">↓</div>
                  <div className="p-3 bg-slate-100 rounded text-center">Manual Pattern Analysis</div>
                  <div className="text-center text-slate-300">↓</div>
                  <div className="p-3 bg-slate-100 rounded text-center text-slate-700">Decision</div>
                </div>
              </div>
              <div className="p-6 bg-blue-50/50">
                <h4 className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-4">WITH UPAY SHIELD</h4>
                <div className="flex flex-col gap-2 text-xs font-bold text-blue-700">
                  <div className="p-3 bg-white border border-blue-100 rounded text-center text-slate-700">Alert</div>
                  <div className="text-center text-blue-200">↓</div>
                  <div className="p-3 bg-blue-100/50 border border-blue-200 rounded text-center">AI Risk Score</div>
                  <div className="text-center text-blue-200">↓</div>
                  <div className="p-3 bg-blue-100/50 border border-blue-200 rounded text-center">Explainable Evidence</div>
                  <div className="text-center text-blue-200">↓</div>
                  <div className="p-3 bg-blue-100/50 border border-blue-200 rounded text-center">Behavior + Network Context</div>
                  <div className="text-center text-blue-200">↓</div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded text-center text-amber-700">Recommended Action</div>
                  <div className="text-center text-blue-200">↓</div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-center text-emerald-800 font-extrabold">Human Review</div>
                </div>
              </div>
            </div>
          </section>

          {/* CUSTOMER PROTECTION STORY */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden text-slate-700">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-800 tracking-widest uppercase">CUSTOMER PROTECTION</h3>
              </div>
              <p className="text-sm font-medium leading-relaxed mb-6 text-slate-600">
                Upay Shield is designed to reduce unnecessary friction while drastically improving risk visibility. 
                By using precision algorithms, we protect legitimate customer experiences from overzealous generic transaction blocks.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold mt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 bg-emerald-50 text-emerald-600 rounded"><Target className="w-3 h-3"/></div>
                  <span>Detect unusual transaction behavior.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 bg-emerald-50 text-emerald-600 rounded"><Target className="w-3 h-3"/></div>
                  <span>Identify possible account takeover patterns.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 bg-emerald-50 text-emerald-600 rounded"><Target className="w-3 h-3"/></div>
                  <span>Detect suspicious transaction networks.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 bg-emerald-50 text-emerald-600 rounded"><Target className="w-3 h-3"/></div>
                  <span>Explain why a transaction was flagged.</span>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <div className="mt-0.5 p-1 bg-emerald-50 text-emerald-600 rounded"><UserCheck className="w-3 h-3"/></div>
                  <span className="text-emerald-700 font-bold">Support human review before consequential action.</span>
                </div>
              </div>
            </div>
            
            {/* FALSE-POSITIVE STORY */}
            <div className="bg-slate-50 p-6 border-t border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">HUMAN-IN-THE-LOOP WORKFLOW</h4>
              
              <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-600 gap-2">
                <div className="bg-white border border-slate-200 px-3 py-2 rounded">Transaction</div>
                <span className="hidden sm:block text-slate-300">→</span>
                <div className="bg-blue-50 px-3 py-2 rounded text-blue-700 border border-blue-200">AI Risk Assessment</div>
                <span className="hidden sm:block text-slate-300">→</span>
                <div className="bg-emerald-50 px-3 py-2 rounded text-emerald-700 border border-emerald-200">Evidence + Explain</div>
                <span className="hidden sm:block text-slate-300">→</span>
                <div className="bg-amber-50 px-3 py-2 rounded text-amber-700 border border-amber-200">Analyst Review</div>
                <span className="hidden sm:block text-slate-300">→</span>
                <div className="bg-white border border-slate-200 px-3 py-2 rounded">Action</div>
              </div>
              
              <div className="mt-6 text-center text-sm font-bold text-emerald-700 border border-emerald-200 bg-emerald-50 p-3 rounded">
                AI assists the analyst; it does not blindly replace the analyst.
              </div>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="xl:col-span-4 space-y-6">

          {/* BUSINESS VALUE SUMMARY */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">BUSINESS VALUE</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-3">
                <div className="shrink-0 mt-1"><Zap className="w-5 h-5 text-amber-500" /></div>
                <div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">FASTER INVESTIGATION</div>
                  <div className="text-[11px] text-slate-500 mt-1 font-medium">AI summarizes risk signals and relevant evidence.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 mt-1"><Layers className="w-5 h-5 text-blue-500" /></div>
                <div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">BETTER PRIORITIZATION</div>
                  <div className="text-[11px] text-slate-500 mt-1 font-medium">Critical cases can be surfaced before lower-risk events.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 mt-1"><Target className="w-5 h-5 text-purple-500" /></div>
                <div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">EXPLAINABLE DECISIONS</div>
                  <div className="text-[11px] text-slate-500 mt-1 font-medium">Analysts can see why a transaction received its risk score.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 mt-1"><ShieldCheck className="w-5 h-5 text-emerald-500" /></div>
                <div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">CUSTOMER PROTECTION</div>
                  <div className="text-[11px] text-slate-500 mt-1 font-medium">Suspicious activity can receive additional review before consequential action.</div>
                </div>
              </div>
            </div>
          </div>

          {/* ANALYST WORKLOAD */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">ANALYST WORKLOAD</h3>
            </div>
            <div className="p-5 flex flex-col items-center">
              <div className="w-full max-w-[200px] text-center p-3 rounded bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                <div className="text-[10px] text-slate-400 uppercase mb-1">Monitored</div>
                Total Transactions
              </div>
              <div className="text-slate-300 py-1">↓</div>
              <div className="w-full max-w-[200px] text-center p-3 rounded bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <div className="text-[10px] text-blue-400 uppercase mb-1">Risk Assessed</div>
                Risk Prioritized
              </div>
              <div className="text-slate-300 py-1">↓</div>
              <div className="w-full max-w-[200px] text-center p-3 rounded bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                <div className="text-[10px] text-amber-500 uppercase mb-1">Escalation</div>
                Critical & Moderate Cases
              </div>
              <div className="text-slate-300 py-1">↓</div>
              <div className="w-full max-w-[200px] text-center p-3 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <div className="text-[10px] text-emerald-500 uppercase mb-1">{totalCases} Total Assisted</div>
                AI-Assisted Investigations
              </div>
              
              <div className="w-full mt-6 space-y-2 text-xs font-bold text-slate-600">
                <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Assisted Low Risk / Approved:</span> <span>{low}</span></div>
                <div className="flex justify-between p-2 bg-amber-50 text-amber-800 rounded"><span>Assisted Moderate Risk:</span> <span>{moderate}</span></div>
                <div className="flex justify-between p-2 bg-red-50 text-red-800 rounded"><span>Assisted Critical Risk:</span> <span>{critical}</span></div>
              </div>
            </div>
          </div>

          {/* JUDGE'S STORY */}
          <div className="bg-slate-50 rounded-xl shadow-inner border border-slate-200 p-5 font-bold uppercase tracking-widest text-[10px] text-slate-500 text-center flex flex-col gap-2">
            <div><span className="text-blue-600">DETECT</span> behavior</div>
            <div className="text-slate-300">↓</div>
            <div><span className="text-blue-600">PRIORITIZE</span> risk</div>
            <div className="text-slate-300">↓</div>
            <div><span className="text-blue-600">EXPLAIN</span> context</div>
            <div className="text-slate-300">↓</div>
            <div><span className="text-blue-600">INVESTIGATE</span> evidence</div>
            <div className="text-slate-300">↓</div>
            <div><span className="text-emerald-600">ACT</span> with logic</div>
            <div className="text-slate-300">↓</div>
            <div><span className="text-emerald-600">PROTECT</span> customers</div>
          </div>

        </div>
      </div>
    </div>
  );
}
