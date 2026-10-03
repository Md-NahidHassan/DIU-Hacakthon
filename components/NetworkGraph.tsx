"use client";

import React from "react";
import { TransactionInput } from "@/lib/types";
import { Network, ArrowRight } from "lucide-react";

export default function NetworkGraph({ tx }: { tx: TransactionInput }) {
  // Determine if it represents a mule network
  const isMuleNetwork = (tx.transactionVelocity ?? 0) > 10 && tx.receiverIsNew && tx.isNewDevice;
  const isSuspiciousRoute = tx.receiverIsNew || tx.isUnusualLocation;

  return (
    <div className="glass-card rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full bg-white">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wide">
          <Network className="w-4 h-4 text-blue-500" />
          Suspicious Network Intelligence
        </h3>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-center items-center">
        {/* Simple visual representation of node flow */}
        <div className="flex flex-col items-center justify-center space-y-3 w-full border border-slate-100 bg-slate-50 rounded-xl p-6">
          <div className="px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm text-sm font-semibold text-slate-700 w-32 text-center relative">
            {tx.senderAccount}
            <div className="absolute top-1/2 -right-3 w-3 border-t-2 border-slate-300"></div>
          </div>
          
          <ArrowRight className="text-slate-400 rotate-90 my-1" />

          {isMuleNetwork && (
            <>
              <div className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg shadow-sm text-sm font-medium w-32 text-center">
                AC••••1142
              </div>
              <ArrowRight className="text-red-400 rotate-90 my-1" />
              <div className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg shadow-sm text-sm font-medium w-32 text-center">
                AC••••7720
              </div>
              <ArrowRight className="text-red-400 rotate-90 my-1" />
            </>
          )}

          {!isMuleNetwork && isSuspiciousRoute && (
            <>
              <div className="px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg shadow-sm text-xs w-32 text-center">
                Unseen Node
              </div>
              <ArrowRight className="text-amber-400 rotate-90 my-1" />
            </>
          )}

          <div className={`px-4 py-2 rounded-lg border shadow-sm text-sm font-semibold w-32 text-center
            ${(isMuleNetwork || isSuspiciousRoute) ? "bg-red-50 text-red-700 border-red-200" : "bg-white text-slate-700 border-slate-200"}
          `}>
            {tx.receiverAccount}
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4 italic">
          {isMuleNetwork ? "Suspicious multi-hop transmission path detected." : 
           isSuspiciousRoute ? "First-time direct connection established." : "Direct trusted connection path."}
        </p>
      </div>
    </div>
  );
}
