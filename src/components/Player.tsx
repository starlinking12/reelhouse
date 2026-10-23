import { useCallback, useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useNavigate } from 'react-router';
import type { Film } from '../data/films';
import { formatTime } from '../lib/format';
import { progressStore } from '../lib/progress';
import { BackIcon, Forward10, FullscreenIcon, PauseIcon, PlayIcon, Rewind10, VolumeIcon } from './Icons';

const HIDE_AFTER_MS = 2800;
const SAVE_EVERY_MS = 5000;
const VOLUME_KEY = 'reelhouse.volume';

type WebkitVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

export default function Player({ film }: { film: Film }) {
  const navigate = useNavigate();
  const shell = useRef<HTMLDivElement>(null);
  const video = useRef<WebkitVideo>(null);
  const hideTimer = useRef(0);
  const lastSave = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(film.runtime);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(() => {
    const v = Number(localStorage.getItem(VOLUME_KEY));
    return Number.isFinite(v) && v > 0 && v <= 1 ? v : 1;
  });
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [controls, setControls] = useState(true);
  const [error, setError] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  const save = useCallback(() => {
    const v = video.current;
    if (v && v.duration > 0) progressStore.save(film.id, v.currentTime, v.duration);
  }, [film.id]);

  const wake = useCallback(() => {
    setControls(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (video.current && !video.current.paused) setControls(false);
    }, HIDE_AFTER_MS);
  }, []);

  // resume where the viewer left off
  const onLoadedMetadata = () => {
    const v = video.current;
    if (!v) return;
    setDuration(v.duration || film.runtime);
    const saved = progressStore.get(film.id);
    if (saved && saved.position < v.duration - 30) v.currentTime = saved.position;
    v.volume = volume;
    v.play().catch(() => {
      /* autoplay with sound can be blocked; the big play button stays visible */
      setWaiting(false);
    });
  };

  const toggle = useCallback(() => {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => undefined);
    else v.pause();
  }, []);

  const seekBy = useCallback(
    (delta: number) => {
      const v = video.current;
      if (!v) return;
      v.currentTime = Math.max(0, Math.min(v.duration || Infinity, v.currentTime + delta));
      setFlash(delta > 0 ? `+${delta}s` : `${delta}s`);
      wake();
    },
    [wake],
  );

  const setVol = useCallback((next: number) => {
    const v = video.current;
    const clamped = Math.max(0, Math.min(1, next));
    setVolume(clamped);
    setMuted(clamped === 0);
    if (v) {
      v.volume = clamped;
      v.muted = clamped === 0;
    }
    if (clamped > 0) localStorage.setItem(VOLUME_KEY, String(clamped));
  }, []);

  const toggleMute = useCallback(() => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = shell.current;
    const v = video.current;
    if (!el || !v) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (el.requestFullscreen) void el.requestFullscreen().catch(() => v.webkitEnterFullscreen?.());
    else v.webkitEnterFullscreen?.(); // iPhone Safari only allows the native video fullscreen
  }, []);

  const exit = useCallback(() => {
    save();
    if (document.fullscreenElement) void document.exitFullscreen();
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  }, [navigate, save]);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          toggle();
          wake();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekBy(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekBy(10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVol((video.current?.volume ?? 1) + 0.1);
          wake();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVol((video.current?.volume ?? 1) - 0.1);
          wake();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'm':
          toggleMute();
          wake();
          break;
        case 'Escape':
          if (!document.fullscreenElement) exit();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle, seekBy, setVol, toggleFullscreen, toggleMute, wake, exit]);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    const onHide = () => save();
    document.addEventListener('fullscreenchange', onFs);
    window.addEventListener('pagehide', onHide);
    document.addEventListener('visibilitychange', onHide);
    return () => {
      document.removeEventListener('fullscreenchange', onFs);
      window.removeEventListener('pagehide', onHide);
      document.removeEventListener('visibilitychange', onHide);
      window.clearTimeout(hideTimer.current);
      save();
    };
  }, [save]);

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(null), 600);
    return () => window.clearTimeout(t);
  }, [flash]);

  useEffect(() => {
    document.title = `${film.title} | Reelhouse`;
    return () => {
      document.title = 'Reelhouse';
    };
  }, [film.title]);

  const onTimeUpdate = () => {
    const v = video.current;
    if (!v) return;
    setTime(v.currentTime);
    if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1));
    const now = Date.now();
    if (now - lastSave.current > SAVE_EVERY_MS) {
      lastSave.current = now;
      save();
    }
  };

  const onSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const v = video.current;
    const t = Number(e.target.value);
    if (v) v.currentTime = t;
    setTime(t);
    wake();
  };

  const stopKeys = (e: ReactKeyboardEvent) => {
    // let the global handler own space so the range input does not swallow it
    if (e.key === ' ') e.preventDefault();
  };

  const fill = duration ? (time / duration) * 100 : 0;
  const buf = duration ? (buffered / duration) * 100 : 0;
  const showUi = controls || !playing || error;

  return (
    <div
      ref={shell}
      className={`fixed inset-0 z-50 bg-black text-white ${showUi ? '' : 'cursor-none'}`}
      onMouseMove={wake}
      onTouchStart={wake}
    >
      <video
        ref={video}
        src={film.video}
        poster={film.still}
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-contain"
        onClick={() => {
          toggle();
          wake();
        }}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onPlay={() => {
          setPlaying(true);
          wake();
        }}
        onPause={() => {
          setPlaying(false);
          setControls(true);
          save();
        }}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => {
          setWaiting(false);
          setError(false);
        }}
        onCanPlay={() => setWaiting(false)}
        onEnded={() => {
          save();
          setControls(true);
        }}
        onError={() => {
          setError(true);
          setWaiting(false);
        }}
        onVolumeChange={() => setMuted(Boolean(video.current?.muted))}
      />

      {/* center state */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        {waiting && !error && (
          <span className="h-14 w-14 animate-spin-slow rounded-full border-[3px] border-white/20 border-t-accent" aria-label="Loading" />
        )}
        {!waiting && !playing && !error && (
          <button
            type="button"
            onClick={toggle}
            className="pointer-events-auto grid h-20 w-20 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-md transition hover:scale-105 hover:bg-white/25"
            aria-label="Play"
          >
            <PlayIcon className="ml-1 h-9 w-9" />
          </button>
        )}
        {error && (
          <div className="pointer-events-auto max-w-sm rounded-2xl bg-black/70 p-6 text-center ring-1 ring-white/10 backdrop-blur">
            <p className="font-display text-3xl">The projector jammed</p>
            <p className="mt-2 text-sm text-white/65">This film could not be loaded from its source right now. Check your connection and try again.</p>
            <button
              type="button"
              className="btn-primary mt-5"
              onClick={() => {
                setError(false);
                setWaiting(true);
                video.current?.load();
              }}
            >
              Try again
            </button>
          </div>
        )}
        {flash && <span className="absolute rounded-full bg-black/60 px-4 py-2 text-sm font-semibold backdrop-blur">{flash}</span>}
      </div>

      {/* top bar */}
      <div
        className={`absolute inset-x-0 top-0 flex items-center gap-4 bg-gradient-to-b from-black/80 to-transparent px-4 pb-10 pt-4 transition-opacity duration-300 sm:px-8 ${
          showUi ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      >
        <button type="button" onClick={exit} className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/10" aria-label="Back">
          <BackIcon className="h-6 w-6" />
        </button>
        <div className="min-w-0">
          <p className="truncate font-display text-2xl leading-tight sm:text-3xl">{film.title}</p>
          <p className="text-xs text-white/55">
            {film.year}, {film.director}
          </p>
        </div>
      </div>

      {/* bottom controls */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pt-16 transition-opacity duration-300 sm:px-8 ${
          showUi ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center gap-3 text-xs tabular-nums text-white/80">
          <span className="w-14 text-right">{formatTime(time)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={1}
            value={Math.min(time, duration || 0)}
            onChange={onSeek}
            onKeyDown={stopKeys}
            className="range flex-1"
            style={{ ['--fill' as string]: `${fill}%`, ['--buffer' as string]: `${Math.max(buf, fill)}%` }}
            aria-label="Seek"
            aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
          />
          <span className="w-14">{formatTime(duration)}</span>
        </div>
        <div className="mt-2 flex items-center gap-1 sm:gap-2">
          <button type="button" onClick={toggle} className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/10" aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? <PauseIcon className="h-7 w-7" /> : <PlayIcon className="h-7 w-7" />}
          </button>
          <button type="button" onClick={() => seekBy(-10)} className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/10" aria-label="Back 10 seconds">
            <Rewind10 className="h-6 w-6" />
          </button>
          <button type="button" onClick={() => seekBy(10)} className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/10" aria-label="Forward 10 seconds">
            <Forward10 className="h-6 w-6" />
          </button>
          <div className="group/vol flex items-center">
            <button type="button" onClick={toggleMute} className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/10" aria-label={muted ? 'Unmute' : 'Mute'}>
              <VolumeIcon muted={muted || volume === 0} className="h-6 w-6" />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => setVol(Number(e.target.value))}
              onKeyDown={stopKeys}
              className="range hidden w-0 opacity-0 transition-all duration-300 group-hover/vol:w-24 group-hover/vol:opacity-100 focus:w-24 focus:opacity-100 sm:block"
              style={{ ['--fill' as string]: `${(muted ? 0 : volume) * 100}%`, ['--buffer' as string]: '0%' }}
              aria-label="Volume"
            />
          </div>
          <p className="ml-2 hidden truncate text-sm text-white/60 md:block">{film.title}</p>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="ml-auto grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/10"
            aria-label={fullscreen ? 'Exit full screen' : 'Full screen'}
          >
            <FullscreenIcon exit={fullscreen} className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
