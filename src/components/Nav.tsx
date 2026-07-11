"use client";

import Image from "next/image";

/**
 * Fixed header: persistent compliance ticker + minimal wordmark nav.
 * The disclaimer bar is mandatory and must remain visible site-wide —
 * do not remove or collapse it behind an interaction.
 */
export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Persistent research-use disclaimer — compliance requirement */}
      <div
        className="border-b border-line bg-base/95 px-4 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-fog"
        role="note"
        aria-label="Research use disclaimer"
      >
        For laboratory research use only&nbsp;·&nbsp;Not for human consumption
      </div>

      <nav
        className="border-b border-line/60 bg-base/80 backdrop-blur-md"
        aria-label="Main"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          {/* Official interlocked-R mark (white knockout) + wordmark */}
          <a href="#top" className="flex items-center gap-3">
            <Image
              src="/assets/logo-mark-white.png"
              alt="Renovo Labs mark"
              width={36}
              height={26}
              priority
            />
            <span className="flex items-baseline gap-2">
              <span className="text-[15px] font-semibold tracking-[0.22em] text-snow">
                RENOVO
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-fog">
                LABS
              </span>
            </span>
          </a>

          {/* py-3 keeps the tap target ≥44px on touch devices */}
          <a
            href="#waitlist"
            className="rounded-full border border-line bg-raised px-5 py-3 text-[13px] font-medium text-snow transition-colors duration-200 hover:border-accent/60 hover:text-accent"
          >
            Join the waitlist
          </a>
        </div>
      </nav>
    </header>
  );
}
