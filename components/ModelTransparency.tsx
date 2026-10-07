import React, { useState } from "react";
import { Activity, Network, BarChart2, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function ModelTransparency({ metrics, modelVersion }: { metrics: any, modelVersion: any }) {
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const roc_auc = metrics?.fraud?.metrics?.roc_auc ? (metrics.fraud.metrics.roc_auc * 100).toFixed(2) + "%" : "Not available";
  const features = metrics?.fraud?.features || [];

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <section className="glass-card rounded-xl p-6 border border-slate-200">
        <div className="border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">AI MODEL PERFORMANCE</h3>
          <p className="text-xs font-semibold text-blue-600 mt-1 uppercase">Synthetic Validation Metrics</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-xs font-semibold text-slate-500 uppercase">Precision</div>
            <div className="font-bold text-slate-800 mt-1">Not available</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-xs font-semibold text-slate-500 uppercase">Recall</div>
            <div className="font-bold text-slate-800 mt-1">Not available</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-xs font-semibold text-slate-500 uppercase">F1 Score</div>
            <div className="font-bold text-slate-800 mt-1">Not available</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-xs font-semibold text-slate-500 uppercase">ROC-AUC</div>
            <div className="font-bold text-slate-800 mt-1">{roc_auc}</div>
          </div>
        </div>
        <p className="text-xs text-slate-400 italic">Metrics are based on synthetic validation data and do not represent production performance.</p>
      </section>

      {/* Model Versions */}
      <section className="glass-card rounded-xl p-6 border border-slate-200">
        <div className="border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">Model Versions</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded border border-slate-100">
            <span className="text-xs font-bold text-slate-600">XGBoost</span>
            <code className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">{modelVersion?.fraud || "xgb-v1"}</code>
          </div>
          <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded border border-slate-100">
            <span className="text-xs font-bold text-slate-600">Isolation Forest</span>
            <code className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">{modelVersion?.anomaly || "iforest-v1"}</code>
          </div>
          <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded border border-slate-100">
            <span className="text-xs font-bold text-slate-600">Graph Risk</span>
            <code className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">{modelVersion?.network || "graph-v1"}</code>
          </div>
          <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded border border-slate-100">
            <span className="text-xs font-bold text-slate-600">SHAP</span>
            <code className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">SHAP / XGBoost</code>
          </div>
        </div>
      </section>

      {/* Model Pipeline Visualization */}
      <section className="glass-card rounded-xl p-6 border border-slate-200">
        <div className="border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">Model Pipeline</h3>
        </div>
        <div className="flex flex-col items-center text-xs font-bold text-slate-600 gap-2">
          <div className="px-4 py-2 bg-slate-100 rounded-md border border-slate-200 w-48 text-center text-slate-700">Synthetic Transaction</div>
          <div className="text-slate-300">↓</div>
          <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md border border-blue-200 w-48 text-center">Feature Engineering</div>
          <div className="text-slate-300">↓</div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center w-full justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="px-3 py-2 bg-green-50 text-green-700 rounded-md border border-green-200 w-40 text-center">XGBoost</div>
              <div className="text-slate-300">↓</div>
              <div className="text-slate-500">Fraud Probability</div>
            </div>
            <div className="text-slate-400 font-bold hidden md:block">+</div>
            <div className="flex flex-col items-center gap-2">
              <div className="px-3 py-2 bg-purple-50 text-purple-700 rounded-md border border-purple-200 w-40 text-center">Isolation Forest</div>
              <div className="text-slate-300">↓</div>
              <div className="text-slate-500">Behavior Anomaly</div>
            </div>
            <div className="text-slate-400 font-bold hidden md:block">+</div>
            <div className="flex flex-col items-center gap-2">
              <div className="px-3 py-2 bg-amber-50 text-amber-700 rounded-md border border-amber-200 w-40 text-center">Graph Analytics</div>
              <div className="text-slate-300">↓</div>
              <div className="text-slate-500">Network Risk</div>
            </div>
          </div>
          
          <div className="text-slate-300">↓</div>
          <div className="px-4 py-2 bg-slate-800 text-white rounded-md border border-slate-700 w-48 text-center">Risk Fusion</div>
          <div className="text-slate-300">↓</div>
          <div className="px-4 py-2 bg-red-50 text-red-700 rounded-md border border-red-200 font-extrabold text-sm w-48 text-center">Final Risk Score</div>
        </div>
      </section>

      {/* Feature Transparency */}
      {features.length > 0 && (
        <section className="glass-card rounded-xl border border-slate-200 overflow-hidden">
          <button 
            onClick={() => setFeaturesOpen(!featuresOpen)} 
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">MODEL FEATURES</h3>
            {featuresOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
          </button>
          
          {featuresOpen && (
            <div className="p-4 pt-0 border-t border-slate-100 bg-slate-50">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-medium text-slate-600">
                {features.map((f: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
