# Changelog

All notable changes to the FusionX Design System are logged here. Format: date, what changed, why.

## v1.0 — 2026-07-15

Initial version. Proposed, not yet reviewed by the Diamanti team.

- **Color tokens (44 total, locked):** verified against `Diamanti-FusionX-Color-Library-2026.cclibs` by re-parsing the export directly. FusionX Black (`#050809`) confirmed as the single source-of-truth background value, distinct from Corporate Black (`#040708`). Duplicate `SYSTEM - Focus` swatch removed. `BRAND - Blue` renamed to `BRAND - Corporate Blue` for clarity (value unchanged).
- **Icon system:** spec and ~25-icon inventory drafted. Recommended production method: adapt Lucide (open-source) rather than hand-drawing or AI-generating. Nothing built yet — pending sign-off on approach.
- **Imagery system:** hero/cover treatment (layered wireframe terrain, tonal white-to-lime gradation) tested and confirmed against the Utility Buyer Brief cover. Section divider and data-viz background templates specified but not yet generated as a full matching set.
- **Site infrastructure:** static HTML/CSS/JS, no build step, data-driven token and icon pages, ready for GitHub Pages.

## v1.1 — 2026-07-15

- **Icon system:** 24 of 25 icons built, sourced from `lucide-static` (ISC license, ~1,700 icons). Stroke weight standardized from Lucide's default 2px down to FusionX's 1.5px spec across every icon. SVGs use `currentColor` so a single file renders in any token color via CSS; raw files also saved to `assets/icons/` for direct InDesign/Figma placement. `icons.html` now renders live glyphs (click to copy SVG markup) instead of just status pills. Remaining gap: **Hybrid / Multi-cloud** has no direct Lucide match and needs custom drawing; **Kubernetes / Container** currently uses a generic container glyph as a placeholder, not a literal Kubernetes mark.
- Added swatch/icon-card inset ring fix (`assets/css/style.css`) so near-black and near-white tokens stay visible against the site's own dark chrome instead of blending into it.

## Unreleased / next up

- Hand-draw Hybrid/Multi-cloud icon (and a literal K8s mark if brand-accurate Kubernetes iconography is needed) to close out the set at 25/25.
- Generate section-divider and data-viz-background imagery sets to match the confirmed hero direction.
- Typography page.
- Figma component library — build icon components from the same Lucide source rather than separately.
