# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Group assignment (TP1, "Desarrollo de Sistemas Web Front End 2026") — a static team site for the AACMP group. Plain HTML/CSS/vanilla JS: no build step, no package manager, no tests, no linter. Content, comments and commit messages are in Spanish. Deployed to Vercel from GitHub (https://tp1-dswf-aacmp.vercel.app).

## Running

Open `index.html` in a browser, or serve the repo root with any static server (e.g. VS Code Live Server, `npx serve .`, `python -m http.server`). Serving is preferable so relative paths and `localStorage` behave as in production.

## Architecture

- **Pages:** `index.html` (home + team grid), one profile page per member at the repo root (`juan.html`, `mariano.html`, `daniela.html`, `pablo.html`, `fernando.html`), and `pages/bitacora.html`. Profiles live at the root (not in `pages/`), so paths differ: root pages use `css/…`, `js/…`, `img/…`; `pages/bitacora.html` uses `../`. When adding or moving a page, fix these relative links and the nav hrefs.
- **Shared chrome is duplicated, not templated.** The header (brand, `.menu-button`, `#main-nav`, `.theme-toggle`) and footer are copy-pasted into every HTML file. Changes to nav/header/footer must be applied to all 7 pages.
- **CSS is layered in two files, loaded in this order on every page:**
  1. `css/styles.css` — the original large "Acuarela Botánica" stylesheet (hero, orb, leaves, gem, profiles, bitácora, etc.).
  2. `css/guild.css` — the newer "Fase 2" layer that overrides it: defines the current design tokens (`--bg`, `--surface`, `--text`, `--accent`, `--tech`, …), dark theme via `:root[data-theme="dark"]`, and maps the legacy token names (`--paper`, `--ink`, `--sage`, …) onto the new ones for compatibility. Prefer editing/adding tokens in `guild.css`; the palette/fonts table in `README.md` describes the legacy system and is outdated (current fonts are Manrope + Space Grotesk).
- **Per-member accent color:** set `data-member="<name>"` (on `<body>` of profile pages, on `.member-card` in the index grid); `guild.css` maps it to `--member-accent` from `--member-<name>` tokens.
- **Theming (`js/theme.js`):** loaded synchronously in `<head>` *before* the stylesheets to avoid a flash. It sets `document.documentElement.dataset.theme` from `localStorage['aacmp-theme']` or `prefers-color-scheme`, and wires the `.theme-toggle` button (which ships with `hidden` and is revealed by JS). Every page needs both the head script and the toggle markup.
- **`js/main.js`** (loaded at end of `<body>`, all pages): mobile menu (`aria-expanded`), `IntersectionObserver` adding `.visible` to `.reveal` elements, team-card shuffle (`#shuffle-team` / `#team-grid`, renumbers `.card-index`), and a scroll-spy that toggles `active`/`aria-current` between the `index.html` and `#equipo` nav links. Each feature guards on its elements existing, so the file is safe on every page — keep that pattern.
- **Profile pages** contain an inline script: hovering `#skills-container span[data-hue]` applies a `hue-rotate` filter to `#profile-img img`. It is duplicated in each profile file.
- Accessibility is a stated requirement: keep semantic landmarks, ARIA attributes, `.sr-only` labels, and `prefers-reduced-motion` handling when changing markup/CSS.
