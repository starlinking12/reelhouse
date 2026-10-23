import { useCallback, useEffect, useRef, useState } from 'react';
import type { Film } from '../data/films';
import type { ProgressEntry } from '../lib/progress';
import FilmCard from './FilmCard';
import { ChevronLeft, ChevronRight } from './Icons';

interface Props {
  id: string;
  title: string;
  films: Film[];
  progress?: Map<string, ProgressEntry>;
  onOpen: (film: Film) => void;
}

export default function Row({ id, title, films, progress, onOpen }: Props) {
  const scroller = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, films.length]);

  const page = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  if (films.length === 0) return null;

  return (
    <section id={`row-${id}`} aria-labelledby={`row-${id}-title`} className="group/row relative scroll-mt-20">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <h2 id={`row-${id}-title`} className="mb-3 flex items-baseline gap-3 text-lg font-semibold tracking-tight text-white sm:text-xl">
          {title}
          <span className="text-xs font-medium text-white/35">{films.length}</span>
        </h2>
      </div>
      <div className="relative">
        <ul
          ref={scroller}
          onScroll={measure}
          className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto scroll-smooth px-5 pb-2 sm:scroll-px-10 sm:gap-4 sm:px-10"
        >
          {films.map((f) => (
            <FilmCard key={f.id} film={f} progress={progress?.get(f.id)} onOpen={onOpen} />
          ))}
          <li aria-hidden className="w-1 shrink-0" />
        </ul>
        <button
          type="button"
          aria-label={`Scroll ${title} left`}
          onClick={() => page(-1)}
          className={`absolute inset-y-0 left-0 hidden w-14 items-center justify-center bg-gradient-to-r from-ink to-transparent text-white opacity-0 transition group-hover/row:opacity-100 sm:flex ${
            edges.start ? 'pointer-events-none !opacity-0' : ''
          }`}
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          type="button"
          aria-label={`Scroll ${title} right`}
          onClick={() => page(1)}
          className={`absolute inset-y-0 right-0 hidden w-14 items-center justify-center bg-gradient-to-l from-ink to-transparent text-white opacity-0 transition group-hover/row:opacity-100 sm:flex ${
            edges.end ? 'pointer-events-none !opacity-0' : ''
          }`}
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}
