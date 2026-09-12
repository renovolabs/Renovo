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

/** A catalog entry before the image path is resolved. */
type ProductEntry = Omit<Product, "image"> & {
  /**
   * Set false until /assets/products/<slug>.png exists — the card then
   * renders the placeholder vial instead of a broken image.
   */
  photo?: false;
};

/** Official photography lives at /assets/products/<slug>.png. */
const productImage = (slug: string) => `/assets/products/${slug}.png`;

// Codes follow the lot format on the official label stock (LOT: RL-001A).
const ENTRIES: ProductEntry[] = [
  { name: "Retatrutide", code: "RL-001", slug: "retatrutide" },
  { name: "Tirzepatide", code: "RL-002", slug: "tirzepatide" },
  { name: "BPC-157", code: "RL-003", slug: "bpc-157" },
  { name: "GHK-Cu", code: "RL-004", slug: "ghk-cu" },
  { name: "Glutathione", code: "RL-005", slug: "glutathione" },
  { name: "Semax", code: "RL-006", slug: "semax" },
  { name: "NAD+", code: "RL-007", slug: "nad-plus" },
  { name: "MOTS-c", code: "RL-008", slug: "mots-c" },
  { name: "Tesamorelin", code: "RL-009", slug: "tesamorelin" },
  { name: "KPV", code: "RL-010", slug: "kpv" },
  { name: "Bac Water 3 mL", code: "RL-011", slug: "bac-water-3ml" },
  { name: "Bac Water 10 mL", code: "RL-012", slug: "bac-water-10ml" },
];

export const PRODUCTS: Product[] = ENTRIES.map(({ photo, ...p }) => ({
  ...p,
  ...(photo === false ? {} : { image: productImage(p.slug) }),
}));

/** Valid values accepted by the waitlist API for product_interest. */
export const PRODUCT_SLUGS: readonly string[] = PRODUCTS.map((p) => p.slug);

const COUNT_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
  "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
  "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty",
];

/** Catalog size, spelled out for the section headline ("Twelve products."). */
export const PRODUCT_COUNT_WORD =
  COUNT_WORDS[PRODUCTS.length] ?? String(PRODUCTS.length);
