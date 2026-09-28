'use client';

import { useVisitHistory } from '@/components/visit-history';

export function HistoryControls() {
  const { viewedDates, clearHistory } = useVisitHistory();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-500">{viewedDates.length} viewed</span>
      <button
        type="button"
        onClick={clearHistory}
        disabled={viewedDates.length === 0}
        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Clear history
      </button>
    </div>
  );
}
