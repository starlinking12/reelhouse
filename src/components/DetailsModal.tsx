import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import type { Film } from '../data/films';
import { formatRemaining, formatRuntime } from '../lib/format';
import { useProgress } from '../hooks/useProgress';
import { CloseIcon, PlayIcon } from './Icons';

const GENRE_LABEL: Record<string, string> = {
  horror: 'Horror',
  noir: 'Noir',
  comedy: 'Comedy',
  scifi: 'Sci-fi',
  silent: 'Silent',
  animation: 'Animation',
  short: 'Short film',
};

interface Props {
  film: Film;
  onClose: () => void;
}

export default function DetailsModal({ film, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const progress = useProgress(film.id);

  useEffect(() => {
    const d = dialog.current;
    if (d && !d.open) d.showModal();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      aria-labelledby="details-title"
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/75 backdrop:backdrop-blur-sm sm:m-auto sm:h-auto sm:max-h-[92vh] sm:max-w-3xl sm:rounded-2xl"
    >
      <div className="relative min-h-full animate-rise overflow-hidden bg-ink-2 text-white sm:min-h-0 sm:rounded-2xl sm:ring-1 sm:ring-white/10">
        <div className="relative aspect-video w-full">
          <img src={film.still} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/30 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
            style={{ marginTop: 'env(safe-area-inset-top)' }}
            aria-label="Close"
            autoFocus
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 px-6 pb-2 sm:px-10">
            <h2 id="details-title" className="font-display text-5xl leading-none tracking-tight sm:text-6xl">
              {film.title}
            </h2>
          </div>
        </div>

        <div className="px-6 pb-10 pt-4 sm:px-10">
          <div className="flex flex-wrap items-center gap-3">
            <Link to={`/watch/${film.id}`} className="btn-primary">
              <PlayIcon className="h-5 w-5" /> {progress ? 'Resume' : 'Play'}
            </Link>
            {progress && <span className="text-sm text-white/60">{formatRemaining(progress.position, progress.duration)}</span>}
          </div>
          {progress && (
            <div className="mt-4 h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/15">
              <div className="h-full bg-accent" style={{ width: `${(progress.position / progress.duration) * 100}%` }} />
            </div>
          )}

          <div className="mt-6 grid gap-8 sm:grid-cols-[1fr_200px]">
            <div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/60">
                <span className="text-white">{film.year}</span>
                <span>{formatRuntime(film.runtime)}</span>
                {film.hd && <span className="rounded border border-white/25 px-1.5 text-[11px] font-semibold text-white/80">HD</span>}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/85">{film.synopsis}</p>
            </div>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-white/40">Directed by</dt>
                <dd className="text-white/85">{film.director}</dd>
              </div>
              <div>
                <dt className="text-white/40">Genres</dt>
                <dd className="text-white/85">{film.genres.map((g) => GENRE_LABEL[g]).join(', ')}</dd>
              </div>
              <div>
                <dt className="text-white/40">Licence</dt>
                <dd className="text-white/85">{film.license}</dd>
              </div>
              <div>
                <a href={film.source} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">
                  View source
                </a>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </dialog>
  );
}
