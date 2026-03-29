export function renderPlaceholder(app) {
  return `
    <section class="app-view">
      <div class="app-view__header">
        <div class="app-view__title">${app.label}</div>
        <div class="app-view__tag">Bientôt disponible</div>
      </div>

      <div class="placeholder-panel">
        <div class="placeholder-icon">${app.icon}</div>
        <div class="placeholder-title">Application non disponible</div>
        <p class="placeholder-text">Cette application sera disponible dans une future mise à jour. Utilisez le bouton retour pour revenir au menu.</p>
      </div>
    </section>
  `;
}
