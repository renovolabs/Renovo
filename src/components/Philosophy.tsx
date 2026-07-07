"use client";

import Reveal from "./Reveal";

/**
 * Brand / philosophy — manufacturing and testing standards ONLY.
 * COMPLIANCE: never describe what a compound does in a body.
 * COPY NOTE: this is provisional brand copy pending founder review.
 */
const PRINCIPLES = [
  {
    code: "01 / PURITY",
    title: "Analyzed, not assumed",
    body: "Every production lot is characterized by independent third-party analysis for identity and purity before it carries the Renovo name.",
  },
  {
    code: "02 / TRACEABILITY",
    title: "A paper trail for every vial",
    body: "Single-lot manufacturing with full documentation — from raw material to sealed vial, every step is recorded and auditable.",
  },
  {
    code: "03 / STANDARDS",
    title: "Built like it costs money",
    body: "Sterile fill, controlled storage, and handling protocols modeled on pharmaceutical-grade manufacturing practice.",
  },
] as const;

export default function Philosophy() {
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

        <div className="mt-16 grid gap-3 sm:gap-4 md:grid-cols-3">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.code} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-base p-7">
                <span className="font-mono text-[10px] tracking-[0.24em] text-accent">
                  {principle.code}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-snow">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
