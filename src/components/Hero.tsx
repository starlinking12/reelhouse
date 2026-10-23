import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import type { Film } from '../data/films';
import { formatRuntime } from '../lib/format';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { InfoIcon, PlayIcon, VolumeIcon } from './Icons';

const SLIDE_MS = 26000;
const PREVIEW_DELAY_MS = 1600;
const PREVIEW_MS = 22000;

interface Props {
  films: Film[];
  onInfo: (film: Film) => void;
}

export default function Hero({ films, onInfo }: Props) {
  const [index, setIndex] = useState(0);
  const [previewing, setPreviewing] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const film = films[index % films.length];

  const next = useCallback(() => {
    setPreviewing(false);
    setIndex((i) => (i + 1) % films.length);
  }, [films.length]);

  // rotate slides
  useEffect(() => {
    if (films.length < 2) return;
    const t = window.setTimeout(next, SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, next, films.length]);

  // start the muted preview a moment after the slide settles
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !film || reduced) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    let stopTimer = 0;
    const startTimer = window.setTimeout(() => {
      v.currentTime = film.previewStart;
      v.play()
        .then(() => {
          stopTimer = window.setTimeout(() => {
            setPreviewing(false);
            v.pause();
          }, PREVIEW_MS);
        })
        .catch(() => setPreviewing(false));
    }, PREVIEW_DELAY_MS);
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(stopTimer);
      v.pause();
    };
  }, [film, reduced]);

  // pause preview when the page goes to the background
  useEffect(() => {
    const onVis = () => document.hidden && videoRef.current?.pause();
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  if (!film) return null;

  return (
    <section aria-label="Featured" className="relative h-[78svh] min-h-[520px] w-full overflow-hidden sm:h-[88svh]">
      {/* still frame, always there underneath */}
      <img
        key={film.id}
        src={film.still}
        alt=""
        className="absolute inset-0 h-full w-full animate-fade-in object-cover object-[65%_center] sm:object-center"
        fetchPriority="high"
      />
      <video
        key={`v-${film.id}`}
        ref={videoRef}
        src={`${film.video}#t=${film.previewStart}`}
        muted={muted}
        playsInline
        preload="none"
        onPlaying={() => setPreviewing(true)}
        onEnded={() => setPreviewing(false)}
        className={`absolute inset-0 h-full w-full object-cover object-[65%_center] transition-opacity sm:object-center duration-[1200ms] ${
          previewing ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden
        tabIndex={-1}
      />

      {/* fades */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-transparent sm:via-ink/35" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />

      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 sm:px-10 sm:pb-28">
        <div key={film.id} className="max-w-xl animate-rise">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {film.genres.includes('animation') || film.genres.includes('short') ? 'Open movie' : 'Classic feature'}
          </p>
          <h1 className="font-display text-[52px] leading-[0.95] tracking-tight text-white sm:text-[88px]">{film.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
            <span>{film.year}</span>
            <span className="text-white/30">/</span>
            <span>{formatRuntime(film.runtime)}</span>
            <span className="text-white/30">/</span>
            <span>{film.director}</span>
            {film.hd && <span className="rounded border border-white/25 px-1.5 text-[11px] font-semibold text-white/80">HD</span>}
          </p>
          <p className="mt-4 line-clamp-3 max-w-lg text-[15px] leading-relaxed text-white/80 sm:text-base">{film.synopsis}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to={`/watch/${film.id}`} className="btn-primary">
              <PlayIcon className="h-5 w-5" /> Play
            </Link>
            <button type="button" onClick={() => onInfo(film)} className="btn-glass">
              <InfoIcon className="h-5 w-5" /> More info
            </button>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 flex items-center gap-4 sm:bottom-28 sm:left-auto sm:right-10">
          {previewing && (
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/40 backdrop-blur transition hover:bg-white/10"
              aria-label={muted ? 'Unmute preview' : 'Mute preview'}
            >
              <VolumeIcon muted={muted} className="h-5 w-5" />
            </button>
          )}
          {films.length > 1 && (
            <div className="flex gap-2" role="group" aria-label="Featured films">
              {films.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={i === index}
                  aria-label={f.title}
                  onClick={() => {
                    setPreviewing(false);
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-7 bg-white' : 'w-3 bg-white/35 hover:bg-white/60'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
