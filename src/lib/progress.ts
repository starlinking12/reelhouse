/**
 * Continue watching, stored on the device in localStorage.
 * Pure functions take a Storage so they can be tested without a browser.
 */
export interface ProgressEntry {
  id: string;
  position: number;
  duration: number;
  updatedAt: number;
}

export const STORAGE_KEY = 'reelhouse.progress.v1';
/** Ignore the first few seconds so a quick peek does not count as watching. */
export const MIN_POSITION = 10;
/** Within this many seconds of the end, the film counts as finished. */
export const END_MARGIN = 90;
export const MAX_ENTRIES = 20;
export const PROGRESS_EVENT = 'reelhouse:progress';

type Store = Record<string, ProgressEntry>;

function read(storage: Storage): Store {
  try {
    return parse(storage.getItem(STORAGE_KEY));
  } catch {
    return {};
  }
}

/** Parse the stored JSON defensively; anything malformed is dropped. */
export function parse(raw: string | null): Store {
  try {
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const out: Store = {};
    for (const [id, v] of Object.entries(parsed as Record<string, unknown>)) {
      const e = v as Partial<ProgressEntry>;
      if (typeof e?.position === 'number' && typeof e.duration === 'number' && typeof e.updatedAt === 'number') {
        out[id] = { id, position: e.position, duration: e.duration, updatedAt: e.updatedAt };
      }
    }
    return out;
  } catch {
    return {};
  }
}

function write(storage: Storage, store: Store) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* storage full or blocked (private mode): continue watching is best effort */
  }
}

export function isFinished(position: number, duration: number): boolean {
  return duration > 0 && (position >= duration - END_MARGIN || position / duration > 0.97);
}

/** Save a position. Returns the entry kept, or null when nothing is kept (too early or finished). */
export function saveProgress(
  storage: Storage,
  id: string,
  position: number,
  duration: number,
  now = Date.now(),
): ProgressEntry | null {
  const store = read(storage);
  if (!Number.isFinite(position) || !Number.isFinite(duration) || duration <= 0) return store[id] ?? null;
  if (isFinished(position, duration)) {
    delete store[id];
    write(storage, store);
    return null;
  }
  if (position < MIN_POSITION) return store[id] ?? null;
  store[id] = { id, position, duration, updatedAt: now };
  const kept = Object.values(store)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, MAX_ENTRIES);
  write(storage, Object.fromEntries(kept.map((e) => [e.id, e])));
  return store[id];
}

export function getProgress(storage: Storage, id: string): ProgressEntry | undefined {
  return read(storage)[id];
}

/** Entries from raw stored JSON, most recent first. */
export function listFromRaw(raw: string | null): ProgressEntry[] {
  return Object.values(parse(raw)).sort((a, b) => b.updatedAt - a.updatedAt);
}

/** Most recently watched first. */
export function listProgress(storage: Storage): ProgressEntry[] {
  return Object.values(read(storage)).sort((a, b) => b.updatedAt - a.updatedAt);
}

export function removeProgress(storage: Storage, id: string) {
  const store = read(storage);
  delete store[id];
  write(storage, store);
}

/** Browser helpers that also tell the UI something changed. */
export const progressStore = {
  save(id: string, position: number, duration: number) {
    const entry = saveProgress(window.localStorage, id, position, duration);
    window.dispatchEvent(new Event(PROGRESS_EVENT));
    return entry;
  },
  get(id: string) {
    return getProgress(window.localStorage, id);
  },
  list() {
    return listProgress(window.localStorage);
  },
  remove(id: string) {
    removeProgress(window.localStorage, id);
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  },
};
