'use client';

import { useEffect } from 'react';
import { useVisitHistory } from '@/components/visit-history';

export function MarkViewed({ date }: { date: string }) {
  const { markViewed } = useVisitHistory();
  useEffect(() => { markViewed(date); }, [date, markViewed]);
  return null;
}
