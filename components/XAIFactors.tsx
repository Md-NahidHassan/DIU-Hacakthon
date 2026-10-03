"use client";

import React from "react";
import { XAIFactor } from "@/lib/types";

export default function XAIFactors({ factors }: { factors: XAIFactor[] }) {
  if (!factors || factors.length === 0) return null;

  return (
    <div className="w-full mt-6 text-left">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
        Why is this risky?
      </h3>
      <div className="space-y-3">
        {factors.map((factor, idx) => {
          const isPos = factor.direction === "POSITIVE";
          const barColor = isPos ? "bg-amber-400" : "bg-green-400";
          const sign = isPos ? "+" : "-";
          
          return (
            <div key={idx} className="flex flex-col space-y-1 group">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700">{factor.label}</span>
                <span className={`font-semibold ${isPos ? "text-amber-600" : "text-green-600"}`}>
                  {sign}{factor.weight}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full ${barColor} rounded-full transition-all duration-1000 ease-out`} 
                  style={{ width: `${Math.min(factor.weight, 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 hidden group-hover:block transition-all duration-300">
                {factor.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
