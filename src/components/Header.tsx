import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ReelMark } from './Icons';
import { rows } from '../data/films';

export default function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        solid ? 'bg-ink/85 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-xl' : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-8 px-5 sm:px-10">
        <Link to="/" className="flex items-center gap-2.5 text-accent" aria-label="Reelhouse home">
          <ReelMark />
          <span className="font-display text-[28px] leading-none tracking-tight text-white">Reelhouse</span>
        </Link>
        <nav aria-label="Categories" className="hidden items-center gap-6 text-sm font-medium text-white/70 lg:flex">
          {rows.map((r) => (
            <a key={r.id} href={`#row-${r.id}`} className="transition hover:text-white">
              {r.title}
            </a>
          ))}
        </nav>
        <span className="ml-auto hidden rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/60 sm:inline">
          Free and legal
        </span>
      </div>
    </header>
  );
}
