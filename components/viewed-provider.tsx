'use client';

import { VisitHistoryProvider } from '@/components/visit-history';

export function ViewedProvider({ children }: { children: React.ReactNode }) {
  return <VisitHistoryProvider>{children}</VisitHistoryProvider>;
}
