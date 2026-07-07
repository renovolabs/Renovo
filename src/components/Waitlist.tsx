"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import Reveal from "./Reveal";

type FormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Waitlist capture — the primary conversion goal.
 * Email + optional product interest, gated behind a mandatory
 * age / research-use acknowledgment (compliance requirement).
 */
export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const reduceMotion = useReducedMotion();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!acknowledged || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          product_interest: interest || null,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section id="waitlist" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.34em] text-accent">
            First access
          </p>
          <h2 className="mt-4 text-center text-balance text-3xl font-semibold tracking-[-0.02em] text-snow sm:text-4xl">
            The first batch is limited.
            <br />
            The list is not optional.
          </h2>
          <p className="mt-6 text-center text-pretty leading-relaxed text-fog">
            Join the waitlist for allocation priority and launch updates.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                /* ── Success state ──────────────────────────────────── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="py-6 text-center"
                  role="status"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                    Confirmed
                  </span>
                  <p className="mt-4 text-xl font-semibold tracking-tight text-snow">
                    You&rsquo;re on the list.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog">
                    We&rsquo;ll be in touch when allocation opens. No noise
                    before then.
                  </p>
                </motion.div>
              ) : (
                /* ── Capture form ───────────────────────────────────── */
                <motion.form
                  key="form"
                  initial={false}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  noValidate={false}
                >
                  <div>
                    <label
                      htmlFor="waitlist-email"
                      className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog"
                    >
                      Email
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@lab.institution"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-line bg-base px-4 py-3 text-[15px] text-snow placeholder:text-fog/50 focus:border-accent/60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="waitlist-interest"
                      className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog"
                    >
                      Compound of interest · optional
                    </label>
                    <select
                      id="waitlist-interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="mt-2 w-full appearance-none rounded-xl border border-line bg-base px-4 py-3 text-[15px] text-snow focus:border-accent/60"
                    >
                      <option value="">General interest</option>
                      {PRODUCTS.map((product) => (
                        <option key={product.slug} value={product.slug}>
                          {product.name} · {product.code}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mandatory research-use / age acknowledgment — compliance */}
                  <label
                    htmlFor="waitlist-ack"
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-base px-4 py-3.5"
                  >
                    <input
                      id="waitlist-ack"
                      type="checkbox"
                      required
                      checked={acknowledged}
                      onChange={(e) => setAcknowledged(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#e6e9ec]"
                    />
                    <span className="text-xs leading-relaxed text-fog">
                      I confirm I am at least 21 years of age and that my
                      interest relates solely to laboratory research use.
                      These products are not for human consumption.
                    </span>
                  </label>

                  {status === "error" && (
                    <p className="text-sm text-red-400" role="alert">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!acknowledged || status === "submitting"}
                    className="mt-1 rounded-xl bg-accent px-6 py-3.5 text-[15px] font-semibold text-base transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {status === "submitting" ? "Submitting…" : "Request access"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
