"use client";

import React from "react";
import { RecommendedAction } from "@/lib/types";
import { CheckCircle2, ShieldAlert, AlertTriangle } from "lucide-react";

export default function RecommendationCard({ action }: { action: RecommendedAction }) {
  let config = {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />,
    title: "AUTO APPROVE",
    titleColor: "text-green-700",
    reason: "Transaction behavior aligns with established safe patterns.",
  };

  if (action === "BLOCK_AND_ESCALATE") {
    config = {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: <ShieldAlert className="w-5 h-5 text-red-600 mt-0.5" />,
      title: "BLOCK & ESCALATE",
      titleColor: "text-red-700",
      reason: "Multiple high-risk behavioral signals detected. Operator review required.",
    };
  } else if (action === "CHALLENGE_OTP_BIOMETRIC") {
    config = {
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />,
      title: "CHALLENGE (OTP / BIOMETRIC)",
      titleColor: "text-amber-700",
      reason: "Moderate risk signals detected. Verify user identity before proceeding.",
    };
  }

  return (
    <div className={`w-full rounded-xl border p-4 ${config.bg} ${config.border} flex flex-col space-y-3 shadow-sm transition-all duration-300`}>
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recommended Action</h3>
      
      <div className="flex items-start space-x-3">
        {config.icon}
        <div>
          <h4 className={`text-lg font-bold tracking-tight ${config.titleColor}`}>
            {config.title}
          </h4>
          <p className="text-sm text-slate-600 mt-1">
            Reason: <br className="sm:hidden" />
            <span className="font-medium">{config.reason}</span>
          </p>
          {action !== "AUTO_APPROVE" && (
            <p className="text-xs text-slate-500 mt-2 italic flex items-center gap-1">
              * Human oversight remains important.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
