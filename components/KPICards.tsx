"use client";

import React from "react";
import { Activity, ShieldCheck, AlertTriangle } from "lucide-react";

export default function KPICards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* KPI 1 */}
      <div className="glass-card rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Monitored Volume</div>
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-800 tracking-tight">৳14,250,000</div>
          <div className="text-xs text-slate-400 mt-1 italic font-medium">Synthetic Dataset Volume</div>
        </div>
      </div>

      {/* KPI 2 */}
      <div className="glass-card rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Risk Detection</div>
          <div className="p-2 bg-green-50 text-green-600 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-800 tracking-tight">98.7%</div>
          <div className="text-xs text-slate-400 mt-1 italic font-medium">Synthetic validation metric</div>
        </div>
      </div>

      {/* KPI 3 */}
      <div className="glass-card rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Critical Alerts</div>
          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-800 tracking-tight">12</div>
          <div className="text-xs text-slate-400 mt-1 italic font-medium">Based on simulated real-time data</div>
        </div>
      </div>
    </section>
  );
}
