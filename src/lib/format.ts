/** 75 -> "1:15", 3725 -> "1:02:05". Bad input renders as 0:00. */
export function formatTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '0:00';
  const s = Math.floor(totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`;
}

/** 5732 -> "1h 35m", 596 -> "10m". */
export function formatRuntime(totalSeconds: number): string {
  const mins = Math.max(1, Math.round(totalSeconds / 60));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/** Time left, phrased for a progress label: "42m left". */
export function formatRemaining(position: number, duration: number): string {
  const left = Math.max(0, duration - position);
  return `${formatRuntime(left)} left`;
}
