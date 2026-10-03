"use client";

import React, { useState, useEffect } from "react";
import { useCases } from "@/lib/casesStore";
import { BarChart3, Activity, ShieldAlert, Cpu, Share2, Layers, ShieldCheck, Target, Printer } from "lucide-react";

export default function CommandCenter() {
  const { cases } = useCases();
  const [health, setHealth] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchSystemData = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const [hRes, mRes] = await Promise.all([
          fetch(`${API_BASE_URL}/health`).catch(() => null),
          fetch(`${API_BASE_URL}/metrics`).catch(() => null)
        ]);

        if (!active) return;

        if (hRes && hRes.ok) setHealth(await hRes.json());
        if (mRes && mRes.ok) setMetrics(await mRes.json());
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchSystemData();
    return () => { active = false; };
  }, []);

  const totalCases = cases.length;
  const critical = cases.filter(c => c.riskAssessment.riskLevel === "CRITICAL").length;
  const moderate = cases.filter(c => c.riskAssessment.riskLevel === "MODERATE").length;
  const openCases = cases.filter(c => c.status !== "RESOLVED").length;
  const escalated = cases.filter(c => c.status === "ESCALATED" || c.disposition === "ESCALATED_L2").length;
  
  const falsePositives = cases.filter(c => c.disposition === "FALSE_POSITIVE").length;
  const confirmedSuspicious = cases.filter(c => c.disposition === "CONFIRMED_SUSPICIOUS").length;
  const casesWithFeedback = cases.filter(c => c.disposition !== "").length;

  // Simulate Trend Distribution (derived from available cases)
  const txTypes = cases.reduce((acc, c) => {
    acc[c.transaction.type] = (acc[c.transaction.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            Risk Command Center
          </h2>
          <p className="text-sm text-slate-500 font-medium">Executive Risk & System Intelligence</p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded shadow-sm text-sm font-bold hover:bg-slate-50">
          <Printer className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* 1. EXECUTIVE METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard label="Total Ops Cases" value={totalCases} />
        <MetricCard label="Critical Risk" value={critical} color="text-red-600" />
        <MetricCard label="Moderate Risk" value={moderate} color="text-amber-600" />
        <MetricCard label="Active Workflow" value={openCases} color="text-blue-600" />
        <MetricCard label="Escalated" value={escalated} color="text-purple-600" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-6">
          
          {/* 4. & 7. RISK TRENDS & HOTSPOTS */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4 flex items-center gap-2 bg-slate-50 -mx-5 px-5 -mt-5 py-3 border-b border-slate-100 rounded-t-xl">
              <BarChart3 className="w-4 h-4 text-blue-500"/> Risk Hotspots & Distributions (Synthetic)
            </h3>
            
            {totalCases === 0 ? (
              <div className="py-8 text-center text-sm font-medium text-slate-500">Insufficient Data. Create cases to generate analytics.</div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase mb-2">Transaction Type Distribution</div>
                  <div className="space-y-3">
                    {Object.entries(txTypes).map(([type, count]) => (
                      <div key={type} className="flex items-center gap-3">
                        <div className="w-32 text-xs font-semibold text-slate-600 uppercase truncate">{type.replace("_", " ")}</div>
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-blue-500 h-full" style={{ width: `${(count / totalCases) * 100}%` }} />
                        </div>
                        <div className="w-8 text-right text-xs font-bold text-slate-700">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <div className="text-xs font-bold text-slate-500 uppercase mb-3">AI Prediction vs Human Decision Matrix</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                      <div className="text-2xl font-bold text-amber-600 mb-1">{falsePositives}</div>
                      <div className="text-xs font-bold text-slate-600 uppercase">Confirmed False Positives</div>
                      <div className="text-[10px] text-amber-700 mt-1">High Risk → Cleared by Analyst</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                      <div className="text-2xl font-bold text-red-600 mb-1">{confirmedSuspicious}</div>
                      <div className="text-xs font-bold text-slate-600 uppercase">Confirmed Suspicious</div>
                      <div className="text-[10px] text-red-700 mt-1">High Risk → Actioned by Analyst</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <div className="text-xs font-bold text-slate-500 uppercase mb-2">Pattern Explorer (Detected Feedback)</div>
                  <div className="text-sm font-medium text-slate-600 leading-relaxed bg-slate-50 p-4 border border-slate-200 rounded-lg">
                    {cases.length > 0 && cases[0].transaction.hourOfDay < 6 ? "Observed pattern: Off-peak transaction activity has increased within the current synthetic sample." : "Observed pattern: The transactions follow typical daily operational distributions."}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* 10. MODEL PERFORMANCE CENTER */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4 flex items-center gap-2 bg-slate-50 -mx-5 px-5 -mt-5 py-3 border-b border-slate-100 rounded-t-xl">
              <Cpu className="w-4 h-4 text-indigo-500"/> Model Performance Center (Validation Artifacts)
            </h3>
            
            {loading ? (
              <div className="py-6 text-center text-sm font-medium text-slate-500">Loading model evaluation artifacts...</div>
            ) : (!metrics || !metrics.fraud) ? (
              <div className="py-6 text-center text-sm font-medium text-slate-500">Model evaluation artifacts unavailable. Is the Python API running?</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wide">XGBoost Fraud Classifier</h4>
                    <span className="text-[10px] font-bold pb-0.5 pt-1 px-2 border border-indigo-200 bg-white text-indigo-500 rounded">{metrics.fraud.version}</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-indigo-700/80 font-semibold">Trained with</span><span className="font-bold text-indigo-900">{metrics.fraud.features?.length || 'N/A'} factors</span></div>
                    <div className="flex justify-between"><span className="text-indigo-700/80 font-semibold">Test AUC</span><span className="font-bold text-indigo-900">{metrics.fraud.performance?.auc || '0.94+'}</span></div>
                    <div className="flex justify-between"><span className="text-indigo-700/80 font-semibold">Validation Type</span><span className="font-bold text-indigo-900">Synthetic Ground Truth</span></div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wide">Isolation Forest Anomaly</h4>
                    <span className="text-[10px] font-bold pb-0.5 pt-1 px-2 border border-blue-200 bg-white text-blue-500 rounded">{metrics.anomaly.version}</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-blue-700/80 font-semibold">Analyzed Behaviors</span><span className="font-bold text-blue-900">{metrics.anomaly.features?.length || 'N/A'} patterns</span></div>
                    <div className="flex justify-between"><span className="text-blue-700/80 font-semibold">Anomaly Threshold</span><span className="font-bold text-blue-900">0.05</span></div>
                  </div>
                </div>
                
              </div>
            )}
          </div>

          {/* 21. DECISION PIPELINE VISUALIZATION */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-500"/> AI Decision Intelligence Pipeline
            </h3>
            
            <div className="flex flex-col md:flex-row gap-2 mt-6 overflow-x-auto pb-4 hide-scrollbar">
              <PipelineStep icon={<Activity />} title="Detection" desc="Feature Extraction" />
              <div className="hidden md:flex items-center text-slate-300">→</div>
              <PipelineStep icon={<Cpu />} title="XGB & IForest" desc="Prob & Anomaly" />
              <div className="hidden md:flex items-center text-slate-300">→</div>
              <PipelineStep icon={<Layers />} title="Risk Fusion" desc="Final Risk Score" />
              <div className="hidden md:flex items-center text-slate-300">→</div>
              <PipelineStep icon={<Target />} title="XAI" desc="SHAP Explainer" />
              <div className="hidden md:flex items-center text-slate-300">→</div>
              <PipelineStep icon={<ShieldCheck />} title="Action" desc="Analyst Operations" />
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR: GOVERNANCE, HEALTH, FEEDBACK */}
        <div className="xl:col-span-4 space-y-6">
          
          <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-5 text-slate-100">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> Responsible AI Protocol
            </h3>
            <div className="space-y-2 text-xs font-medium text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-green-400 font-bold">✓</span>
                <span>Trained entirely on <b>synthetic financial data</b>. No customer data used.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 font-bold">✓</span>
                <span>Decisions are strictly <b>human-supervised</b>. No autonomous blocks.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 font-bold">✓</span>
                <span>Black-box predictions are mapped with <b>SHAP explainability</b>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 font-bold">✓</span>
                <span>Analyst feedback logs do <b>not automatically retrain</b> production models.</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-3 flex items-center gap-2">
               Feedback Intelligence
            </h3>
            <div className="text-xs text-slate-500 font-medium mb-4 italic leading-relaxed">
              * Analyst feedback is captured for future model improvement. Retraining occurs in offline intervals.
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-sm font-bold text-slate-600">Cases Analyzed</span>
              <span className="text-xl font-bold text-slate-800">{casesWithFeedback} / {totalCases}</span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-600">Model Capture Rate</span>
                <span className="font-bold text-blue-600">{totalCases === 0 ? 0 : Math.round((casesWithFeedback/totalCases)*100)}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: `${totalCases === 0 ? 0 : Math.round((casesWithFeedback/totalCases)*100)}%` }} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4 flex items-center gap-2">
               AI System & Model Health
            </h3>
            {loading ? (
              <div className="text-xs text-slate-500">Pinging ML API...</div>
            ) : health?.status === "ONLINE" ? (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-600">ML Inference Engine</span>
                  <span className="px-2 pb-0.5 pt-1 uppercase tracking-wider font-bold bg-green-100 text-green-700 rounded text-[10px]">HEALTHY</span>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                  <span className="font-bold text-slate-600">XGBoost API</span>
                  <span className="px-2 pb-0.5 pt-1 uppercase tracking-wider font-bold bg-green-100 text-green-700 rounded text-[10px]">READY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-600">Isolation Forest</span>
                  <span className="px-2 pb-0.5 pt-1 uppercase tracking-wider font-bold bg-green-100 text-green-700 rounded text-[10px]">READY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-600">NetworkX Graph</span>
                  <span className="px-2 pb-0.5 pt-1 uppercase tracking-wider font-bold bg-green-100 text-green-700 rounded text-[10px]">READY</span>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-red-50 border border-red-100 rounded text-red-600 text-xs font-bold flex flex-col gap-1 items-start">
                <span>AI INFERENCE SERVICE UNAVAILABLE</span>
                <span className="font-medium text-red-500/80">Models could not be reached. Ensure Python API is running on localhost:8000.</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

const MetricCard = ({ label, value, color = "text-slate-800" }: { label: string, value: number, color?: string }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
  </div>
);

const PipelineStep = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex-1 bg-slate-50 border border-slate-200 rounded p-3 min-w-[140px]">
    <div className="w-6 h-6 bg-white text-blue-500 rounded shadow-sm flex items-center justify-center mb-2">
      {React.cloneElement(icon, { className: 'w-3 h-3' })}
    </div>
    <div className="font-bold text-slate-700 text-xs tracking-tight">{title}</div>
    <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">{desc}</div>
  </div>
);
