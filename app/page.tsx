import React from "react";
import { LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-blue-600" />
          Intelligence Dashboard
        </h2>
        <div className="text-sm text-slate-500">
          Showing real-time synthetic analysis
        </div>
      </div>

      {/* KPI Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5 border border-slate-200 min-h-[120px] flex items-center justify-center text-slate-400">
          KPI Overview Placeholder
        </div>
        <div className="glass-card rounded-xl p-5 border border-slate-200 min-h-[120px] flex items-center justify-center text-slate-400">
          KPI Overview Placeholder
        </div>
        <div className="glass-card rounded-xl p-5 border border-slate-200 min-h-[120px] flex items-center justify-center text-slate-400">
          KPI Overview Placeholder
        </div>
      </section>

      {/* Main Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Simulator & Live Feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Transaction Risk Simulator */}
          <section className="glass-card rounded-xl p-6 border border-slate-200 min-h-[300px] flex items-center justify-center text-slate-400">
            Transaction Risk Simulator Placeholder
          </section>

          {/* Behavior & Network Intelligence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="glass-card rounded-xl p-6 border border-slate-200 min-h-[250px] flex items-center justify-center text-slate-400">
              User Behavior Intelligence Placeholder
            </section>
            
            <section className="glass-card rounded-xl p-6 border border-slate-200 min-h-[250px] flex items-center justify-center text-slate-400">
              Suspicious Network Intelligence Placeholder
            </section>
          </div>

          {/* Live Transaction Feed */}
          <section className="glass-card rounded-xl p-6 border border-slate-200 min-h-[400px] flex items-center justify-center text-slate-400">
            Live Synthetic Transaction Feed Placeholder
          </section>
        </div>

        {/* Right Column: AI Analysis, Recommendation, Analytics */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Risk Score & Explainable AI */}
          <section className="glass-card rounded-xl p-6 border border-slate-200 min-h-[250px] flex flex-col items-center justify-center text-slate-400 text-center">
            <div className="mb-4">Risk Score Placeholder</div>
            <div>Explainable AI Factors Placeholder</div>
          </section>

          {/* Recommended Action */}
          <section className="glass-card rounded-xl p-6 border border-slate-200 min-h-[150px] flex items-center justify-center text-slate-400">
            Recommended Action Placeholder
          </section>

          {/* Analytics Overview */}
          <section className="glass-card rounded-xl p-6 border border-slate-200 min-h-[350px] flex items-center justify-center text-slate-400">
            Risk Distribution Analytics Placeholder
          </section>
        </div>
      </div>
    </div>
  );
}
