import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = { width: 24, height: 24, viewBox: '0 0 24 24', 'aria-hidden': true } as const;

export const PlayIcon = (p: P) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l11.6-7.2a1 1 0 0 0 0-1.72L8.5 3.94A1 1 0 0 0 7 4.8Z" />
  </svg>
);
export const PauseIcon = (p: P) => (
  <svg {...base} fill="currentColor" {...p}>
    <rect x="6" y="4.5" width="4" height="15" rx="1.2" />
    <rect x="14" y="4.5" width="4" height="15" rx="1.2" />
  </svg>
);
export const InfoIcon = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" strokeLinecap="round" />
  </svg>
);
export const ChevronLeft = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.2} {...p}>
    <path d="m15 5-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const ChevronRight = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.2} {...p}>
    <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.2} {...p}>
    <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
  </svg>
);
export const BackIcon = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.2} {...p}>
    <path d="M19 12H5m6-7-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Rewind10 = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} {...p}>
    <path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 4v4.5h4.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="12" y="15.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="currentColor" stroke="none">10</text>
  </svg>
);
export const Forward10 = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} {...p}>
    <path d="M20 12a8 8 0 1 1-2.4-5.7L20 8.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 4v4.5h-4.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="12" y="15.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="currentColor" stroke="none">10</text>
  </svg>
);
export const VolumeIcon = ({ muted, ...p }: P & { muted?: boolean }) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} {...p}>
    <path d="M4 9.5v5h3.5L12 19V5L7.5 9.5H4Z" fill="currentColor" strokeLinejoin="round" />
    {muted ? (
      <path d="m16 9.5 5 5m0-5-5 5" strokeLinecap="round" />
    ) : (
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" strokeLinecap="round" />
    )}
  </svg>
);
export const FullscreenIcon = ({ exit, ...p }: P & { exit?: boolean }) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} {...p}>
    {exit ? (
      <path d="M9 4v5H4m11-5v5h5M9 20v-5H4m11 5v-5h5" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M4 9V4h5m6 0h5v5M4 15v5h5m11-5v5h-5" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
);
export const ReelMark = (p: P) => (
  <svg viewBox="0 0 32 32" width={26} height={26} aria-hidden {...p}>
    <circle cx="16" cy="16" r="12.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="16" cy="9.5" r="2.6" fill="currentColor" />
    <circle cx="16" cy="22.5" r="2.6" fill="currentColor" />
    <circle cx="9.5" cy="16" r="2.6" fill="currentColor" />
    <circle cx="22.5" cy="16" r="2.6" fill="currentColor" />
  </svg>
);
