"use client";

import React from "react";
import { ShieldCheck, Layers, Server, Activity, Lock, Share2, Target, Cpu, Search, CheckCircle2, FlaskConical, Code2, Scale } from "lucide-react";

export default function SystemOverview() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
      
      {/* HEADER VALUE STATEMENT */}
      <div className="text-center py-10 bg-white rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
          upay Shield turns transaction risk signals into explainable, investigation-ready intelligence.
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-3xl mx-auto flex items-center justify-center gap-2">
          Detect the risk <span className="text-blue-500">•</span> Understand why <span className="text-blue-500">•</span> Investigate the evidence <span className="text-blue-500">•</span> Decide with confidence
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* 1. WHY UPAY SHIELD? (INNOVATION STORY) */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">WHY UPAY SHIELD?</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2"><Layers className="w-4 h-4 text-indigo-500" /><h4 className="font-bold text-slate-800">Multi-Layer Risk Intelligence</h4></div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">Integrates known fraud patterns, behavioral anomalies, and suspicious network signals into a unified assessment.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-500" /><h4 className="font-bold text-slate-800">Explainable AI (XAI)</h4></div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">Risk scores are supported by model-driven feature attribution (SHAP), replacing black-box decisions with transparency.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2"><Search className="w-4 h-4 text-amber-500" /><h4 className="font-bold text-slate-800">Investigation-First Workflow</h4></div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">The system goes beyond &quot;fraud detected&quot; by compiling contextual evidence directly for analyst investigation.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-500" /><h4 className="font-bold text-slate-800">Human-in-the-Loop</h4></div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">AI accelerates prioritization and evidence gathering, while consequential decisions remain explicitly subject to human oversight.</p>
              </div>
            </div>
          </section>

          {/* 2. AI TRUST ARCHITECTURE */}
          <section className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden text-slate-200">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">AI TRUST ARCHITECTURE</h3>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-indigo-300 uppercase bg-indigo-900 border border-indigo-700 px-2 py-1 rounded">Component Separation</span>
            </div>
            <div className="p-8">
              <div className="flex flex-col items-center max-w-2xl mx-auto space-y-4 text-sm font-bold uppercase tracking-widest text-center">
                
                <div className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-slate-300">Synthetic Transaction Data</div>
                <div className="text-slate-500">↓</div>
                
                <div className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-slate-300">Feature Engineering Pipeline</div>
                <div className="text-slate-500">↓</div>

                <div className="w-full border-2 border-indigo-500/50 rounded-xl p-5 bg-indigo-900/20 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 px-3 text-[10px] text-indigo-400">ML INFERENCE ENGINES</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div className="bg-indigo-900/50 border border-indigo-800 rounded p-3 text-indigo-200">XGBoost Fraud Model</div>
                    <div className="bg-indigo-900/50 border border-indigo-800 rounded p-3 text-indigo-200">Isolation Forest Anomaly</div>
                    <div className="bg-indigo-900/50 border border-indigo-800 rounded p-3 text-indigo-200">Graph Network Risk</div>
                  </div>
                </div>
                <div className="text-slate-500">↓</div>

                <div className="w-full bg-blue-900/30 border border-blue-800 rounded-lg p-3 text-blue-300">Risk Fusion</div>
                <div className="text-slate-500">↓</div>

                <div className="w-full bg-amber-900/30 border border-amber-800 rounded-lg p-3 text-amber-300 text-lg">Final Risk Score</div>
                <div className="text-slate-500">↓</div>

                <div className="w-full bg-emerald-900/30 border border-emerald-800 rounded-lg p-3 text-emerald-300">SHAP / Explainability</div>
                <div className="text-slate-500">↓</div>

                <div className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-slate-300">Investigation Workspace</div>
                <div className="text-slate-500">↓</div>

                <div className="w-full bg-emerald-600 text-white rounded-lg p-3 text-lg">Human Review / Action</div>
              </div>
            </div>
          </section>

          {/* 3. SCALABILITY & INTEGRATION VISIBILITY */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">DESIGNED FOR INTEGRATION</h3>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-slate-600 font-medium mb-6">
                The prototype architecture strictly separates the user interface from machine learning inference, ensuring future scalability through service-based APIs.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-5 text-center w-full">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Display & Operations</div>
                  <div className="text-xl font-bold text-slate-800">Next.js / React</div>
                  <div className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-2 border border-blue-100">Frontend UI</div>
                </div>

                <div className="shrink-0 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">REST API</span>
                  <div className="flex gap-1 items-center">
                    <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                    <span className="w-12 h-0.5 bg-slate-300"></span>
                    <Share2 className="text-slate-400 w-5 h-5" />
                    <span className="w-12 h-0.5 bg-slate-300"></span>
                    <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                  </div>
                </div>

                <div className="flex-1 bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-center w-full">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Inference Engine / ML</div>
                  <div className="text-xl font-bold text-indigo-900">Python / FastAPI</div>
                  <div className="text-[10px] uppercase font-bold text-indigo-600 bg-white inline-block px-2 py-0.5 rounded mt-2 border border-indigo-200">Backend Service</div>
                </div>

              </div>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="xl:col-span-4 space-y-6">

          {/* 4. RESPONSIBLE AI & SAFETY PANEL */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-600" /> Responsible AI
              </h3>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3">
                Safety Principles Implemented:
              </p>
              
              <div className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> <span>Synthetic data training and demonstration only.</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> <span>Explainable model outputs (SHAP).</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> <span>Mandatory human oversight for reviews.</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> <span>No autonomous consequential financial decisions.</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> <span>Evidence-grounded investigation UI.</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> <span>Privacy-first prototype environment.</span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 font-medium leading-relaxed">
                  <strong>Policy:</strong> upay Shield is an AI-assisted decision-support prototype. Consequential financial actions should always remain subject to appropriate human and operational controls.
                </div>
              </div>
            </div>
          </div>

          {/* 5. PRODUCT JOURNEY */}
          <div className="bg-slate-50 rounded-xl shadow-inner border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">From Detection to Decision</h3>
            </div>
            <div className="p-5 font-bold uppercase tracking-widest text-[10px] text-slate-600 text-center flex flex-col gap-2">
              <div>
                <span className="text-blue-600 block mb-0.5">DETECT</span>
                <span className="text-[9px] font-medium text-slate-400 normal-case">XGBoost & Isolation Forest</span>
              </div>
              <div className="text-slate-300">↓</div>
              <div>
                <span className="text-blue-600 block mb-0.5">PRIORITIZE</span>
                <span className="text-[9px] font-medium text-slate-400 normal-case">Risk Fusion</span>
              </div>
              <div className="text-slate-300">↓</div>
              <div>
                <span className="text-blue-600 block mb-0.5">EXPLAIN</span>
                <span className="text-[9px] font-medium text-slate-400 normal-case">SHAP Transparency</span>
              </div>
              <div className="text-slate-300">↓</div>
              <div>
                <span className="text-blue-600 block mb-0.5">INVESTIGATE</span>
                <span className="text-[9px] font-medium text-slate-400 normal-case">Behavior & Network Intelligence</span>
              </div>
              <div className="text-slate-300">↓</div>
              <div>
                <span className="text-emerald-600 block mb-0.5">RECOMMEND</span>
                <span className="text-[9px] font-medium text-slate-400 normal-case">Risk-based Action Mapping</span>
              </div>
              <div className="text-slate-300">↓</div>
              <div>
                <span className="text-emerald-600 block mb-0.5">HUMAN REVIEW</span>
                <span className="text-[9px] font-medium text-slate-400 normal-case">Investigation Workspace</span>
              </div>
            </div>
          </div>

          {/* 6. PROTOTYPE LIMITATIONS */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Lock className="w-3 h-3" /> Prototype Limitations Scope
              </h3>
            </div>
            <div className="p-5 text-xs text-slate-600 font-medium space-y-2">
              <ul className="list-disc pl-4 space-y-1 text-slate-500">
                <li>Synthetic data environment only.</li>
                <li>Synthetic validation metrics displayed.</li>
                <li>No production upay transaction data used.</li>
                <li>No claims of production fraud-loss prevention.</li>
                <li>No autonomous financial decision-making capacity.</li>
              </ul>
              <p className="mt-3 pt-3 border-t border-slate-100 italic text-slate-400 text-[10px]">
                Real-world validation and deployment remains a future development step.
              </p>
            </div>
          </div>

          {/* 7. FUTURE VALIDATION PATH */}
          <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden text-slate-300 text-xs">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FlaskConical className="w-3 h-3" /> Future Validation Path
              </h3>
            </div>
            <div className="p-5 space-y-3 font-medium">
              <div className="flex gap-3 items-center">
                <div className="w-16 text-right font-bold text-[10px] uppercase text-indigo-400 tracking-widest">Current</div>
                <div className="flex-1 bg-slate-700 px-3 py-1.5 rounded">Synthetic Validation</div>
              </div>
              <div className="flex gap-3 justify-center text-slate-600">↓</div>
              <div className="flex gap-3 items-center">
                <div className="w-16 text-right font-bold text-[10px] uppercase text-slate-500 tracking-widest">Next</div>
                <div className="flex-1 bg-slate-700/50 px-3 py-1.5 rounded text-slate-400 border border-slate-600">Historical validation on approved data</div>
              </div>
              <div className="flex gap-3 justify-center text-slate-600">↓</div>
              <div className="flex gap-3 items-center">
                <div className="w-16 text-right font-bold text-[10px] uppercase text-slate-500 tracking-widest">Pilot</div>
                <div className="flex-1 bg-slate-700/50 px-3 py-1.5 rounded text-slate-400 border border-slate-600">Human-reviewed shadow mode</div>
              </div>
              <div className="flex gap-3 justify-center text-slate-600">↓</div>
              <div className="flex gap-3 items-center">
                <div className="w-16 text-right font-bold text-[10px] uppercase text-slate-500 tracking-widest">Goal</div>
                <div className="flex-1 bg-slate-700/50 px-3 py-1.5 rounded text-slate-400 border border-slate-600">Monitored production API integration</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
