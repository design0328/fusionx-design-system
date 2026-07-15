// Renders the icon inventory from data/icons.json — the single source of truth
// for what's planned vs. built. Flip an icon's "status" to "built" (and add an
// "svg" path once real assets exist) as the library gets produced.

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
          return `
          <div class="icon-row">
            <span>${icon.name}</span>
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
}

renderIcons();
