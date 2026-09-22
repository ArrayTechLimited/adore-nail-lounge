# Adore Nail Lounge — marketing homepage

A single-page marketing site for Adore Nail Lounge, 4400 N Lamar Blvd Ste 103, Austin TX.
Built from the "espresso & rosewater" design handoff, at two design widths: **390px mobile**
and **1440px desktop**, mobile-first with one breakpoint at **1024px**.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **CSS Modules** over a CSS-custom-property token layer — the design tokens are authored
  as custom properties in `src/app/globals.css` and map 1:1 onto the handoff spec
- **next/font** self-hosts Bodoni Moda and Jost (no render-blocking Google Fonts request)
- No animation library: the entrance motion is CSS transitions driven by one
  `IntersectionObserver`

Output is fully static — the build prerenders the page.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
```

## Where things live

| Path | What |
|---|---|
| `src/content/site.ts` | **Every business fact** — address, phone, hours, prices, review, nav, booking URL, photo slots. Nothing is inlined in markup. |
| `src/app/globals.css` | Design tokens, base type, and the motion system |
| `src/components/MotionRoot.tsx` | Arms and drives the scroll entrance animations |
| `src/components/ui/` | `Button`, `ImageSlot`, `Reveal` primitives |
| `src/components/*.tsx` | One component per section, in document order |
| `public/` | Logo (dark + light knockout variant) |

## Photography

Every slot is filled with a distinct photo: the hero (pedicure), "the room"
(lash detail), the Visit section (salon interior) and six gallery sets. Mobile
shows the designed four-tile subset.

One quality note worth acting on: `public/images/hero-pedicure.jpg` is only
**500x500**. It cover-crops into a roughly 772x640 frame on desktop, so it
upscales and reads soft — noticeably so on a retina screen, and it is the first
thing anyone sees. Every other photo is 1500x2000 with resolution to spare.

To add or swap a photo:

1. Drop the file into `public/images/` (gallery shots into `public/images/gallery/`).
2. In `src/content/site.ts`, set that slot's `src`, and its `width`/`height` if known.

No other change is needed. Two fit behaviours are already wired:

- **Gallery tiles** (`fit="natural"`) adopt each photo's own aspect ratio, so photos fill
  their tile edge to edge with no crop and no letterbox and the masonry columns absorb the
  varying heights. Declare `width`/`height` to avoid a layout shift; otherwise the tile
  measures the file on load.
- **Hero, the room, the map** (`fit="cover"`) keep their designed box and cover-crop —
  letting a wide image dictate their width would break the two-column layout. Supply these
  at ≥1600px on the long edge.

## Motion

Three primitives, each fired when its section scrolls into view, so every section performs
its own entrance:

| Primitive | Movement | Timing |
|---|---|---|
| `rise` | `opacity 0 → 1`, `translateY(20px) → 0` | `.85s cubic-bezier(.2,.75,.2,1)`, per-element delay |
| `bar` | `scaleX(0) → 1` from the left | `.7s`, delay `.42s` |
| `tile` | `opacity`, `clip-path: inset(16% 0 0 0) → 0`, `translateY(18px) scale(.97) → none` | `.9–.95s`, staggered |

Two properties are load-bearing and should survive any refactor:

1. **The visible state is the CSS default.** The hidden start state only applies under
   `data-armed` on `<html>`, which JS sets only after confirming the animation clock is
   advancing. If JS fails or is blocked, content renders visible rather than stranded at
   `opacity: 0`.
2. **`prefers-reduced-motion: reduce` forces the resting state** outright, rather than only
   disabling the transition.

## Deployment (Vercel)

The repo is deploy-ready with no configuration: Vercel detects Next.js, runs
`npm run build`, and serves the prerendered output. `.nvmrc` pins Node 22 so the
build matches what was verified locally.

1. Sign in at [vercel.com](https://vercel.com) with the GitHub account that can
   see `ArrayTechLimited/adore-nail-lounge`.
2. **Add New… → Project**, then import that repo. If it is not listed, use
   *Adjust GitHub App Permissions* and grant Vercel access to it — for an
   organisation repo an org owner may have to approve.
3. Leave every build setting at its detected default and deploy.

Pushes to `main` redeploy production; any other branch gets a preview URL.

### Environment variables

Both are optional and neither is a secret.

| Variable | When to set it |
|---|---|
| `ALLOW_INDEXING` | `true` once the client signs off, to let search engines index the site. Omitted, the page serves `noindex, nofollow` — see below. |
| `SITE_URL` | The custom domain, e.g. `https://adorenaillounge.com`, once one is attached. Without it, Open Graph URLs fall back to the Vercel deployment host, which is correct for previews. |

### Search indexing is off on purpose

This page represents a real business that has not signed off on it, so it ships
`noindex, nofollow`. Letting a pitch demo into Google competes with the salon's
own listings and confuses customers. Set `ALLOW_INDEXING=true` in the Vercel
project and redeploy when it becomes the real site.

### Licensing

Vercel's Hobby plan is for non-commercial use. A demo shown to a prospect fits;
the salon's live business site does not — that needs Pro. Budget for it, or move
to Cloudflare Pages or Netlify, whose free tiers permit commercial use.

### Dependency security

`npm audit` should stay clean of anything reachable by this site. Current state:

- **next 15.5.26** — the 15.5.4 the project started on carried a critical advisory
  set, including unauthenticated RCE in the Image Optimization API when AVIF is
  served. Every photo on this page goes through that optimizer, so it was
  directly exposed. Patched.
- **sharp** pinned to `^0.35.4` via an `overrides` entry — Next 15.5.26 accepts
  `^0.34.3 || ^0.35.4`, and the 0.34 line carries libvips/libheif advisories.
- **postcss** still reports advisories that only a Next 16 major upgrade clears.
  They are build-time issues — arbitrary `.map` reads and stringify XSS via
  attacker-controlled CSS — and every stylesheet here is first-party, so nothing
  reachable is affected. Revisit when upgrading to Next 16 is otherwise worth it.

## Known deviations from the handoff

- **Logo.** The handoff footer used `filter: invert(1)` on the dark mark. This ships a real
  light knockout variant (`public/adore-logo-light.png`, derived from the supplied PNG's
  alpha channel) instead. Replace both with vector once the client supplies SVG.
- **Map.** The desktop Visit section shows the salon interior rather than a map, per the
  client's call. Directions are still one tap away — "Get directions" opens Google Maps for
  the address in a new tab. To put a map back, swap `visitPhoto` in `Visit.tsx` for an
  embed or a static map image.
- **Icons.** The favicon (`src/app/icon.png`, plus `public/favicon.ico`) and the social
  preview (`src/app/opengraph-image.jpg`) are generated from the supplied logo — the
  monogram knocked out on espresso, and the wordmark beside a client-work photo. Replace
  both if the client supplies real brand assets.
