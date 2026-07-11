"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Hero — cinematic product reveal, per storyboard:
 *   0–2s   page loads near-black; a soft light sweeps left→right and
 *          reveals the floating vial (hero-reveal.mp4, plays once).
 *   after  the vial settles into an ultra-slow idle drift
 *          (hero-loop.mp4, seamless: first/last frame == reveal's last
 *          frame, both generated from the same master still).
 *   copy   headline/CTA stay invisible until the reveal lands, then
 *          rise in. The nav CTA is visible the whole time.
 *   scroll the vial scales down ~12%, drifts up, and fades into the
 *          catalog section.
 *
 * Fallbacks: reduced motion (or any autoplay failure) skips straight to
 * the lit poster + copy. All motion is transform/opacity.
 */

const REVEAL_SRC = "/assets/hero-reveal.mp4";
const LOOP_SRC = "/assets/hero-loop.mp4";
const POSTER_SRC = "/assets/hero-vial-poster.jpg";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);

  // 'reveal' → playing the light sweep; 'settled' → loop + copy visible.
  const [phase, setPhase] = useState<"reveal" | "settled">("reveal");
  const settle = useCallback(() => setPhase("settled"), []);

  // Reduced motion skips the choreography entirely.
  useEffect(() => {
    if (reduceMotion) settle();
  }, [reduceMotion, settle]);

  // Safety net: if 'ended' never fires (autoplay blocked, decode error,
  // tab restored mid-clip), the page must not stay dark.
  useEffect(() => {
    if (phase !== "reveal") return;
    const timer = setTimeout(settle, 3200); // reveal clip runs 2.4s
    return () => clearTimeout(timer);
  }, [phase, settle]);

  // Scroll choreography: shrink ~12%, drift up, fade out.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const vialScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.88]);
  const vialY = useTransform(scrollYProgress, [0, 0.9], [0, -70]);
  const vialOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const settled = phase === "settled";

  // Copy entrance — staggered rise, fired once the reveal lands.
  const rise = (i: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: settled ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 24 },
    transition: {
      duration: 0.8,
      delay: 0.1 + i * 0.12,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6"
    >
      {/* Faint static depth behind the vial — no distractions */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[130px]"
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* ── The vial stage ─────────────────────────────────────────── */}
        <motion.div
          style={{
            scale: vialScale,
            y: vialY,
            opacity: vialOpacity,
            // Dissolve the clip's edges into the page background so the
            // video's rectangular bounds are never visible
            maskImage:
              "radial-gradient(ellipse 62% 55% at 50% 46%, black 58%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 62% 55% at 50% 46%, black 58%, transparent 82%)",
          }}
          className="relative h-[46svh] w-full max-w-[320px] sm:h-[50svh]"
        >
          {reduceMotion ? (
            /* Reduced motion: the lit master frame, nothing moves */
            <Image
              src={POSTER_SRC}
              alt="Retatrutide vial — Renovo Labs"
              fill
              priority
              sizes="320px"
              className="object-contain"
            />
          ) : (
            <>
              {/* Act 1 — light sweep reveal, plays once */}
              <video
                className="absolute inset-0 h-full w-full object-contain"
                style={{ opacity: settled ? 0 : 1 }}
                autoPlay
                muted
                playsInline
                preload="auto"
                poster={POSTER_SRC}
                onEnded={() => {
                  loopRef.current?.play().catch(() => undefined);
                  settle();
                }}
                onError={settle}
                aria-label="Retatrutide vial — Renovo Labs"
              >
                <source src={REVEAL_SRC} type="video/mp4" />
              </video>

              {/* Act 2 — seamless idle drift; preloaded, swapped in on the
                  shared frame so the cut is invisible */}
              <video
                ref={loopRef}
                className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
                style={{ opacity: settled ? 1 : 0 }}
                muted
                loop
                playsInline
                preload="auto"
                poster={POSTER_SRC}
                aria-hidden
              >
                <source src={LOOP_SRC} type="video/mp4" />
              </video>
            </>
          )}
        </motion.div>

        {/* ── Copy — enters after the light lands ────────────────────── */}
        <div className="mt-10">
          <motion.p
            {...rise(0)}
            className="font-mono text-[11px] uppercase tracking-[0.34em] text-accent"
          >
            Renovo Labs · Est. 2026
          </motion.p>

          <motion.h1
            {...rise(1)}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-snow sm:text-5xl md:text-6xl"
          >
            Research-grade peptides.
            <br />
            <span className="text-fog">Manufactured without compromise.</span>
          </motion.h1>

          <motion.p
            {...rise(2)}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-fog sm:text-lg"
          >
            A new standard of purity, traceability, and analytical rigor —
            for laboratory research use only.
          </motion.p>

          <motion.div
            {...rise(3)}
            className="mt-9 flex flex-col items-center gap-4"
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
      </div>

      {/* Scroll hint */}
      <motion.div
        {...rise(4)}
        aria-hidden
        className="absolute bottom-6 font-mono text-[10px] tracking-[0.3em] text-fog"
      >
        SCROLL
      </motion.div>
    </section>
  );
}
