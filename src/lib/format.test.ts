import { describe, expect, it } from 'vitest';
import { formatRemaining, formatRuntime, formatTime } from './format';

describe('formatTime', () => {
  it('formats minutes and seconds', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(75)).toBe('1:15');
    expect(formatTime(599.9)).toBe('9:59');
  });
  it('adds hours when needed', () => {
    expect(formatTime(3725)).toBe('1:02:05');
  });
  it('handles bad input', () => {
    expect(formatTime(NaN)).toBe('0:00');
    expect(formatTime(-4)).toBe('0:00');
    expect(formatTime(Infinity)).toBe('0:00');
  });
});

describe('formatRuntime', () => {
  it('rounds to minutes', () => {
    expect(formatRuntime(5732)).toBe('1h 36m');
    expect(formatRuntime(596)).toBe('10m');
    expect(formatRuntime(3600)).toBe('1h');
    expect(formatRuntime(5)).toBe('1m');
  });
  it('phrases time left', () => {
    expect(formatRemaining(600, 3000)).toBe('40m left');
    expect(formatRemaining(5000, 3000)).toBe('1m left');
  });
});
