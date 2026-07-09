"use client";

import { TELEGRAM_URL } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * Slim community strip between philosophy and waitlist.
 * COMPLIANCE: logistics language only — announcements, discounts,
 * community. Nothing about what compounds do.
 */
export default function Community() {
  return (
    <section id="community" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <Reveal>
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-line bg-surface px-6 py-12 text-center sm:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-accent">
            The network
          </p>
          <h2 className="max-w-xl text-balance text-2xl font-semibold tracking-[-0.02em] text-snow sm:text-3xl">
            Announcements, member discounts, and the community — first on
            Telegram.
          </h2>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-raised px-6 py-3 text-[14px] font-medium text-snow transition-colors duration-200 hover:border-accent/60 hover:text-accent"
          >
            <TelegramIcon />
            Join the Telegram
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/** Minimal paper-plane glyph — inherits currentColor. */
export function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M21.9 4.1a1 1 0 0 0-1.35-1.05L2.7 10.06a1 1 0 0 0 .07 1.9l4.55 1.36 1.72 5.53a1 1 0 0 0 1.66.43l2.5-2.42 4.5 3.32a1 1 0 0 0 1.57-.62L21.9 4.1ZM9.2 13.05l8.2-5.9-6.7 6.8a1 1 0 0 0-.27.53l-.42 2.4-.81-3.83Z" />
    </svg>
  );
}
