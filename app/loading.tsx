export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <div className="mb-12 max-w-3xl">
        <div className="skeleton h-4 w-52 rounded" />
        <div className="skeleton mt-5 h-14 w-full max-w-2xl rounded" />
        <div className="skeleton mt-5 h-12 w-full max-w-xl rounded" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => <div key={index} className="overflow-hidden rounded-2xl border border-white/10"><div className="skeleton aspect-[4/3]" /><div className="space-y-3 p-5"><div className="skeleton h-3 w-24 rounded" /><div className="skeleton h-6 w-full rounded" /><div className="skeleton h-10 w-full rounded" /></div></div>)}
      </div>
    </main>
  );
}
