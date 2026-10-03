"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { TransactionInput } from "./types";
import { MLInferenceResult } from "./riskEngine";

export type CaseStatus = "NEW" | "UNDER REVIEW" | "ESCALATED" | "RESOLVED";
export type CaseDisposition = "NO_ACTION" | "FALSE_POSITIVE" | "ESCALATED_L2" | "CONFIRMED_SUSPICIOUS" | "";

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
}

export interface AnalystNote {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

export interface RiskCase {
  caseId: string;
  transaction: TransactionInput;
  riskAssessment: MLInferenceResult;
  status: CaseStatus;
  assignedTo: string;
  notes: AnalystNote[];
  disposition: CaseDisposition;
  createdAt: string;
  updatedAt: string;
  auditEvents: AuditEvent[];
}

interface CasesContextType {
  cases: RiskCase[];
  addCase: (newCase: RiskCase) => void;
  updateCase: (caseId: string, updates: Partial<RiskCase>) => void;
  addNote: (caseId: string, noteText: string, author: string) => void;
  addAuditEvent: (caseId: string, action: string, actor: string) => void;
}

const CasesContext = createContext<CasesContextType | undefined>(undefined);

export function CasesProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState<RiskCase[]>([]);

  const addCase = (newCase: RiskCase) => {
    setCases(prev => [newCase, ...prev]);
  };

  const updateCase = (caseId: string, updates: Partial<RiskCase>) => {
    setCases(prev => prev.map(c => c.caseId === caseId ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c));
  };

  const addNote = (caseId: string, noteText: string, author: string) => {
    setCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        return {
          ...c,
          notes: [...c.notes, { id: Math.random().toString(), text: noteText, author, timestamp: new Date().toISOString() }],
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));
  };

  const addAuditEvent = (caseId: string, action: string, actor: string) => {
    setCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        return {
          ...c,
          auditEvents: [...c.auditEvents, { id: Math.random().toString(), action, actor, timestamp: new Date().toISOString() }]
        };
      }
      return c;
    }));
  };

  return (
    <CasesContext.Provider value={{ cases, addCase, updateCase, addNote, addAuditEvent }}>
      {children}
    </CasesContext.Provider>
  );
}

export function useCases() {
  const context = useContext(CasesContext);
  if (context === undefined) {
    throw new Error("useCases must be used within a CasesProvider");
  }
  return context;
}
