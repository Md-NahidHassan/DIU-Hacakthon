"use client";

import React from "react";
import { TransactionInput } from "@/lib/types";
import { Users, Info } from "lucide-react";

export default function BehaviorInsights({ tx }: { tx: TransactionInput }) {
  // Derive normal baseline from the synthetic context to highlight deviations
  const normalHour = "10:00 - 18:00";
  const currentHour = `${tx.hourOfDay < 10 ? '0' : ''}${tx.hourOfDay}:00`;
  const isTimeDeviating = tx.hourOfDay < 6 || tx.hourOfDay > 23;

  const isAmtDeviating = tx.amount > 15000;
  
  const isDeviating = isTimeDeviating || tx.isNewDevice || tx.isUnusualLocation || isAmtDeviating || (tx.transactionVelocity ?? 0) > 3;

  return (
    <div className="glass-card rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full bg-white">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wide">
          <Users className="w-4 h-4 text-blue-500" />
          User Behavior Intelligence
        </h3>
      </div>
      
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-3 text-sm mb-2 border-b border-slate-100 pb-2 font-bold text-slate-400 uppercase">
          <div>Metric</div>
          <div>Usual Pattern</div>
          <div>Current Transaction</div>
        </div>
        
        <div className="space-y-3 mt-3">
          <div className="grid grid-cols-3 text-sm">
            <div className="font-medium text-slate-600">Time</div>
            <div className="text-slate-500">{normalHour}</div>
            <div className={`font-semibold ${isTimeDeviating ? "text-amber-600" : "text-green-600"}`}>
              {currentHour}
            </div>
          </div>
          
          <div className="grid grid-cols-3 text-sm">
            <div className="font-medium text-slate-600">Location</div>
            <div className="text-slate-500">Dhaka, BD (Primary)</div>
            <div className={`font-semibold ${tx.isUnusualLocation ? "text-red-500" : "text-green-600"}`}>
              {tx.isUnusualLocation ? "Unrecognized Area" : "Dhaka, BD"}
            </div>
          </div>

          <div className="grid grid-cols-3 text-sm">
            <div className="font-medium text-slate-600">Device</div>
            <div className="text-slate-500">iPhone 13 (Known)</div>
            <div className={`font-semibold ${tx.isNewDevice ? "text-amber-600" : "text-green-600"}`}>
              {tx.isNewDevice ? "Xiaomi Redmi Note (New)" : "iPhone 13"}
            </div>
          </div>

          <div className="grid grid-cols-3 text-sm">
            <div className="font-medium text-slate-600">Velocity (1h)</div>
            <div className="text-slate-500">0 - 1 txns</div>
            <div className={`font-semibold ${(tx.transactionVelocity ?? 0) > 3 ? "text-red-500" : "text-green-600"}`}>
              {tx.transactionVelocity} txns
            </div>
          </div>
        </div>

        <div className={`mt-5 p-3 rounded-lg flex items-start gap-2 ${isDeviating ? "bg-amber-50 text-amber-800 border border-amber-200" : "bg-blue-50 text-blue-800 border border-blue-200"}`}>
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm font-medium">
            {isDeviating 
              ? "Behavior deviation detected. Current activity differs significantly from the user's established transaction pattern." 
              : "Transaction behavior aligns consistently with historical baseline patterns."}
          </div>
        </div>
      </div>
    </div>
  );
}
