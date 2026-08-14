import Link from 'next/link';

export default function Custom404() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center">
      <div className="max-w-lg">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">HousePlus</p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">Page not found</h1>
        <p className="mt-4 text-slate-600">The page you requested is unavailable or has moved.</p>
        <Link href="/en" className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700">Back to HousePlus</Link>
      </div>
    </main>
  );
}
