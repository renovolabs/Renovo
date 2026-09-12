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
  /** Photography file extension; the asset is /products/<slug>.<ext>. */
  ext?: "png" | "jpeg";
  /**
   * Set false until the photography exists — the card then renders the
   * placeholder vial instead of a broken image.
   */
  photo?: false;
};

/** Official photography lives at /assets/products/<slug>.<ext>. */
const productImage = (slug: string, ext: string) =>
  `/assets/products/${slug}.${ext}`;

// Codes run in display order; supply items sit last. The lot format matches
// the official label stock (LOT: RL-001A).
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
  { name: "5-Amino-1MQ", code: "RL-011", slug: "5-amino-1mq", ext: "jpeg" },
  { name: "Cagrilintide", code: "RL-012", slug: "cagrilintide", ext: "jpeg" },
  { name: "DSIP", code: "RL-013", slug: "dsip", ext: "jpeg" },
  { name: "HGH", code: "RL-014", slug: "hgh", ext: "jpeg" },
  { name: "Ipamorelin", code: "RL-015", slug: "ipamorelin", ext: "jpeg" },
  { name: "Melanotan I", code: "RL-016", slug: "melanotan-i", ext: "jpeg" },
  { name: "Melanotan II", code: "RL-017", slug: "melanotan-ii", ext: "jpeg" },
  { name: "SS-31", code: "RL-018", slug: "ss-31", ext: "jpeg" },
  { name: "TB-500", code: "RL-019", slug: "tb-500", ext: "jpeg" },
  { name: "Bac Water 3 mL", code: "RL-020", slug: "bac-water-3ml" },
  { name: "Bac Water 10 mL", code: "RL-021", slug: "bac-water-10ml" },
];

export const PRODUCTS: Product[] = ENTRIES.map(
  ({ photo, ext = "png", ...p }) => ({
    ...p,
    ...(photo === false ? {} : { image: productImage(p.slug, ext) }),
  }),
);

/** Valid values accepted by the waitlist API for product_interest. */
export const PRODUCT_SLUGS: readonly string[] = PRODUCTS.map((p) => p.slug);

const ONES = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
  "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
  "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty",
];
const TENS = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty",
  "Ninety",
];

/** Catalog size, spelled out for the section headline ("Twelve products."). */
function spellCount(n: number): string {
  if (n <= 20) return ONES[n];
  if (n < 100) {
    const tens = TENS[Math.floor(n / 10)];
    const ones = n % 10;
    return ones === 0 ? tens : `${tens}-${ONES[ones].toLowerCase()}`;
  }
  return String(n);
}

export const PRODUCT_COUNT_WORD = spellCount(PRODUCTS.length);
