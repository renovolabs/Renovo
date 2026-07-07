/**
 * ── PLACEHOLDER PRODUCT VISUAL ──────────────────────────────────────────
 * Official product photography exists (clear vial, black cap, silver
 * label) but hasn't landed in /assets as files yet. This vector stand-in
 * mirrors that label system — silver plate, black type, RL lot code —
 * so the grid reads on-brand until the real renders drop in. Swap by
 * replacing this component's output with
 * <Image src={`/assets/products/${slug}.png`} … /> — cards carry a
 * visible "RENDER PENDING" tag until then.
 */
interface ProductVisualProps {
  /** Compound name printed on the label. */
  name: string;
  /** Lot-style catalog code (matches official label format, e.g. RL-001). */
  code: string;
}

export default function ProductVisual({ name, code }: ProductVisualProps) {
  return (
    <svg
      viewBox="0 0 200 260"
      className="h-full w-full"
      role="img"
      aria-label={`${name} vial — placeholder render`}
    >
      <defs>
        {/* Clear glass body */}
        <linearGradient id={`glass-${code}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#23262b" />
          <stop offset="16%" stopColor="#33373d" />
          <stop offset="50%" stopColor="#1e2126" />
          <stop offset="84%" stopColor="#2c3036" />
          <stop offset="100%" stopColor="#1a1d21" />
        </linearGradient>
        {/* Black cap, per official photography */}
        <linearGradient id={`cap-${code}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#26282c" />
          <stop offset="100%" stopColor="#101215" />
        </linearGradient>
        {/* Brushed-silver label stock */}
        <linearGradient id={`label-${code}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c7cbd1" />
          <stop offset="45%" stopColor="#e3e6ea" />
          <stop offset="100%" stopColor="#b9bec5" />
        </linearGradient>
      </defs>

      {/* Cap */}
      <rect x="70" y="22" width="60" height="30" rx="5" fill={`url(#cap-${code})`} />
      {/* Crimp collar */}
      <rect x="74" y="50" width="52" height="10" rx="2" fill="#8f959c" />
      {/* Neck */}
      <rect x="80" y="60" width="40" height="10" fill={`url(#glass-${code})`} />
      {/* Body */}
      <rect
        x="56"
        y="70"
        width="88"
        height="158"
        rx="10"
        fill={`url(#glass-${code})`}
        stroke="#3a3f46"
        strokeWidth="1"
      />
      {/* Glass sheen */}
      <rect x="66" y="80" width="4" height="138" rx="2" fill="#ffffff" opacity="0.08" />

      {/* Silver label wrap */}
      <rect x="57" y="106" width="86" height="88" fill={`url(#label-${code})`} />
      <text
        x="100"
        y="130"
        textAnchor="middle"
        fill="#111318"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.16em"
        fontFamily="var(--font-sans), sans-serif"
      >
        RENOVO LABS
      </text>
      <text
        x="100"
        y="152"
        textAnchor="middle"
        fill="#111318"
        fontSize="10.5"
        fontWeight="700"
        letterSpacing="0.05em"
        fontFamily="var(--font-mono), monospace"
      >
        {name.toUpperCase()}
      </text>
      <line x1="70" y1="162" x2="130" y2="162" stroke="#9aa0a8" strokeWidth="0.75" />
      <text
        x="100"
        y="176"
        textAnchor="middle"
        fill="#3c4249"
        fontSize="7.5"
        letterSpacing="0.16em"
        fontFamily="var(--font-mono), monospace"
      >
        LOT: {code}
      </text>
      <text
        x="100"
        y="188"
        textAnchor="middle"
        fill="#565d66"
        fontSize="6"
        letterSpacing="0.12em"
        fontFamily="var(--font-mono), monospace"
      >
        RESEARCH USE ONLY
      </text>
    </svg>
  );
}
