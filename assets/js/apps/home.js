export function renderHome(apps, selectedIndex) {
  const pageSize = 9;
  const currentPage = Math.floor(selectedIndex / pageSize);
  const totalPages = Math.ceil(apps.length / pageSize);
  const startIdx = currentPage * pageSize;
  const endIdx = Math.min(startIdx + pageSize, apps.length);
  const visibleApps = apps.slice(startIdx, endIdx);

  return `
    <section class="screen-home">
      <div class="screen-home__hero">
        <div>
          <div class="hero-title">Fk Titan OS</div>
          <div class="hero-sub">${apps.length} apps — Page ${currentPage + 1}/${totalPages}</div>
        </div>
        <div class="hero-chip">Menu</div>
      </div>

      <div class="app-grid">
        ${visibleApps
          .map(
            (app, i) => {
              const realIndex = startIdx + i;
              return `
                <button
                  class="app-card ${realIndex === selectedIndex ? "is-selected" : ""}"
                  data-action="open"
                  data-app-id="${app.id}"
                  data-index="${realIndex}"
                >
                  <span class="app-card__icon">${app.icon}</span>
                  <span class="app-card__label">${app.label}</span>
                </button>
              `;
            }
          )
          .join("")}
      </div>

      <div class="screen-home__pages">
        ${Array.from({length: totalPages}, (_, i) =>
          `<span class="page-dot${i === currentPage ? " active" : ""}"></span>`
        ).join("")}
      </div>
    </section>
  `;
}
