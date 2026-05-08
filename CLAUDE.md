# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static single-page portfolio site. No build step, no package manager, no test suite. Open `index.html` directly in a browser or use a local server (e.g. VS Code Live Server).

## Commit workflow

**Never commit and never push.** Write all commit content to the `commits` file at the repo root instead. The user handles all git operations.

Format for `commits`:

```
type: short summary

- Specific change 1
- Specific change 2
```

Conventional commit types: `feat`, `fix`, `style`, `refactor`, `perf`, `docs`.

## Architecture

Three source files:

| File | Role |
|---|---|
| `index.html` | Single page — all sections (hero, projects, about, contact, footer) inline |
| `styles/style.css` | All styles — organised by section with ASCII-banner comments |
| `scripts/main.js` | Navbar scroll/active-link, AOS init, mobile nav, particle background IIFE |

Vendored dependencies (do not modify):
- `bootstrap/` — Bootstrap 5 (CSS + JS bundle)
- `assets/fontawesome/` — Font Awesome 6 (local copy, used via `<link>`)

CDN dependencies loaded in `index.html`:
- AOS (Animate On Scroll) — `cdnjs.cloudflare.com`, loaded with SRI hashes

## Color palette

All theme colors are CSS custom properties in `:root` (`style.css` lines 2–11). Midnight Forest scheme:

```
--dark-bg:    #060e0c   (page background)
--darker-bg:  #030806   (footer, scrollbar track)
--card-bg:    #0a1410   (cards)
--primary:    #0d9488   (teal — buttons, timeline, scrollbar)
--secondary:  #10b981   (emerald — eyebrows, badges, availability)
--text:       #f2f2f2
--text-muted: #6b7280
--border:     rgba(255,255,255,0.06)
```

Several selectors use hardcoded `rgba(13,148,136,...)` / `rgba(16,185,129,...)` values instead of variables — these must be updated manually if the palette changes.

The navbar background (`rgba(6,14,12,...)`) is also hardcoded and must track `--dark-bg`.

## Particle background

`#bg-canvas` is a fixed full-viewport `<canvas aria-hidden="true">` driven by an IIFE in `main.js`. Key constants at the top of the IIFE: `COUNT` (dot count), `LINE_THRESH` (connection distance px), `SPEED`, `DOT_OPACITY`, `LERP` (mouse parallax easing). Each dot has a `px` field (parallax depth factor, 0.01–0.04). The draw loop uses squared-distance early rejection before calling `Math.sqrt`.
