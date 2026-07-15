// Renders the color token page from data/tokens.json — the single source of truth.
// To evolve the palette: edit data/tokens.json only. This file never needs to change
// unless the data shape itself changes.

async function renderTokens() {
  const container = document.getElementById("token-groups");
  if (!container) return;

  let data;
  try {
    const res = await fetch("data/tokens.json");
    data = await res.json();
  } catch (err) {
    container.innerHTML =
      '<p style="color:var(--error)">Could not load data/tokens.json — if you\'re opening this file directly (file://), run a local server instead. See README.</p>';
    console.error(err);
    return;
  }

  container.innerHTML = data.groups
    .map((group) => {
      const note = group.note
        ? `<p class="token-group-note">${group.note}</p>`
        : "";
      const swatches = group.tokens
        .map(
          (t) => `
        <div class="swatch-card" data-hex="${t.hex}" title="Click to copy ${t.hex}">
          <div class="swatch-fill" style="background:${t.hex}"></div>
          <div class="swatch-meta">
            <div class="swatch-name">${t.name}</div>
            <div class="swatch-hex">
              <span>${t.hex}</span>
              <span class="copy-hint">copy</span>
            </div>
          </div>
        </div>`
        )
        .join("");

      return `
        <section class="token-group">
          <div class="token-group-header">
            <h3>${group.name}</h3>
          </div>
          ${note}
          <div class="grid grid-4">${swatches}</div>
        </section>`;
    })
    .join("");

  container.querySelectorAll(".swatch-card").forEach((card) => {
    card.addEventListener("click", async () => {
      const hex = card.dataset.hex;
      try {
        await navigator.clipboard.writeText(hex);
        card.classList.add("copied");
        const hint = card.querySelector(".copy-hint");
        const original = hint.textContent;
        hint.textContent = "copied!";
        setTimeout(() => {
          card.classList.remove("copied");
          hint.textContent = original;
        }, 1200);
      } catch (err) {
        console.warn("Clipboard write failed", err);
      }
    });
  });
}

renderTokens();
