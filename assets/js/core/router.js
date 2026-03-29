import { APPS } from "../config.js";
import { renderHome } from "../apps/home.js";
import { renderPlaceholder } from "../apps/placeholder.js";
import { renderCalcScreen } from "../apps/calculator.js";

export function renderScreen(screenEl, state) {
  if (!state.powerOn) {
    screenEl.innerHTML = `
      <div class="off-screen">
        <div class="off-screen__text">Fk Titan — standby</div>
      </div>
    `;
    return;
  }

  if (state.route === "home") {
    screenEl.innerHTML = renderHome(APPS, state.selectedApp);
    return;
  }

  if (state.route === "calc") {
    screenEl.innerHTML = renderCalcScreen(state);
    return;
  }

  const app = APPS.find((item) => item.id === state.route) || APPS[0];
  screenEl.innerHTML = renderPlaceholder(app);
}

export function getRouteLabel(route) {
  if (route === "home") return "HOME";
  if (route === "calc") return "CALC";
  const app = APPS.find((item) => item.id === route);
  return app ? app.label.toUpperCase() : "APP";
}

export function getSelectedAppId(index) {
  return APPS[index]?.id || APPS[0].id;
}
