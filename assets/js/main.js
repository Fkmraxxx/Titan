import { APPS, KEY_ROWS, SOFT_KEYS } from "./config.js";
import { renderKeypad, renderSoftkeys, setStatus } from "./core/display.js";
import { renderScreen, getRouteLabel } from "./core/router.js";
import { bindCalculatorControls } from "./core/keyboard.js";

const state = {
  powerOn: true,
  route: "home",
  selectedApp: 0,
  buffer: "",
  message: "SYSTEM READY"
};

const refs = {
  screen: document.getElementById("screen"),
  keypad: document.getElementById("keypad"),
  softkeys: document.getElementById("softkeys"),
  metaMode: document.getElementById("metaMode"),
  metaStatus: document.getElementById("metaStatus"),
  screenLed: document.getElementById("screenLed")
};

function update() {
  renderScreen(refs.screen, state, APPS);
  setStatus(
    refs.metaMode,
    refs.metaStatus,
    refs.screenLed,
    getRouteLabel(state.route),
    state.message,
    state.powerOn
  );
}

renderSoftkeys(refs.softkeys, SOFT_KEYS);
renderKeypad(refs.keypad, KEY_ROWS);
bindCalculatorControls(document, state, update);
update();
