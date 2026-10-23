import type { Film } from '../data/films';
import type { ProgressEntry } from '../lib/progress';
import { formatRemaining, formatRuntime } from '../lib/format';
import { PlayIcon } from './Icons';

interface Props {
  film: Film;
  progress?: ProgressEntry;
  onOpen: (film: Film) => void;
}

export default function FilmCard({ film, progress, onOpen }: Props) {
  const pct = progress ? Math.min(100, (progress.position / progress.duration) * 100) : 0;
  return (
    <li className="w-[72vw] max-w-[340px] shrink-0 snap-start sm:w-[300px] lg:w-[320px]">
      <button
        type="button"
        onClick={() => onOpen(film)}
        className="group block w-full text-left"
        aria-label={`${film.title}, ${film.year}${progress ? `, ${formatRemaining(progress.position, progress.duration)}` : ''}`}
      >
        <div className="relative aspect-video overflow-hidden rounded-xl bg-ink-3 ring-1 ring-white/5 transition duration-500 ease-out group-hover:ring-white/25 group-focus-visible:ring-accent">
          <img
            src={film.stillSmall}
            srcSet={`${film.stillSmall} 640w, ${film.still} 1280w`}
            sizes="(min-width: 640px) 320px, 72vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
          <div className="absolute inset-0 grid place-items-center opacity-0 transition duration-300 group-hover:opacity-100">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-black shadow-xl">
              <PlayIcon className="ml-0.5 h-5 w-5" />
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-3.5">
            <h3 className="font-display text-[22px] leading-tight text-white drop-shadow">{film.title}</h3>
            <p className="mt-0.5 flex gap-2.5 text-xs text-white/65">
              {progress ? (
                <span>{formatRemaining(progress.position, progress.duration)}</span>
              ) : (
                <>
                  <span>{film.year}</span>
                  <span>{formatRuntime(film.runtime)}</span>
                </>
              )}
            </p>
          </div>
          {progress && (
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
              <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
          )}
        </div>
      </button>
    </li>
  );
}
