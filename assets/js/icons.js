// Renders the icon inventory from data/icons.json — the single source of truth
// for what's planned vs. built. Built icons carry real Lucide-sourced SVG markup
// (stroke normalized to the FusionX 1.5px spec) in the "svg" field, plus a
// "lucideSlug" pointing at the matching file saved in assets/icons/. Icons with
// no direct Lucide equivalent stay "planned" with a "note" explaining why.

async function renderIcons() {
  const container = document.getElementById("icon-categories");
  if (!container) return;

  let data;
  try {
    const res = await fetch("data/icons.json");
    data = await res.json();
  } catch (err) {
    container.innerHTML =
      '<p style="color:var(--error)">Could not load data/icons.json — if you\'re opening this file directly (file://), run a local server instead. See README.</p>';
    console.error(err);
    return;
  }

  const totalIcons = data.categories.reduce((sum, c) => sum + c.icons.length, 0);
  const builtIcons = data.categories.reduce(
    (sum, c) => sum + c.icons.filter((i) => i.status === "built").length,
    0
  );
  const progress = document.getElementById("icon-progress");
  if (progress) {
    progress.textContent = `${builtIcons} / ${totalIcons} built`;
  }

  container.innerHTML = data.categories
    .map((cat) => {
      const rows = cat.icons
        .map((icon) => {
          const isBuilt = icon.status === "built";
          const pillClass = isBuilt ? "status-built" : "status-planned";
          const label = isBuilt ? "Built" : "Planned";
          const glyph = isBuilt
            ? `<span class="icon-glyph">${icon.svg}</span>`
            : `<span class="icon-glyph icon-glyph--empty">?</span>`;
          const noteAttr = icon.note
            ? ` title="${icon.note.replace(/"/g, "&quot;")}"`
            : "";
          const copyAttr = isBuilt ? ` data-svg="${encodeURIComponent(icon.svg)}"` : "";
          return `
          <div class="icon-row${isBuilt ? " icon-row--copyable" : ""}"${noteAttr}${copyAttr}>
            ${glyph}
            <span class="icon-row-name">${icon.name}</span>
            <span class="status-pill ${pillClass}">${label}</span>
          </div>`;
        })
        .join("");
      return `
        <section class="icon-category">
          <h3>${cat.name}</h3>
          <div class="icon-list">${rows}</div>
        </section>`;
    })
    .join("");

  container.querySelectorAll(".icon-row--copyable").forEach((row) => {
    row.addEventListener("click", async () => {
      const svg = decodeURIComponent(row.dataset.svg);
      try {
        await navigator.clipboard.writeText(svg);
        const pill = row.querySelector(".status-pill");
        const original = pill.textContent;
        pill.textContent = "Copied!";
        setTimeout(() => (pill.textContent = original), 1200);
      } catch (err) {
        console.warn("Clipboard write failed", err);
      }
    });
  });
}

renderIcons();
