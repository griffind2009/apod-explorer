import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#05070c]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3" aria-label="APOD Explorer home">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-lg shadow-[0_0_25px_rgba(34,211,238,.12)]">✦</span>
          <div>
            <div className="font-semibold tracking-tight text-white">APOD Explorer</div>
            <div className="text-xs text-slate-500 transition group-hover:text-slate-400">NASA • Astronomy Picture of the Day</div>
          </div>
        </Link>
        <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400 sm:block">Next.js • TypeScript</span>
      </div>
    </header>
  );
}
