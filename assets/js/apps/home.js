export function renderHome(apps, selectedIndex) {
  return `
    <section class="screen-home">
      <div class="screen-home__hero">
        <div>
          <div class="hero-title">Fk Titan OS</div>
          <div class="hero-sub">Menu d'applications — Aucune app disponible pour le moment.</div>
        </div>
        <div class="hero-chip">Menu</div>
      </div>

      <div class="app-grid">
        ${apps
          .map(
            (app, index) => `
              <button
                class="app-card ${index === selectedIndex ? "is-selected" : ""}"
                data-action="open"
                data-app-id="${app.id}"
                data-index="${index}"
              >
                <span class="app-card__icon">${app.icon}</span>
                <span class="app-card__label">${app.label}</span>
                <span class="app-card__hint">${app.hint}</span>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}
