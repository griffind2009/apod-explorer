import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApodByDate } from '@/lib/apod';
import { MarkViewed } from '@/components/mark-viewed';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}

export default async function ApodDetailPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const apod = await getApodByDate(date);
  if (!apod) notFound();

  const image = apod.media_type === 'image' ? apod.hdurl || apod.url : apod.thumbnail_url;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <MarkViewed date={apod.date} />
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">← Back to discoveries</Link>
      <article className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
        <div className="grid lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative min-h-[420px] bg-black lg:min-h-[650px]">
            {image ? (
              <Image src={image} alt={apod.title} fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-contain" priority unoptimized />
            ) : (
              <div className="grid h-full min-h-[420px] place-items-center p-10 text-center text-slate-500">This APOD is a video. Use the original media link below to watch it.</div>
            )}
          </div>
          <div className="flex flex-col p-7 sm:p-10 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">{formatDate(apod.date)}</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{apod.title}</h1>
            {apod.copyright && <p className="mt-3 text-sm text-slate-500">© {apod.copyright}</p>}
            <div className="my-8 h-px bg-white/10" />
            <div className="space-y-5 text-[15px] leading-7 text-slate-300">
              <p>{apod.explanation}</p>
            </div>
            <div className="mt-auto pt-10">
              <a href={apod.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">View original media ↗</a>
              {apod.hdurl && <a href={apod.hdurl} target="_blank" rel="noreferrer" className="ml-3 inline-flex rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10">HD image</a>}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
