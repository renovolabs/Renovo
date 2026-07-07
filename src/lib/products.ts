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
  /**
   * Official product photography under /public/assets/products.
   * Absent → the card renders the clearly-marked placeholder vial.
   */
  image?: string;
}

// Codes follow the lot format on the official label stock (LOT: RL-001A).
export const PRODUCTS: Product[] = [
  {
    name: "Retatrutide",
    code: "RL-001",
    slug: "retatrutide",
    image: "/assets/products/retatrutide.png",
  },
  { name: "Tirzepatide", code: "RL-002", slug: "tirzepatide" },
  { name: "BPC-157", code: "RL-003", slug: "bpc-157" },
  { name: "GHK-Cu", code: "RL-004", slug: "ghk-cu" },
  { name: "Glutathione", code: "RL-005", slug: "glutathione" },
  { name: "Semax", code: "RL-006", slug: "semax" },
  { name: "NAD+", code: "RL-007", slug: "nad-plus" },
  { name: "MOTS-c", code: "RL-008", slug: "mots-c" },
  { name: "Tesamorelin", code: "RL-009", slug: "tesamorelin" },
  { name: "KPV", code: "RL-010", slug: "kpv" },
];

/** Valid values accepted by the waitlist API for product_interest. */
export const PRODUCT_SLUGS: readonly string[] = PRODUCTS.map((p) => p.slug);
