'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'apod-explorer:viewed-dates';

type VisitHistoryContextValue = {
  viewedDates: string[];
  markViewed: (date: string) => void;
  clearHistory: () => void;
};

const VisitHistoryContext = createContext<VisitHistoryContextValue | null>(null);

export function VisitHistoryProvider({ children }: { children: React.ReactNode }) {
  const [viewedDates, setViewedDates] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setViewedDates(parsed.filter((value): value is string => typeof value === 'string'));
      }
    } catch {
      // Local storage is an enhancement; the app remains usable if it is unavailable.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedDates));
    } catch {
      // Ignore storage failures.
    }
  }, [viewedDates]);

  const value = useMemo(() => ({
    viewedDates,
    markViewed: (date: string) => setViewedDates((current) => current.includes(date) ? current : [...current, date]),
    clearHistory: () => setViewedDates([]),
  }), [viewedDates]);

  return <VisitHistoryContext.Provider value={value}>{children}</VisitHistoryContext.Provider>;
}

export function useVisitHistory() {
  const context = useContext(VisitHistoryContext);
  if (!context) throw new Error('useVisitHistory must be used within VisitHistoryProvider');
  return context;
}
