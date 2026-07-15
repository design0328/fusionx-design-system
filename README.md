# FusionX Design System

A living, data-driven design system site for Diamanti's FusionX publishing collateral. Plain HTML/CSS/JS, no build step, deployed via GitHub Pages. Color tokens and icon inventory render from JSON files — edit the data, every page updates.

**Status:** v1.0 draft, proposed — not yet shared with the Diamanti team. See `index.html` for context on why this exists.

## Structure

```
/
├── index.html          overview / landing page
├── colors.html          live color token reference (renders from data/tokens.json)
├── icons.html            icon system spec + inventory (renders from data/icons.json)
├── imagery.html          imagery/prompt system + collateral matrix
├── data/
│   ├── tokens.json        SOURCE OF TRUTH for all color tokens
│   └── icons.json         SOURCE OF TRUTH for icon inventory + build status
├── assets/
│   ├── css/style.css       shared site stylesheet
│   ├── js/tokens.js        renders colors.html from tokens.json
│   ├── js/icons.js         renders icons.html from icons.json
│   ├── icons/              (empty) actual icon SVGs land here once built
│   └── images/              (empty) generated/photography assets, organized by role
│       ├── hero-cover/
│       ├── section-divider/
│       └── dataviz-background/
├── CHANGELOG.md
└── README.md
```

## How to evolve this system

**To change a color:** edit `data/tokens.json`. Every page referencing that token updates automatically — no HTML changes needed.

**To update icon status** (mark one as built): edit `data/icons.json`, change `"status": "planned"` to `"status": "built"`. Once real SVGs exist, drop them in `/assets/icons/` and extend `icons.js` to render the actual glyph instead of just a status pill.

**To add a new page:** copy the structure of an existing page (shared header/nav markup, `assets/css/style.css` link) and add a nav link to it in the header of every existing page.

**To add generated imagery:** save into the matching `/assets/images/` subfolder using the naming convention in `imagery.html`, then reference it from that page.

This repo is meant to be worked on with Claude Code in VS Code — point it at this folder and describe the change you want (e.g. "add a Typography page following the same pattern as colors.html").

## Local preview

The color and icon pages fetch JSON at runtime, which browsers block over `file://`. Run a local server from this folder instead:

```bash
# Python (usually preinstalled on macOS)
python3 -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000`.

## Publishing to GitHub Pages

1. Create a new **public** GitHub repo (e.g. `fusionx-design-system`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: FusionX design system v1.0 draft"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Source → Deploy from a branch → `main` / root**.
4. Site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

Every subsequent `git push` to `main` updates the live site automatically — no separate deploy step.

## Sharing with the Diamanti team (later)

The site currently has `<meta name="robots" content="noindex">` on every page and no navigation links to it from anywhere public — it's reachable by direct URL but not discoverable. When it's ready to share:

- Remove the `noindex` meta tags if you want it indexable, or leave them and just share the URL directly (recommended while it's still a proposal, not adopted).
- Send the GitHub Pages URL directly, or invite specific people as collaborators on the GitHub repo if you want them commenting on content via pull requests/issues rather than just viewing.
- If Diamanti later wants this behind their own domain, GitHub Pages supports a custom domain via a `CNAME` file — ask when that's relevant.

## Versioning

Track meaningful changes in `CHANGELOG.md`. Tag releases in git (`git tag v1.0`) once a version is considered stable enough to reference by number in conversation with the team.
