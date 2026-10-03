"use client";

import React from "react";
import { RiskLevel } from "@/lib/types";

interface RiskScoreProps {
  score: number;
  level: RiskLevel;
}

export default function RiskScore({ score, level }: RiskScoreProps) {
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = "text-green-500";
  let bgClass = "text-green-100";
  
  if (level === "CRITICAL") {
    colorClass = "text-red-500";
    bgClass = "text-red-100";
  } else if (level === "MODERATE") {
    colorClass = "text-amber-500";
    bgClass = "text-amber-100";
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Risk Score</div>
      
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 transition-transform duration-1000 ease-out"
        >
          {/* Background Circle */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={`${bgClass} transition-colors duration-500`}
          />
          {/* Progress Circle */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={`${colorClass} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-slate-800">{Math.round(score)}%</span>
        </div>
      </div>
      
      <div className={`px-4 py-1.5 rounded-full font-bold text-sm tracking-wide ${colorClass} bg-opacity-20 bg-current`}>
        {level}
      </div>
    </div>
  );
}
