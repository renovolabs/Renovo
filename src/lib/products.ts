/**
 * Product catalog for the launch site.
 *
 * COMPLIANCE: names and lot-style catalog codes only. No descriptions,
 * benefits, dosages, or therapeutic language — anywhere. Keep it that way.
 */
export interface Product {
  /** Compound name as displayed on the card. */
  name: string;
  /** Lot-style catalog code — monospace accent, purely presentational. */
  code: string;
  /** Stable slug, used as the value for the waitlist interest dropdown. */
  slug: string;
}

export const PRODUCTS: Product[] = [
  { name: "Retatrutide", code: "RNV-001", slug: "retatrutide" },
  { name: "Tirzepatide", code: "RNV-002", slug: "tirzepatide" },
  { name: "BPC-157", code: "RNV-003", slug: "bpc-157" },
  { name: "GHK-Cu", code: "RNV-004", slug: "ghk-cu" },
  { name: "Glutathione", code: "RNV-005", slug: "glutathione" },
  { name: "Semax", code: "RNV-006", slug: "semax" },
  { name: "NAD+", code: "RNV-007", slug: "nad-plus" },
  { name: "MOTS-c", code: "RNV-008", slug: "mots-c" },
  { name: "Tesamorelin", code: "RNV-009", slug: "tesamorelin" },
  { name: "KPV", code: "RNV-010", slug: "kpv" },
];

/** Valid values accepted by the waitlist API for product_interest. */
export const PRODUCT_SLUGS: readonly string[] = PRODUCTS.map((p) => p.slug);
