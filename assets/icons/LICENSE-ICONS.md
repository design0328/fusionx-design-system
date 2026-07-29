# Icon Source & License

Icons in this folder are sourced from [Lucide](https://lucide.dev), a maintained open-source icon set (ISC license — free for personal and commercial use, no attribution required). We're including this note as good practice, not because it's legally mandatory.

Original Lucide files were modified before inclusion here:
- Default `class` attribute removed
- Stroke width standardized from Lucide's default `2` to `1.5`, per the FusionX icon spec (see `icons.html`)

`Hybrid / Multi-cloud` has no source file here — it has no direct Lucide equivalent and needs custom drawing on the same grid/stroke spec.

## PNG exports

Each color variant folder (`on-dark/`, `on-light/`, `accent-green/`) has a `png/` subfolder with rasterized copies at 24px, 128px, and 512px — e.g. `on-light/png/512/activity.png`. Transparent background, same filenames as the source SVGs. Generated directly from these SVGs via macOS `sips`; regenerate if a source SVG changes.

There's no PNG export of the base `assets/icons/*.svg` files — those use `stroke="currentColor"`, which only resolves to a real color in a browser/CSS context, so there's nothing meaningful to rasterize until a color is picked. Use one of the three color variants instead.

Lucide ISC license text: https://github.com/lucide-icons/lucide/blob/main/LICENSE
