import { ApodCard } from '@/components/apod-card';
import type { Apod } from '@/types/apod';

export function ApodGrid({ apods }: { apods: Apod[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {apods.map((apod) => <ApodCard key={apod.date} apod={apod} />)}
    </div>
  );
}
