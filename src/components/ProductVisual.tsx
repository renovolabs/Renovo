/**
 * ── PLACEHOLDER PRODUCT VISUAL ──────────────────────────────────────────
 * Brand product photography was not present in /assets at build time.
 * This renders a restrained vector vial so the showcase grid ships with
 * correct layout and motion. Swap for real imagery by replacing this
 * component's output with <Image src={`/assets/products/${slug}.png`} …/>.
 * Cards also carry a visible "RENDER PENDING" tag until then.
 */
interface ProductVisualProps {
  /** Compound name engraved on the vial label. */
  name: string;
  /** Lot-style catalog code shown beneath the name. */
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
        {/* Glass body: subtle vertical sheen */}
        <linearGradient id={`glass-${code}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1c2026" />
          <stop offset="18%" stopColor="#2a2f37" />
          <stop offset="50%" stopColor="#181b20" />
          <stop offset="82%" stopColor="#23272e" />
          <stop offset="100%" stopColor="#15181d" />
        </linearGradient>
        <linearGradient id={`cap-${code}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a4049" />
          <stop offset="100%" stopColor="#23272e" />
        </linearGradient>
      </defs>

      {/* Cap */}
      <rect x="72" y="24" width="56" height="26" rx="4" fill={`url(#cap-${code})`} />
      <rect x="72" y="46" width="56" height="6" fill="#101317" />
      {/* Neck */}
      <rect x="80" y="52" width="40" height="14" fill={`url(#glass-${code})`} />
      {/* Body */}
      <rect
        x="58"
        y="66"
        width="84"
        height="160"
        rx="10"
        fill={`url(#glass-${code})`}
        stroke="#2c313a"
        strokeWidth="1"
      />
      {/* Sheen line */}
      <rect x="70" y="78" width="4" height="136" rx="2" fill="#ffffff" opacity="0.06" />

      {/* Label plate */}
      <rect x="66" y="112" width="68" height="72" rx="3" fill="#0e1013" stroke="#22262c" strokeWidth="1" />
      <text
        x="100"
        y="136"
        textAnchor="middle"
        fill="#eef1f4"
        fontSize="10.5"
        fontWeight="600"
        letterSpacing="0.06em"
        fontFamily="var(--font-mono), monospace"
      >
        {name}
      </text>
      <line x1="76" y1="146" x2="124" y2="146" stroke="#22262c" strokeWidth="1" />
      <text
        x="100"
        y="162"
        textAnchor="middle"
        fill="#56dfc3"
        fontSize="8"
        letterSpacing="0.18em"
        fontFamily="var(--font-mono), monospace"
      >
        {code}
      </text>
      <text
        x="100"
        y="176"
        textAnchor="middle"
        fill="#8b939e"
        fontSize="6"
        letterSpacing="0.14em"
        fontFamily="var(--font-mono), monospace"
      >
        RESEARCH USE ONLY
      </text>
    </svg>
  );
}
