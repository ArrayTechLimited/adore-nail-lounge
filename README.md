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

## Known deviations from the handoff

- **Logo.** The handoff footer used `filter: invert(1)` on the dark mark. This ships a real
  light knockout variant (`public/adore-logo-light.png`, derived from the supplied PNG's
  alpha channel) instead. Replace both with vector once the client supplies SVG.
- **Map.** The desktop Visit section shows the salon interior rather than a map, per the
  client's call. Directions are still one tap away — "Get directions" opens Google Maps for
  the address in a new tab. To put a map back, swap `visitPhoto` in `Visit.tsx` for an
  embed or a static map image.
- **Favicon.** None is shipped yet, so `/favicon.ico` 404s. Drop an `icon.png` into
  `src/app/` (Next serves it automatically) once the client supplies a mark.
