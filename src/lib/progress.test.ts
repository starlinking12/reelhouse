import { beforeEach, describe, expect, it } from 'vitest';
import {
  MAX_ENTRIES,
  STORAGE_KEY,
  getProgress,
  isFinished,
  listFromRaw,
  listProgress,
  removeProgress,
  saveProgress,
} from './progress';

class MemoryStorage implements Storage {
  private map = new Map<string, string>();
  get length() {
    return this.map.size;
  }
  clear() {
    this.map.clear();
  }
  getItem(k: string) {
    return this.map.get(k) ?? null;
  }
  key(i: number) {
    return [...this.map.keys()][i] ?? null;
  }
  removeItem(k: string) {
    this.map.delete(k);
  }
  setItem(k: string, v: string) {
    this.map.set(k, v);
  }
}

let store: MemoryStorage;
beforeEach(() => {
  store = new MemoryStorage();
});

describe('continue watching store', () => {
  it('saves and reads a position', () => {
    saveProgress(store, 'detour', 120, 4000, 1);
    expect(getProgress(store, 'detour')).toEqual({ id: 'detour', position: 120, duration: 4000, updatedAt: 1 });
  });

  it('ignores a quick peek at the start', () => {
    expect(saveProgress(store, 'detour', 4, 4000)).toBeNull();
    expect(listProgress(store)).toEqual([]);
  });

  it('drops a film once it is finished', () => {
    saveProgress(store, 'detour', 300, 4000, 1);
    expect(saveProgress(store, 'detour', 3950, 4000, 2)).toBeNull();
    expect(getProgress(store, 'detour')).toBeUndefined();
    expect(isFinished(3950, 4000)).toBe(true);
    expect(isFinished(300, 4000)).toBe(false);
  });

  it('lists the most recent first', () => {
    saveProgress(store, 'a', 100, 4000, 1);
    saveProgress(store, 'b', 100, 4000, 3);
    saveProgress(store, 'c', 100, 4000, 2);
    expect(listProgress(store).map((e) => e.id)).toEqual(['b', 'c', 'a']);
  });

  it('keeps at most MAX_ENTRIES', () => {
    for (let i = 0; i < MAX_ENTRIES + 5; i++) saveProgress(store, `f${i}`, 100, 4000, i);
    const list = listProgress(store);
    expect(list).toHaveLength(MAX_ENTRIES);
    expect(list[0]?.id).toBe(`f${MAX_ENTRIES + 4}`);
  });

  it('removes an entry', () => {
    saveProgress(store, 'a', 100, 4000, 1);
    removeProgress(store, 'a');
    expect(listProgress(store)).toEqual([]);
  });

  it('survives corrupt storage', () => {
    store.setItem(STORAGE_KEY, '{not json');
    expect(listProgress(store)).toEqual([]);
    expect(listFromRaw('{"x":{"position":"bad"}}')).toEqual([]);
    expect(listFromRaw('[1,2]')).toEqual([]);
  });
});
