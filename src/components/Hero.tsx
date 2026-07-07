"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero — the ONE choreographed entrance moment on the site.
 * A staggered rise of the eyebrow, headline lines, and CTA. Everything
 * after this is restrained scroll-reveals only.
 */
export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Shared entrance: fade + rise, staggered by index.
  const rise = (i: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.9,
      delay: 0.15 + i * 0.14,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-28 sm:px-6"
    >
      {/* Single, static ambient glow — no animation, just depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-[140px]"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Brand mark — leads the entrance choreography */}
        <motion.div {...rise(0)} className="flex justify-center">
          <Image
            src="/assets/logo-mark-white.png"
            alt="Renovo Labs"
            width={83}
            height={60}
            priority
          />
        </motion.div>

        <motion.p
          {...rise(1)}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.34em] text-accent"
        >
          Renovo Labs · Est. 2026
        </motion.p>

        <motion.h1
          {...rise(2)}
          className="mt-8 text-balance text-5xl font-semibold leading-[1.04] tracking-[-0.03em] text-snow sm:text-6xl md:text-7xl"
        >
          Research-grade peptides.
          <br />
          <span className="text-fog">Manufactured without compromise.</span>
        </motion.h1>

        <motion.p
          {...rise(3)}
          className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-fog sm:text-lg"
        >
          A new standard of purity, traceability, and analytical rigor —
          for laboratory research use only.
        </motion.p>

        <motion.div
          {...rise(4)}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <a
            href="#waitlist"
            className="rounded-full bg-accent px-8 py-3.5 text-[15px] font-semibold text-base transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Join the waitlist
          </a>
          <span className="font-mono text-[11px] tracking-[0.2em] text-fog">
            FIRST BATCH · LIMITED ALLOCATION
          </span>
        </motion.div>
      </div>

      {/* Scroll hint — static, quiet */}
      <motion.div
        {...rise(5)}
        aria-hidden
        className="absolute bottom-8 font-mono text-[10px] tracking-[0.3em] text-fog/60"
      >
        SCROLL
      </motion.div>
    </section>
  );
}
