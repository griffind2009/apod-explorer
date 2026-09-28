import { getApods } from '@/lib/apod';
import { ApodGrid } from '@/components/apod-grid';
import { HistoryControls } from '@/components/history-controls';

export const revalidate = 3600;

export default async function HomePage() {
  let apods;
  try {
    apods = await getApods(9);
  } catch {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-6 py-20">
        <div className="w-full rounded-3xl border border-red-300/20 bg-red-400/5 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">Unable to load APOD</p>
          <h1 className="mt-3 text-3xl font-bold text-white">NASA&apos;s picture service is unavailable.</h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">Please refresh the page or try again later. The application uses server-side data fetching with hourly revalidation.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <section className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">The universe, one day at a time</p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Astronomy Picture of the Day</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">Explore the nine most recent NASA APODs. Open a card for the full story, then return here to see which discoveries you&apos;ve already explored.</p>
        </div>
        <HistoryControls />
      </section>

      <section aria-labelledby="recent-apods">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="recent-apods" className="text-xl font-semibold text-white">Recent discoveries</h2>
          <span className="text-sm text-slate-500">Updated hourly</span>
        </div>
        <ApodGrid apods={apods} />
      </section>
    </main>
  );
}
