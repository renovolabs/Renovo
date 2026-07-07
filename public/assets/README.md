# Brand asset drop zone

Official brand assets were **not available** when this site was built, so the
site currently runs on clearly-marked placeholders:

| Asset | Placeholder in use | Where to swap |
| --- | --- | --- |
| Logo / wordmark | Typographic `RENOVO LABS` wordmark | `src/components/Nav.tsx`, `src/components/Footer.tsx` |
| Brand palette | Clinical dark palette + single mint accent | `@theme` block in `src/app/globals.css` |
| Product photography | Vector vial renders (cards show a `RENDER PENDING` tag) | `src/components/ProductVisual.tsx` → replace with `next/image` |

Drop files here as:

```
public/assets/logo.svg
public/assets/products/<slug>.png   # slugs in src/lib/products.ts
```
