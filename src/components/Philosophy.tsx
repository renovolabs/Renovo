"use client";

import { useEffect, useState } from "react";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";
import Reveal from "./Reveal";

/**
 * Brand / philosophy — manufacturing and testing standards ONLY.
 * COMPLIANCE: never describe what a compound does in a body.
 * COPY NOTE: this is provisional brand copy pending founder review.
 *
 * The three principles present as a fanned card stack (swipe, click,
 * arrow keys, or dots to cycle; slow auto-advance pauses on hover).
 */
const PRINCIPLES: (CardStackItem & { code: string; body: string })[] = [
  {
    id: "purity",
    code: "01 / PURITY",
    title: "Analyzed, not assumed",
    body: "Every production lot is characterized by independent third-party analysis for identity and purity before it carries the Renovo name.",
  },
  {
    id: "traceability",
    code: "02 / TRACEABILITY",
    title: "A paper trail for every vial",
    body: "Single-lot manufacturing with full documentation — from raw material to sealed vial, every step is recorded and auditable.",
  },
  {
    id: "standards",
    code: "03 / STANDARDS",
    title: "Built like it costs money",
    body: "Sterile fill, controlled storage, and handling protocols modeled on pharmaceutical-grade manufacturing practice.",
  },
];

/** Card dimensions tuned per viewport (the stack takes fixed px sizes). */
function useCardSize() {
  const [size, setSize] = useState({ width: 480, height: 300 });
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setSize({ width: Math.min(320, w - 72), height: 400 });
      } else if (w < 1024) {
        setSize({ width: 420, height: 320 });
      } else {
        setSize({ width: 480, height: 300 });
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return size;
}

export default function Philosophy() {
  const { width, height } = useCardSize();

  return (
    <section id="philosophy" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-accent">
            The standard
          </p>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.02em] text-snow sm:text-4xl">
            Precision is the product.
          </h2>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-fog">
            Renovo Labs exists because research deserves reference-grade
            material. We obsess over the manufacturing, testing, and
            documentation — nothing else.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <CardStack
            items={PRINCIPLES}
            initialIndex={0}
            cardWidth={width}
            cardHeight={height}
            maxVisible={3}
            overlap={0.55}
            spreadDeg={18}
            tiltXDeg={8}
            depthPx={110}
            autoAdvance
            intervalMs={5000}
            pauseOnHover
            showDots
            renderCard={(item, { active }) => (
              <div
                className={`flex h-full w-full flex-col bg-raised p-7 text-left transition-opacity duration-300 ${
                  active ? "opacity-100" : "opacity-60"
                }`}
              >
                <span className="font-mono text-[10px] tracking-[0.24em] text-accent">
                  {item.code}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-snow">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-fog">
                  {item.body}
                </p>
                <span className="mt-auto font-mono text-[9px] uppercase tracking-[0.2em] text-fog/80">
                  Renovo Labs · The Standard
                </span>
              </div>
            )}
          />
        </Reveal>
      </div>
    </section>
  );
}
