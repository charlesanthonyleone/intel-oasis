export default function Logo({ size = 22 }) {
  return (
    <span className="inline-flex items-center gap-3 select-none">
      <svg width={size + 6} height={size + 6} viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="none" stroke="#c8a45a" strokeOpacity=".45" strokeWidth=".8" />
        <circle cx="21" cy="11" r="2.2" fill="#e8cc8a" fillOpacity=".9" />
        <path d="M7 19.5h18" stroke="#c8a45a" strokeWidth=".9" />
        <path d="M10 23h12M13 26h6" stroke="#c8a45a" strokeOpacity=".45" strokeWidth=".8" />
      </svg>
      <span className="font-display text-[22px] font-light tracking-[0.02em] leading-none text-white/90">
        Intel<span className="italic text-[#e8cc8a]">Oasis</span>
      </span>
    </span>
  );
}
