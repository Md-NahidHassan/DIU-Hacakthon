"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Activity, Clock, Server } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState<string>("");
  const [latency, setLatency] = useState<number>(42);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    const latencyInterval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 15) + 35); // Random latency between 35 and 50ms
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(latencyInterval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                upay Shield
                <span className="text-sm font-normal text-slate-500 border-l border-slate-300 pl-2 ml-1">
                  Trust & Risk Intelligence
                </span>
              </h1>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-4 md:space-x-6 text-xs font-medium">
            <div className="hidden md:flex items-center space-x-1 text-slate-600">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{time || "00:00:00"}</span>
            </div>

            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
              <Activity className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">AI ENGINE ONLINE • {latency}ms</span>
            </div>

            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
              <Server className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">SYNTHETIC DATA ONLY</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
