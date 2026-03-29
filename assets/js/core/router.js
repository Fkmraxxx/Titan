import { APPS } from "../config.js";
import { renderHome } from "../apps/home.js";
import { renderPlaceholder } from "../apps/placeholder.js";
import { renderCalcScreen } from "../apps/calculator.js";
import { render as renderCalculation } from "../apps/calculation.js";
import { render as renderGrapher } from "../apps/grapher.js";
import { render as renderEquations } from "../apps/equations.js";
import { render as renderStatistics } from "../apps/statistics.js";
import { render as renderRegression } from "../apps/regression.js";
import { render as renderDistributions } from "../apps/distributions.js";
import { render as renderSequences } from "../apps/sequences.js";
import { render as renderInference } from "../apps/inference.js";
import { render as renderFinance } from "../apps/finance.js";
import { render as renderPython } from "../apps/python.js";
import { render as renderMatrix } from "../apps/matrix.js";
import { render as renderComplex } from "../apps/complex.js";
import { render as renderLists } from "../apps/lists.js";
import { render as renderPrograms } from "../apps/programs.js";
import { render as renderGeometry } from "../apps/geometry.js";
import { render as renderElements } from "../apps/elements.js";
import { render as renderSettings } from "../apps/settings.js";
import { render as renderExam, renderExamBlock } from "../apps/exam.js";

const APP_RENDERERS = {
  calculation:   renderCalculation,
  grapher:       renderGrapher,
  equations:     renderEquations,
  statistics:    renderStatistics,
  regression:    renderRegression,
  distributions: renderDistributions,
  sequences:     renderSequences,
  inference:     renderInference,
  finance:       renderFinance,
  python:        renderPython,
  matrix:        renderMatrix,
  complex:       renderComplex,
  lists:         renderLists,
  programs:      renderPrograms,
  geometry:      renderGeometry,
  elements:      renderElements,
  settings:      renderSettings,
  exam:          renderExam,
};

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

  const route = state.route;

  // Vérification du mode examen pour les apps restreintes
  if (renderExamBlock(screenEl, route)) return;

  const renderer = APP_RENDERERS[route];
  if (renderer) {
    renderer(screenEl, state);
    return;
  }

  const app = APPS.find((item) => item.id === route) || APPS[0];
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
