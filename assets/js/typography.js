// Renders live type specimens from data/typography.json — transcribed directly
// from the FX-* paragraph styles in production InDesign files, not designed here.
// To update a spec, edit the JSON; this file doesn't need to change.

const SAMPLE_TEXT = "One platform. AI inside the fence.";

const FONT_STACKS = {
  "Montserrat": "'Montserrat', sans-serif",
  "Libre Franklin": "'Libre Franklin', sans-serif",
  "JetBrains Mono": "'JetBrains Mono', monospace",
};

async function renderTypography() {
  const rolesContainer = document.getElementById("font-roles");
  const specimenContainer = document.getElementById("type-specimens");
  if (!rolesContainer && !specimenContainer) return;

  let data;
  try {
    const res = await fetch("data/typography.json");
    data = await res.json();
  } catch (err) {
    if (specimenContainer) {
      specimenContainer.innerHTML =
        '<p style="color:var(--error)">Could not load data/typography.json — if you\'re opening this file directly (file://), run a local server instead. See README.</p>';
    }
    console.error(err);
    return;
  }

  if (rolesContainer) {
    rolesContainer.innerHTML = data.fontRoles
      .map(
        (r) => `
      <div class="card">
        <h3 style="font-family:${FONT_STACKS[r.family]}">${r.family}</h3>
        <p class="mono" style="font-size:0.75rem;color:var(--accent);margin-bottom:10px;">${r.role.toUpperCase()}</p>
        <p style="margin-bottom:0;font-size:0.85rem;">${r.note}</p>
      </div>`
      )
      .join("");
  }

  if (specimenContainer) {
    specimenContainer.innerHTML = data.styles
      .map((s) => {
        const flag = s.flag
          ? `<span class="status-pill status-planned" style="margin-left:8px;">check spec</span>`
          : "";
        const weightMap = {
          Bold: 700,
          SemiBold: 600,
          Regular: 400,
          Light: 300,
          ExtraBold: 800,
        };
        const weight = weightMap[s.style] || 400;
        const transform = s.case === "All Caps" ? "uppercase" : "none";
        const letterSpacing = `${s.tracking / 1000}em`;
        return `
        <div class="type-specimen">
          <div class="type-specimen-meta">
            <span class="type-specimen-name">${s.name}${flag}</span>
            <span class="mono" style="font-size:0.75rem;color:var(--text-secondary);">
              ${s.family} · ${s.style} · ${s.size} / ${s.leading} · tracking ${s.tracking}
            </span>
          </div>
          <div class="type-specimen-preview" style="
            font-family:${FONT_STACKS[s.family]};
            font-weight:${weight};
            font-size:${s.size};
            text-transform:${transform};
            letter-spacing:${letterSpacing};
          ">${SAMPLE_TEXT}</div>
          <p class="type-specimen-usage">${s.usage}</p>
        </div>`;
      })
      .join("");
  }
}

renderTypography();
