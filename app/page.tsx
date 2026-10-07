"use client";

import { useState } from "react";
import IntelligenceDashboard from "@/components/IntelligenceDashboard";
import OperationsQueue from "@/components/OperationsQueue";
import CommandCenter from "@/components/CommandCenter";
import BusinessImpact from "@/components/BusinessImpact";
import SystemOverview from "@/components/SystemOverview";
import { CasesProvider } from "@/lib/casesStore";
import { Activity, LayoutDashboard, Shield, BarChart3, Fingerprint } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"SIMULATOR" | "OPERATIONS" | "COMMAND_CENTER" | "BUSINESS_IMPACT" | "ARCHITECTURE">("ARCHITECTURE");

  return (
    <CasesProvider>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-6 bg-white shrink-0 shadow-sm rounded-t-xl overflow-x-auto hide-scrollbar mt-6">
          <button 
            onClick={() => setActiveTab("ARCHITECTURE")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'ARCHITECTURE' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            <Fingerprint className="w-4 h-4" /> Architecture & Ethics
          </button>
          <button 
            onClick={() => setActiveTab("SIMULATOR")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'SIMULATOR' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            <Activity className="w-4 h-4" /> Real-time Analysis Simulator
          </button>
          <button 
            onClick={() => setActiveTab("OPERATIONS")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'OPERATIONS' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            <Shield className="w-4 h-4" /> Risk Operations & Cases
          </button>
          <button 
            onClick={() => setActiveTab("COMMAND_CENTER")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'COMMAND_CENTER' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            <BarChart3 className="w-4 h-4" /> Risk Command Center
          </button>
          <button 
            onClick={() => setActiveTab("BUSINESS_IMPACT")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'BUSINESS_IMPACT' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Business Impact & ROI
          </button>
        </div>

        {activeTab === "ARCHITECTURE" && <SystemOverview />}
        {activeTab === "SIMULATOR" && <IntelligenceDashboard onNavigateToOps={() => setActiveTab("OPERATIONS")} />}
        {activeTab === "OPERATIONS" && <OperationsQueue />}
        {activeTab === "COMMAND_CENTER" && <CommandCenter />}
        {activeTab === "BUSINESS_IMPACT" && <BusinessImpact />}
      </div>
    </CasesProvider>
  );
}
