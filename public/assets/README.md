# Brand assets

| File | What it is |
| --- | --- |
| `logo.png` | Official lockup as provided (black on white) |
| `logo-mark-white.png` | Interlocked-R mark, white knockout on transparency — generated from `logo.png`; used in nav + hero |
| `logo-full-white.png` | Full lockup, white knockout — used in footer |
| `products/retatrutide.png` | Official Retatrutide photography |

The favicon (`src/app/icon.png`) is the white mark on the site's near-black.

## Still pending

Photography for the remaining nine compounds. Drop each as
`products/<slug>.png` (slugs in `src/lib/products.ts`), then set the
product's `image` field there — its card switches from the placeholder
vial render automatically.
