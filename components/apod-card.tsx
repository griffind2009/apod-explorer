'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useVisitHistory } from '@/components/visit-history';
import type { Apod } from '@/types/apod';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}

export function ApodCard({ apod }: { apod: Apod }) {
  const { viewedDates } = useVisitHistory();
  const viewed = viewedDates.includes(apod.date);
  const image = apod.media_type === 'image' ? apod.url : apod.thumbnail_url;

  return (
    <article className={`group overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${viewed ? 'border-cyan-300/40 bg-cyan-300/[0.07] shadow-cyan-950/20' : 'border-white/10 bg-white/[0.035] hover:border-white/20'}`}>
      <Link href={`/apod/${apod.date}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
          {image ? (
            <Image
              src={image}
              alt={apod.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="grid h-full place-items-center text-slate-500">Video preview unavailable</div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
          {viewed && <span className="absolute right-3 top-3 rounded-full border border-cyan-300/30 bg-cyan-950/80 px-2.5 py-1 text-xs font-semibold text-cyan-200">Viewed</span>}
          {apod.media_type === 'video' && <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white">Video</span>}
        </div>
        <div className="p-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-cyan-300/80">{formatDate(apod.date)}</p>
          <h2 className="line-clamp-2 min-h-14 text-lg font-semibold leading-7 text-white">{apod.title}</h2>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">{apod.explanation}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition group-hover:gap-3">Explore details <span aria-hidden>→</span></span>
        </div>
      </Link>
    </article>
  );
}
