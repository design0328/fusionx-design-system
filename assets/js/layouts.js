// Renders the layout pattern library from data/layouts.json and wires up the
// family/status filters. Patterns are drafted, not yet audited against real
// InDesign briefs and decks — see layout.html for governance context.

const STATUS_PILL_CLASS = {
  observed: "status-pill--observed",
  candidate: "status-pill--candidate",
  approved: "status-pill--approved",
  deprecated: "status-pill--deprecated",
};

let allPatterns = [];
let statusLabels = {};
let activeFamily = "all";
let activeStatus = "all";

function patternCard(pattern) {
  const statusLabel = statusLabels[pattern.status] || pattern.status;
  const pillClass = STATUS_PILL_CLASS[pattern.status] || "status-pill--observed";

  const bestFor = pattern.bestFor && pattern.bestFor.length
    ? `<div class="pattern-list">
        <span class="pattern-list-label">Best used for</span>
        <ul class="plain">${pattern.bestFor.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>`
    : "";

  const avoid = pattern.avoid && pattern.avoid.length
    ? `<div class="pattern-list">
        <span class="pattern-list-label">Avoid using for</span>
        <ul class="plain">${pattern.avoid.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>`
    : "";

  return `
    <article class="pattern-card" data-family="${pattern.family}" data-status="${pattern.status}">
      <div class="pattern-card-header">
        <span class="mono pattern-card-id">${pattern.id}</span>
        <span class="status-pill ${pillClass}">${statusLabel}</span>
      </div>
      <h3>${pattern.name}</h3>
      <p class="pattern-card-meta mono">${pattern.category} · Density: ${pattern.density}</p>
      <p>${pattern.purpose}</p>
      ${bestFor}
      ${avoid}
    </article>`;
}

function applyFilters() {
  const grid = document.getElementById("pattern-grid");
  const empty = document.getElementById("pattern-empty");
  if (!grid) return;

  const filtered = allPatterns.filter((p) => {
    const familyMatch = activeFamily === "all" || p.family === activeFamily;
    const statusMatch = activeStatus === "all" || p.status === activeStatus;
    return familyMatch && statusMatch;
  });

  grid.innerHTML = filtered.map(patternCard).join("");
  if (empty) {
    empty.hidden = filtered.length !== 0;
  }
}

function setActiveButton(group, button) {
  group.querySelectorAll(".filter-btn").forEach((btn) => {
    const isActive = btn === button;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function wireFilterGroup(groupId, onSelect) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveButton(group, btn);
      onSelect(btn.dataset.value);
      applyFilters();
    });
  });
}

async function renderLayouts() {
  const grid = document.getElementById("pattern-grid");
  if (!grid) return;

  let data;
  try {
    const res = await fetch("data/layouts.json");
    data = await res.json();
  } catch (err) {
    grid.innerHTML =
      '<p style="color:var(--error)">Could not load data/layouts.json — if you\'re opening this file directly (file://), run a local server instead. See README.</p>';
    console.error(err);
    return;
  }

  allPatterns = data.patterns;
  statusLabels = Object.fromEntries(data.statuses.map((s) => [s.id, s.label]));

  applyFilters();

  wireFilterGroup("family-filters", (value) => (activeFamily = value));
  wireFilterGroup("status-filters", (value) => (activeStatus = value));
}

renderLayouts();
