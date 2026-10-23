import { describe, expect, it } from 'vitest';
import { featuredFilms, films, filmsFor, getFilm, rows } from './films';

describe('film catalogue', () => {
  it('has unique, url safe ids', () => {
    const ids = films.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/);
  });

  it('only plays from legal hosts over https', () => {
    for (const f of films) {
      const host = new URL(f.video).hostname;
      expect(f.video.startsWith('https://')).toBe(true);
      expect(host).toBe('archive.org');
      expect(f.video).toMatch(/\.mp4$/);
      expect(f.source).toMatch(/^https:\/\/archive\.org\/details\//);
    }
  });

  it('records a licence for every film', () => {
    for (const f of films) {
      expect(f.license.length).toBeGreaterThan(10);
      expect(f.licenseUrl).toMatch(/creativecommons\.org/);
    }
  });

  it('has sane metadata', () => {
    for (const f of films) {
      expect(f.year).toBeGreaterThan(1890);
      expect(f.runtime).toBeGreaterThan(60);
      expect(f.previewStart).toBeLessThan(f.runtime);
      expect(f.still).toMatch(/^\/stills\/.+\.jpg$/);
    }
  });

  it('fills every row and the hero', () => {
    expect(films.length).toBeGreaterThanOrEqual(18);
    expect(featuredFilms.length).toBeGreaterThan(0);
    for (const r of rows) expect(filmsFor(r.genre).length).toBeGreaterThanOrEqual(4);
  });

  it('looks films up by id', () => {
    expect(getFilm('detour')?.title).toBe('Detour');
    expect(getFilm('nope')).toBeUndefined();
    expect(getFilm(undefined)).toBeUndefined();
  });
});
