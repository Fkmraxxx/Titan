export function renderPlaceholder(app, buffer) {
  return `
    <section class="app-view">
      <div class="app-view__header">
        <div class="app-view__title">${app.label}</div>
        <div class="app-view__tag">Scaffold ready</div>
      </div>

      <div class="placeholder-panel">
        <div class="placeholder-title">Module vide pour l'instant</div>
        <p class="placeholder-text">La coque, la navigation, le clavier et la structure modulaire sont prêts. Cette app attend son moteur métier.</p>
        <ul class="placeholder-list">
          <li>vue dédiée à construire</li>
          <li>actions clavier à mapper</li>
          <li>logique / calculs à brancher</li>
          <li>sauvegarde d'état à ajouter</li>
        </ul>
      </div>

      <div class="placeholder-console">
        <div class="console-label">Input preview</div>
        <div class="console-line">${buffer || "_"}</div>
      </div>
    </section>
  `;
}
