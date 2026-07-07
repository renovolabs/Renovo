# Brand asset drop zone

Official brand assets were **not available** when this site was built, so the
site currently runs on clearly-marked placeholders:

| Asset | Placeholder in use | Where to swap |
| --- | --- | --- |
| Logo / wordmark | Typographic `RENOVO LABS` wordmark (official interlocked-R mark pending as a file) | `src/components/Nav.tsx`, `src/components/Footer.tsx`, `src/app/icon.svg` |
| Brand palette | Monochrome system derived from the official assets (black mark / white knockout / silver label) | `@theme` block in `src/app/globals.css` |
| Product photography | Vector vial renders mirroring the official label system (cards show a `RENDER PENDING` tag) | `src/components/ProductVisual.tsx` → replace with `next/image` |

Drop files here as:

```
public/assets/logo.svg
public/assets/products/<slug>.png   # slugs in src/lib/products.ts
```
