"use client";

import Image from "next/image";
import { PRODUCTS, PRODUCT_COUNT_WORD } from "@/lib/products";
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
          {PRODUCT_COUNT_WORD} products. One standard.
        </h2>
      </Reveal>

      {/* 2 / 3 / 4 columns — a multiple-of-12 catalog fills every row evenly */}
      <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {PRODUCTS.map((product, i) => (
          <li key={product.slug}>
            {/* Stagger within each viewport row, capped so late rows don't lag */}
            {/* h-full chain keeps cards in a row level when a name wraps */}
            <Reveal delay={(i % 4) * 0.08} className="h-full">
              <div className="group relative h-full rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-accent/40 sm:p-5">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  {product.image ? (
                    // Official product photography
                    <Image
                      src={product.image}
                      alt={`${product.name} vial — Renovo Labs`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover"
                    />
                  ) : (
                    <ProductVisual name={product.name} code={product.code} />
                  )}
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold tracking-tight text-snow">
                    {product.name}
                  </h3>
                  <span className="shrink-0 whitespace-nowrap font-mono text-[10px] tracking-[0.14em] text-fog">
                    {product.code}
                  </span>
                </div>

                {/* Visible placeholder marker — cleared as photography lands */}
                {!product.image && (
                  <span className="mt-2 inline-block font-mono text-[9px] uppercase tracking-[0.2em] text-fog/50">
                    Render pending
                  </span>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
