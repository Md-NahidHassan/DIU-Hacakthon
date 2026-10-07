"use client";

import { useState } from "react";
import IntelligenceDashboard from "@/components/IntelligenceDashboard";
import OperationsQueue from "@/components/OperationsQueue";
import CommandCenter from "@/components/CommandCenter";
import BusinessImpact from "@/components/BusinessImpact";
import { CasesProvider } from "@/lib/casesStore";
import { Activity, LayoutDashboard, Shield, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"SIMULATOR" | "OPERATIONS" | "COMMAND_CENTER" | "BUSINESS_IMPACT">("SIMULATOR");

  return (
    <CasesProvider>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-6 bg-white shrink-0 shadow-sm rounded-t-xl overflow-hidden mt-6">
          <button 
            onClick={() => setActiveTab("SIMULATOR")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'SIMULATOR' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            <Activity className="w-4 h-4" /> Real-time Analysis Simulator
          </button>
          <button 
            onClick={() => setActiveTab("OPERATIONS")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'OPERATIONS' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            <Shield className="w-4 h-4" /> Risk Operations & Cases
          </button>
          <button 
            onClick={() => setActiveTab("COMMAND_CENTER")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'COMMAND_CENTER' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            <BarChart3 className="w-4 h-4" /> Risk Command Center
          </button>
          <button 
            onClick={() => setActiveTab("BUSINESS_IMPACT")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'BUSINESS_IMPACT' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            <Activity className="w-4 h-4" /> Business Impact & ROI
          </button>
        </div>

        {activeTab === "SIMULATOR" && <IntelligenceDashboard onNavigateToOps={() => setActiveTab("OPERATIONS")} />}
        {activeTab === "OPERATIONS" && <OperationsQueue />}
        {activeTab === "COMMAND_CENTER" && <CommandCenter />}
        {activeTab === "BUSINESS_IMPACT" && <BusinessImpact />}
      </div>
    </CasesProvider>
  );
}
