/**
 * Footer — legal, contact, and the mandatory compliance block.
 * COMPLIANCE: the disclaimer text below is required verbatim in spirit;
 * do not soften it. The jurisdiction-specific block is pending counsel.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold tracking-[0.22em] text-snow">
                RENOVO
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-fog">
                LABS
              </span>
            </div>
            <p className="mt-4 max-w-xs font-mono text-[10px] leading-relaxed tracking-[0.12em] text-fog/70">
              PRECISION-MANUFACTURED RESEARCH COMPOUNDS
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-fog">
            {/* PLACEHOLDER contact — replace with the official inbox */}
            <a
              href="mailto:contact@renovolabs.example"
              className="transition-colors hover:text-accent"
            >
              contact@renovolabs.example
            </a>
            <a href="#products" className="transition-colors hover:text-accent">
              Catalog
            </a>
            <a href="#waitlist" className="transition-colors hover:text-accent">
              Waitlist
            </a>
          </div>
        </div>

        {/* ── Mandatory compliance block ─────────────────────────────── */}
        <div className="mt-14 rounded-2xl border border-line bg-base p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
            Research use disclaimer
          </p>
          <p className="mt-3 text-xs leading-relaxed text-fog">
            All products offered by Renovo Labs are sold strictly for
            laboratory and research use only. They are not for human or
            veterinary consumption, are not dietary supplements, and are not
            drugs. These products have not been evaluated by the FDA or any
            other regulatory authority and are not intended to diagnose,
            treat, cure, or prevent any disease. By joining the waitlist or
            purchasing, you represent that you are a qualified researcher or
            research entity and that materials will be handled by trained
            personnel in an appropriate laboratory setting.
          </p>

          {/* JURISDICTION-SPECIFIC LEGAL BLOCK — TBD.
              Awaiting counsel; keep this visible marker until it lands. */}
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/50">
            [ Jurisdiction-specific legal notice — pending legal review ]
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-[0.14em] text-fog/60">
            © {new Date().getFullYear()} RENOVO LABS. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[10px] tracking-[0.14em] text-fog/60">
            LABORATORY RESEARCH USE ONLY
          </p>
        </div>
      </div>
    </footer>
  );
}
