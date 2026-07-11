"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero — the ONE choreographed moment on the site.
 * Two acts: a staggered entrance (mark → copy → CTA → product), then a
 * quiet idle loop on the product only: a slow float and a specular sweep
 * masked to the vial's own pixels. Everything is transform/opacity, so it
 * stays on the compositor at 60fps. Reduced motion collapses to fades.
 */

/** Hero render — background-free cutout generated from official photography. */
const HERO_VIAL = "/assets/products/retatrutide-hero.png";
/** Cutout's intrinsic aspect ratio (651 × 1475). */
const VIAL_W = 300;
const VIAL_H = Math.round((1475 / 651) * VIAL_W);

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
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-4 pb-20 pt-32 sm:px-6"
    >
      {/* Static ambient glow anchored behind the product */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/2 hidden h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-accent/[0.05] blur-[130px] lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[36%] h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px] lg:hidden"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 text-center lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:text-left">
        {/* ── Copy column ─────────────────────────────────────────────── */}
        <div>
          <motion.div {...rise(0)} className="flex justify-center lg:justify-start">
            <Image
              src="/assets/logo-mark-white.png"
              alt="Renovo Labs"
              width={69}
              height={50}
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
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-snow sm:text-5xl md:text-6xl"
          >
            Research-grade peptides.
            <br />
            <span className="text-fog">Manufactured without compromise.</span>
          </motion.h1>

          <motion.p
            {...rise(3)}
            className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-fog sm:text-lg lg:mx-0"
          >
            A new standard of purity, traceability, and analytical rigor —
            for laboratory research use only.
          </motion.p>

          <motion.div
            {...rise(4)}
            className="mt-10 flex flex-col items-center gap-4 lg:items-start"
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

        {/* ── Product column ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 48, scale: reduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto w-[210px] sm:w-[240px] lg:w-[270px]"
        >
          {/* Idle float — imperceptible drift, product feels alive */}
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <Image
                src={HERO_VIAL}
                alt="Retatrutide vial — Renovo Labs"
                width={VIAL_W}
                height={VIAL_H}
                priority
                className="relative z-10 h-auto w-full"
              />

              {/* Specular sweep, masked to the vial's own pixels */}
              {!reduceMotion && (
                <div
                  aria-hidden
                  className="absolute inset-0 z-20 overflow-hidden"
                  style={{
                    maskImage: `url(${HERO_VIAL})`,
                    maskSize: "100% 100%",
                    WebkitMaskImage: `url(${HERO_VIAL})`,
                    WebkitMaskSize: "100% 100%",
                  }}
                >
                  <motion.div
                    className="absolute inset-y-0 w-[45%]"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)",
                    }}
                    initial={{ x: "-130%" }}
                    animate={{ x: "320%" }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      repeatDelay: 4.2,
                      delay: 2.2,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                </div>
              )}
            </div>

            {/* Soft floor reflection — absolutely positioned so it doesn't
                stretch the layout; the section's overflow-hidden clips it */}
            <Image
              src={HERO_VIAL}
              alt=""
              aria-hidden
              width={VIAL_W}
              height={VIAL_H}
              className="absolute left-0 top-full h-auto w-full -scale-y-100 opacity-25 blur-[3px]"
              style={{
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 32%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 32%)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint — static, quiet */}
      <motion.div
        {...rise(5)}
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-fog"
      >
        SCROLL
      </motion.div>
    </section>
  );
}
