import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-6 py-20 text-center">
      <div className="w-full rounded-3xl border border-white/10 bg-white/[0.035] p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">404</p>
        <h1 className="mt-3 text-3xl font-bold text-white">APOD not found</h1>
        <p className="mt-4 text-slate-400">NASA doesn&apos;t have an Astronomy Picture of the Day for that date.</p>
        <Link href="/" className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">Back to discoveries</Link>
      </div>
    </main>
  );
}
