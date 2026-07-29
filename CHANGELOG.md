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

## v1.2 — 2026-07-16

- **Typography:** added, transcribed directly from the FX-* paragraph styles in `FusionX_GEV_Sales_Brief_v2.indd` — a real shipping brief, not designed fresh. Three font roles: **Montserrat** (headline/label — synced via Adobe Fonts, not locally embedded, so team members need it activated in Creative Cloud), **Libre Franklin** (body/reading, variable font, locally embedded), **JetBrains Mono** (stat/data callouts, variable font, locally embedded). All 8 styles (FX-H1, FX-H2, FX-section label, FX-subhead, FX-Body, FX-Body3, FX-Caption, FX-Stat) documented with exact size/leading/tracking on `typography.html`. `FX-H2` flagged for a sanity check — it's set at 10pt, the same point size as body copy, differentiated only by font family and weight rather than size, which is unusual for a heading level.
- **Site chrome re-skinned to match:** the site itself was using placeholder fonts (Inter/Space Grotesk/IBM Plex Mono) that didn't match production. Swapped to the real pairing (Montserrat/Libre Franklin/JetBrains Mono) across every page so the site now demonstrates the system it documents instead of contradicting it.

## v1.3 — 2026-07-29

- **Icon system:** added PNG exports for all 70 built icons — 24px, 128px, and 512px, transparent background, generated per color variant (`on-dark/`, `on-light/`, `accent-green/`) via macOS `sips` from the existing SVGs. The base `assets/icons/*.svg` set (which uses `currentColor`) has no PNG equivalent since there's no concrete color to rasterize outside a browser.

## Unreleased / next up

- Hand-draw Hybrid/Multi-cloud icon (and a literal K8s mark if brand-accurate Kubernetes iconography is needed) to close out the icon set at 25/25.
- Generate section-divider and data-viz-background imagery sets to match the confirmed hero direction.
- Confirm FX-H2 sizing is intentional.
- Figma component library — build icon and type components from the same sources (Lucide, the FX-* paragraph styles) rather than separately.
