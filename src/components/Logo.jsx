export default function Logo({ size = 22 }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <radialGradient id="lg-sun" cx="50%" cy="38%" r="60%"><stop offset="0" stopColor="#fff1c1" /><stop offset=".45" stopColor="#f5c66b" /><stop offset="1" stopColor="#f5c66b" stopOpacity="0" /></radialGradient>
          <linearGradient id="lg-water" x1="0" x2="1"><stop offset="0" stopColor="#2dd4bf" /><stop offset="1" stopColor="#38bdf8" /></linearGradient>
        </defs>
        <circle cx="16" cy="13" r="10" fill="url(#lg-sun)" />
        <path d="M3 21c3-2 6-2 9 0s6 2 9 0 5-2 8 0" stroke="url(#lg-water)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M6 26c2.5-1.5 5-1.5 7.5 0s5 1.5 7.5 0 4-1.5 5.5 0" stroke="url(#lg-water)" strokeOpacity=".55" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
      <span className="font-display text-[22px] font-semibold tracking-tight leading-none">
        <span className="gold-text">Intel</span><span className="grad-text">Oasis</span>
      </span>
    </span>
  );
}
