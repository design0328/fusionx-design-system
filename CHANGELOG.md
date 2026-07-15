# Changelog

All notable changes to the FusionX Design System are logged here. Format: date, what changed, why.

## v1.0 — 2026-07-15

Initial version. Proposed, not yet reviewed by the Diamanti team.

- **Color tokens (44 total, locked):** verified against `Diamanti-FusionX-Color-Library-2026.cclibs` by re-parsing the export directly. FusionX Black (`#050809`) confirmed as the single source-of-truth background value, distinct from Corporate Black (`#040708`). Duplicate `SYSTEM - Focus` swatch removed. `BRAND - Blue` renamed to `BRAND - Corporate Blue` for clarity (value unchanged).
- **Icon system:** spec and ~25-icon inventory drafted. Recommended production method: adapt Lucide (open-source) rather than hand-drawing or AI-generating. Nothing built yet — pending sign-off on approach.
- **Imagery system:** hero/cover treatment (layered wireframe terrain, tonal white-to-lime gradation) tested and confirmed against the Utility Buyer Brief cover. Section divider and data-viz background templates specified but not yet generated as a full matching set.
- **Site infrastructure:** static HTML/CSS/JS, no build step, data-driven token and icon pages, ready for GitHub Pages.

## Unreleased / next up

- Build the icon library (Lucide-based) once approach is confirmed.
- Generate section-divider and data-viz-background imagery sets to match the confirmed hero direction.
- Typography page.
- Figma component library.
