import { APPS, KEY_ROWS, SOFT_KEYS } from "./config.js";
import { renderKeypad, renderSoftkeys, setStatus } from "./core/display.js";
import { renderScreen, getRouteLabel } from "./core/router.js";
import { bindCalculatorControls } from "./core/keyboard.js";

const state = {
  powerOn: true,
  route: "calc",
  selectedApp: 0,
  buffer: "",
  message: "SYSTEM READY",
  calcHistory: [],
  ans: 0,
  shiftActive: false,
  alphaActive: false,
  alphaLock: false
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

  // Update softkey labels based on 2ND/ALPHA state
  updateSoftkeyLabels(refs.softkeys, state);
  updateKeypadIndicators(refs.keypad, state);
}

function updateSoftkeyLabels(softkeyContainer, state) {
  const softkeys = softkeyContainer.querySelectorAll(".softkey");
  softkeys.forEach((sk) => {
    const mainSpan = sk.querySelector(".softkey__main");
    const secondSpan = sk.querySelector(".softkey__second");
    const alphaSpan = sk.querySelector(".softkey__alpha");
    if (!mainSpan) return;

    if (state.shiftActive && secondSpan) {
      mainSpan.style.display = "none";
      secondSpan.style.display = "block";
      secondSpan.style.position = "static";
      secondSpan.style.transform = "none";
      if (alphaSpan) alphaSpan.style.display = "none";
    } else if (state.alphaActive && alphaSpan) {
      mainSpan.style.display = "none";
      if (secondSpan) secondSpan.style.display = "none";
      alphaSpan.style.display = "block";
      alphaSpan.style.position = "static";
      alphaSpan.style.transform = "none";
    } else {
      mainSpan.style.display = "";
      if (secondSpan) { secondSpan.style.display = "none"; }
      if (alphaSpan) { alphaSpan.style.display = "none"; }
    }
  });
}

function updateKeypadIndicators(keypadContainer, state) {
  keypadContainer.querySelectorAll(".key__second").forEach((el) => {
    el.classList.toggle("glow", state.shiftActive);
  });
  keypadContainer.querySelectorAll(".key__alpha").forEach((el) => {
    el.classList.toggle("glow", state.alphaActive);
  });
}

renderSoftkeys(refs.softkeys, SOFT_KEYS);
renderKeypad(refs.keypad, KEY_ROWS);
bindCalculatorControls(document, state, update);
update();
