import { useMemo, useSyncExternalStore } from 'react';
import { PROGRESS_EVENT, STORAGE_KEY, listFromRaw, type ProgressEntry } from '../lib/progress';

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => e.key === STORAGE_KEY && cb();
  window.addEventListener(PROGRESS_EVENT, cb);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(PROGRESS_EVENT, cb);
    window.removeEventListener('storage', onStorage);
  };
}

function snapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

/** Live list of continue watching entries, newest first. */
export function useProgressList(): ProgressEntry[] {
  const raw = useSyncExternalStore(subscribe, snapshot, () => '');
  return useMemo(() => listFromRaw(raw), [raw]);
}

export function useProgress(id: string): ProgressEntry | undefined {
  const list = useProgressList();
  return list.find((e) => e.id === id);
}
