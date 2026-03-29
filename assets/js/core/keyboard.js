import { APPS } from "../config.js";
import { getSelectedAppId } from "./router.js";

const HOME_COLUMNS = 3;

export function bindCalculatorControls(root, state, update) {
  root.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    const action = target.dataset.action;
    const value = target.dataset.value;
    const appId = target.dataset.appId;

    if (appId) {
      state.route = appId;
      state.message = `OPEN ${appId.toUpperCase()}`;
      update();
      return;
    }

    switch (action) {
      case "input":
        if (!state.powerOn) return;
        state.buffer += value;
        state.message = `INPUT ${value}`;
        break;
      case "execute":
        if (!state.powerOn) return;
        state.message = state.buffer ? `EXEC ${state.buffer}` : "EXEC";
        break;
      case "system":
        if (value === "clear") {
          state.buffer = "";
          state.message = "BUFFER CLEARED";
        } else {
          state.message = `${String(value).toUpperCase()} READY`;
        }
        break;
      case "meta":
        state.message = `${value} ARMED`;
        break;
      case "power":
        state.powerOn = !state.powerOn;
        state.message = state.powerOn ? "SYSTEM READY" : "POWER OFF";
        break;
      case "home":
        if (!state.powerOn) return;
        state.route = "home";
        state.message = "HOME";
        break;
      case "back":
        if (!state.powerOn) return;
        state.route = "home";
        state.message = "BACK";
        break;
      case "ok":
        if (!state.powerOn) return;
        if (state.route === "home") {
          state.route = getSelectedAppId(state.selectedApp);
          state.message = `OPEN ${state.route.toUpperCase()}`;
        } else {
          state.message = "OK";
        }
        break;
      case "open":
        if (!state.powerOn) return;
        state.route = value;
        state.message = `OPEN ${value.toUpperCase()}`;
        break;
      default:
        break;
    }

    update();
  });

  root.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!state.powerOn || state.route !== "home") return;
      moveSelection(state, button.dataset.nav);
      state.message = `SELECT ${APPS[state.selectedApp].label.toUpperCase()}`;
      update();
    });
  });

  window.addEventListener("keydown", (event) => {
    if (!state.powerOn && event.key !== "p") return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (state.route === "home") moveSelection(state, "up");
      update();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (state.route === "home") moveSelection(state, "down");
      update();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (state.route === "home") moveSelection(state, "left");
      update();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (state.route === "home") moveSelection(state, "right");
      update();
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (state.route === "home") {
        state.route = getSelectedAppId(state.selectedApp);
        state.message = `OPEN ${state.route.toUpperCase()}`;
      } else {
        state.message = state.buffer ? `EXEC ${state.buffer}` : "EXEC";
      }
      update();
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      state.route = "home";
      state.message = "BACK";
      update();
      return;
    }
    if (event.key.toLowerCase() === "h") {
      event.preventDefault();
      state.route = "home";
      state.message = "HOME";
      update();
      return;
    }
    if (event.key.toLowerCase() === "p") {
      event.preventDefault();
      state.powerOn = !state.powerOn;
      state.message = state.powerOn ? "SYSTEM READY" : "POWER OFF";
      update();
    }
  });
}

function moveSelection(state, direction) {
  const total = APPS.length;
  const row = Math.floor(state.selectedApp / HOME_COLUMNS);
  const col = state.selectedApp % HOME_COLUMNS;

  let nextRow = row;
  let nextCol = col;

  if (direction === "up") nextRow -= 1;
  if (direction === "down") nextRow += 1;
  if (direction === "left") nextCol -= 1;
  if (direction === "right") nextCol += 1;

  const maxRow = Math.floor((total - 1) / HOME_COLUMNS);
  nextRow = Math.max(0, Math.min(maxRow, nextRow));
  nextCol = Math.max(0, Math.min(HOME_COLUMNS - 1, nextCol));

  let nextIndex = nextRow * HOME_COLUMNS + nextCol;
  if (nextIndex >= total) nextIndex = total - 1;
  state.selectedApp = nextIndex;
}
