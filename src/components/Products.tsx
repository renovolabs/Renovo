"use client";

import { PRODUCTS } from "@/lib/products";
import ProductVisual from "./ProductVisual";
import Reveal from "./Reveal";

/**
 * Product showcase — name + image ONLY.
 * COMPLIANCE: no descriptions, benefits, dosages, or therapeutic claims.
 * Cards reveal on scroll with a small stagger.
 */
export default function Products() {
  return (
    <section id="products" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-accent">
          The catalog
        </p>
        <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.02em] text-snow sm:text-4xl">
          Ten compounds. One standard.
        </h2>
      </Reveal>

      <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
        {PRODUCTS.map((product, i) => (
          <li key={product.slug}>
            {/* Stagger within each viewport row, capped so late rows don't lag */}
            <Reveal delay={(i % 5) * 0.08}>
              <div className="group relative rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-accent/40 sm:p-5">
                <div className="aspect-[3/4]">
                  <ProductVisual name={product.name} code={product.code} />
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold tracking-tight text-snow">
                    {product.name}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-fog">
                    {product.code}
                  </span>
                </div>

                {/* Visible placeholder marker — remove when photography lands */}
                <span className="mt-2 inline-block font-mono text-[9px] uppercase tracking-[0.2em] text-fog/50">
                  Render pending
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
