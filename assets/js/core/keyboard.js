import { APPS } from "../config.js";
import { getSelectedAppId } from "./router.js";
import { evaluateExpression, formatResult } from "../apps/calculator.js";

const HOME_COLUMNS = 3;

export function bindCalculatorControls(root, state, update) {
  root.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    const action = target.dataset.action;
    const value = target.dataset.value;
    const appId = target.dataset.appId;

    // App card click
    if (appId) {
      state.route = appId;
      state.message = `APP: ${appId.toUpperCase()}`;
      update();
      return;
    }

    switch (action) {
      case "input":
        if (!state.powerOn) return;
        handleInput(state, value);
        break;

      case "func":
        if (!state.powerOn) return;
        handleFunction(state, value);
        break;

      case "execute":
        if (!state.powerOn) return;
        handleExecute(state);
        break;

      case "system":
        if (!state.powerOn && value !== "power") return;
        handleSystem(state, value);
        break;

      case "meta":
        if (!state.powerOn) return;
        handleMeta(state, value);
        break;

      case "power":
        state.powerOn = !state.powerOn;
        state.message = state.powerOn ? "SYSTEM READY" : "POWER OFF";
        break;

      case "home":
        if (!state.powerOn) return;
        state.route = "home";
        state.message = "MENU";
        break;

      case "back":
        if (!state.powerOn) return;
        if (state.route !== "home" && state.route !== "calc") {
          state.route = "home";
        } else if (state.route === "home") {
          state.route = "calc";
        }
        state.message = "BACK";
        break;

      case "ok":
        if (!state.powerOn) return;
        if (state.route === "home") {
          state.route = getSelectedAppId(state.selectedApp);
          state.message = `APP: ${state.route.toUpperCase()}`;
        } else if (state.route === "calc") {
          handleExecute(state);
        }
        break;

      case "open":
        if (!state.powerOn) return;
        state.route = value;
        state.message = `APP: ${value.toUpperCase()}`;
        break;

      default:
        break;
    }

    update();
  });

  // D-pad navigation
  root.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!state.powerOn) return;
      if (state.route === "home") {
        moveSelection(state, button.dataset.nav);
        state.message = `→ ${APPS[state.selectedApp].label.toUpperCase()}`;
      }
      update();
    });
  });

  // Physical keyboard support
  window.addEventListener("keydown", (event) => {
    if (!state.powerOn && event.key !== "p") return;

    // Navigation on home screen
    if (state.route === "home") {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
        const dir = event.key.replace("Arrow", "").toLowerCase();
        moveSelection(state, dir);
        state.message = `→ ${APPS[state.selectedApp].label.toUpperCase()}`;
        update();
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        state.route = getSelectedAppId(state.selectedApp);
        state.message = `APP: ${state.route.toUpperCase()}`;
        update();
        return;
      }
    }

    // Calculator keyboard input
    if (state.route === "calc") {
      if (event.key === "Enter") {
        event.preventDefault();
        handleExecute(state);
        update();
        return;
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        state.buffer = state.buffer.slice(0, -1);
        state.message = "DEL";
        update();
        return;
      }
      if (event.key === "Delete") {
        event.preventDefault();
        state.buffer = "";
        state.message = "CLEARED";
        update();
        return;
      }
      // Number and operator input
      const keyMap = {
        "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
        "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
        ".": ".", "+": "+", "-": "−", "*": "×", "/": "÷",
        "(": "(", ")": ")", "^": "^", "%": "%"
      };
      if (keyMap[event.key]) {
        event.preventDefault();
        state.buffer += keyMap[event.key];
        state.message = `INPUT ${keyMap[event.key]}`;
        update();
        return;
      }
    }

    if (event.key === "Escape") {
      event.preventDefault();
      if (state.route !== "home" && state.route !== "calc") {
        state.route = "home";
      } else if (state.route === "home") {
        state.route = "calc";
      }
      state.message = "BACK";
      update();
      return;
    }

    if (event.key.toLowerCase() === "h") {
      if (state.route === "calc" && state.buffer) return; // Don't capture h when typing
      event.preventDefault();
      state.route = "home";
      state.message = "MENU";
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

function handleInput(state, value) {
  // Ensure we're in calc mode for input
  if (state.route !== "calc") {
    state.route = "calc";
  }

  if (value === "Ans") {
    state.buffer += "Ans";
    state.message = "ANS";
  } else if (value === "(−)") {
    state.buffer += "(−)";
    state.message = "NEG";
  } else {
    state.buffer += value;
    state.message = `INPUT ${value}`;
  }

  // Clear meta modes after input
  state.shiftActive = false;
  state.alphaActive = false;
}

function handleFunction(state, funcName) {
  if (state.route !== "calc") {
    state.route = "calc";
  }

  state.buffer += `${funcName}(`;
  state.message = `${funcName.toUpperCase()}(`;
  state.shiftActive = false;
  state.alphaActive = false;
}

function handleExecute(state) {
  if (!state.buffer.trim()) {
    state.message = "EMPTY";
    return;
  }

  try {
    const result = evaluateExpression(state.buffer, state.ans);
    const formatted = formatResult(result);
    state.calcHistory.push({
      expr: state.buffer,
      result: formatted
    });
    state.ans = result;
    state.message = `= ${formatted}`;
    state.buffer = "";
  } catch (err) {
    state.calcHistory.push({
      expr: state.buffer,
      error: err.message || "Erreur"
    });
    state.message = "ERREUR";
    state.buffer = "";
  }

  // Keep history manageable
  if (state.calcHistory.length > 50) {
    state.calcHistory = state.calcHistory.slice(-50);
  }
}

function handleSystem(state, value) {
  switch (value) {
    case "clear":
      state.buffer = "";
      state.message = "CLEARED";
      break;
    case "del":
      if (state.buffer.length > 0) {
        state.buffer = state.buffer.slice(0, -1);
        state.message = "DEL";
      }
      break;
    case "mode":
      state.message = "MODE";
      break;
    case "sto":
      state.message = "STO→";
      break;
    case "stat":
      state.message = "STAT";
      break;
    case "math":
      state.message = "MATH";
      break;
    default:
      state.message = `${String(value).toUpperCase()}`;
      break;
  }
}

function handleMeta(state, value) {
  if (value === "2ND") {
    state.shiftActive = !state.shiftActive;
    state.message = state.shiftActive ? "2ND ON" : "2ND OFF";
  } else if (value === "ALPHA") {
    state.alphaActive = !state.alphaActive;
    state.message = state.alphaActive ? "ALPHA ON" : "ALPHA OFF";
  }
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
