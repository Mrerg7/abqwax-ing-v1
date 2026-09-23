# ABQWax.ing

Luxurious informational and acquisition site for ABQWax.ing — Albuquerque waxing, written into the domain.

**Asking price:** $250,000  
**Inquiries:** [sales@desertrich.com](mailto:sales@desertrich.com)

## Local development

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 4327
```

Open [http://127.0.0.1:4327](http://127.0.0.1:4327).

## Deploy

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`

## Canonical URL policy

`src/worker.ts` runs before static assets (`assets.run_worker_first = true`) so every duplicate
variant of a URL answers with one permanent redirect instead of indexable HTML:

| Request | Response |
| --- | --- |
| `http://abqwax.ing/*` | `308 → https://abqwax.ing/*` |
| `https://www.abqwax.ing/*` | `308 → https://abqwax.ing/*` |
| `https://abqwax-ing-v1.mrerg.workers.dev/*` | `308 → https://abqwax.ing/*` |
| `/page` (no trailing slash) | `308 → /page/` |
| `/page.html`, `/index.html` | `308 → /page/`, `/` |
| `/404`, `/404/`, unknown paths | `404` + `X-Robots-Tag: noindex` + `noindex` meta |

Canonical pages stay `200` with a self-referential canonical, so Google stops classing the
old duplicate URLs as “Alternate page with proper canonical tag”.

