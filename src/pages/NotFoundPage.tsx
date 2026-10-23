import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Reel missing</p>
        <h1 className="mt-3 font-display text-6xl text-white">This page is not showing</h1>
        <p className="mt-3 text-white/60">The film or page you were looking for is not here.</p>
        <Link to="/" className="btn-primary mt-8">
          Back to Reelhouse
        </Link>
      </div>
    </main>
  );
}
