export const SOFT_KEYS = [
  { main: "y=", second: "stat plot", alpha: "f1" },
  { main: "window", second: "tblset", alpha: "f2" },
  { main: "zoom", second: "format", alpha: "f3" },
  { main: "trace", second: "calc", alpha: "f4" },
  { main: "graph", second: "table", alpha: "f5" }
];

export const APPS = [
  { id: "calculation", label: "Calculation", icon: "∑" },
  { id: "grapher", label: "Grapher", icon: "ƒ" },
  { id: "equations", label: "Equations", icon: "=" },
  { id: "statistics", label: "Statistics", icon: "▤" },
  { id: "regression", label: "Regression", icon: "↗" },
  { id: "distributions", label: "Distributions", icon: "π" },
  { id: "sequences", label: "Sequences", icon: "n" },
  { id: "inference", label: "Inference", icon: "χ" },
  { id: "finance", label: "Finance", icon: "¤" },
  { id: "python", label: "Python", icon: "Py" },
  { id: "matrix", label: "Matrix", icon: "[]" },
  { id: "complex", label: "Complex", icon: "i" },
  { id: "lists", label: "Lists", icon: "L" },
  { id: "programs", label: "Programs", icon: "<>" },
  { id: "geometry", label: "Geometry", icon: "△" },
  { id: "elements", label: "Elements", icon: "H" },
  { id: "settings", label: "Settings", icon: "⚙" },
  { id: "exam", label: "Exam", icon: "!" }
];

export const KEY_ROWS = [
  // Row 1 – system modifiers (6 keys)
  [
    { main: "2nd", type: "accent", action: "meta", value: "2ND", size: "small" },
    { main: "mode", second: "quit", type: "dark", action: "system", value: "mode", secondAction: "system", secondValue: "quit", size: "small" },
    { main: "del", second: "ins", type: "dark", action: "system", value: "del", secondAction: "system", secondValue: "ins", size: "small" },
    { main: "alpha", second: "A-lock", type: "accent", action: "meta", value: "ALPHA", secondAction: "meta", secondValue: "A-LOCK", size: "small" },
    { main: "x,t,θ,n", second: "link", type: "dark", action: "input", value: "x", secondAction: "system", secondValue: "link", size: "small" },
    { main: "stat", second: "list", type: "dark", action: "system", value: "stat", secondAction: "system", secondValue: "list", size: "small" }
  ],
  // Row 2 – menu keys (5 keys)
  [
    { main: "math", second: "test", alpha: "A", type: "dark", action: "system", value: "math", secondAction: "system", secondValue: "test", alphaAction: "input", alphaValue: "A", size: "small" },
    { main: "apps", second: "angle", alpha: "B", type: "dark", action: "system", value: "apps", secondAction: "system", secondValue: "angle", alphaAction: "input", alphaValue: "B", size: "small" },
    { main: "prgm", second: "draw", alpha: "C", type: "dark", action: "system", value: "prgm", secondAction: "system", secondValue: "draw", alphaAction: "input", alphaValue: "C", size: "small" },
    { main: "vars", second: "distr", type: "dark", action: "system", value: "vars", secondAction: "system", secondValue: "distr", size: "small" },
    { main: "clear", type: "dark", action: "system", value: "clear", size: "small" }
  ],
  // Row 3 – trig / calc (6 keys)
  [
    { main: "x⁻¹", second: "matrix", alpha: "D", action: "func", value: "inv", secondAction: "system", secondValue: "matrix", alphaAction: "input", alphaValue: "D", size: "small" },
    { main: "sin", second: "sin⁻¹", alpha: "E", action: "func", value: "sin", secondAction: "func", secondValue: "asin", alphaAction: "input", alphaValue: "E", size: "small" },
    { main: "cos", second: "cos⁻¹", alpha: "F", action: "func", value: "cos", secondAction: "func", secondValue: "acos", alphaAction: "input", alphaValue: "F", size: "small" },
    { main: "tan", second: "tan⁻¹", alpha: "G", action: "func", value: "tan", secondAction: "func", secondValue: "atan", alphaAction: "input", alphaValue: "G", size: "small" },
    { main: "^", second: "π", alpha: "H", action: "input", value: "^", secondAction: "input", secondValue: "π", alphaAction: "input", alphaValue: "H" },
    { main: "x²", second: "√", alpha: "I", action: "input", value: "²", secondAction: "func", secondValue: "sqrt", alphaAction: "input", alphaValue: "I", size: "small" }
  ],
  // Row 4 – punctuation / division (4 keys)
  [
    { main: ",", second: "EE", alpha: "J", type: "dark", action: "input", value: ",", secondAction: "input", secondValue: "EE", alphaAction: "input", alphaValue: "J", size: "small" },
    { main: "(", second: "{", alpha: "K", action: "input", value: "(", secondAction: "input", secondValue: "{", alphaAction: "input", alphaValue: "K" },
    { main: ")", second: "}", alpha: "L", action: "input", value: ")", secondAction: "input", secondValue: "}", alphaAction: "input", alphaValue: "L" },
    { main: "÷", second: "e", alpha: "M", type: "orange", action: "input", value: "÷", secondAction: "input", secondValue: "e", alphaAction: "input", alphaValue: "M" }
  ],
  // Row 5 – log / 7-8-9 / × (5 keys)
  [
    { main: "log", second: "10^x", alpha: "N", action: "func", value: "log", secondAction: "func", secondValue: "10^x", alphaAction: "input", alphaValue: "N", size: "small" },
    { main: "7", second: "u", alpha: "O", type: "light", action: "input", value: "7", secondAction: "input", secondValue: "u", alphaAction: "input", alphaValue: "O" },
    { main: "8", second: "v", alpha: "P", type: "light", action: "input", value: "8", secondAction: "input", secondValue: "v", alphaAction: "input", alphaValue: "P" },
    { main: "9", second: "w", alpha: "Q", type: "light", action: "input", value: "9", secondAction: "input", secondValue: "w", alphaAction: "input", alphaValue: "Q" },
    { main: "×", second: "[", alpha: "R", type: "orange", action: "input", value: "×", secondAction: "input", secondValue: "[", alphaAction: "input", alphaValue: "R" }
  ],
  // Row 6 – ln / 4-5-6 / − (5 keys)
  [
    { main: "ln", second: "e^x", alpha: "S", action: "func", value: "ln", secondAction: "func", secondValue: "e^x", alphaAction: "input", alphaValue: "S", size: "small" },
    { main: "4", second: "L4", alpha: "T", type: "light", action: "input", value: "4", secondAction: "input", secondValue: "L4", alphaAction: "input", alphaValue: "T" },
    { main: "5", second: "L5", alpha: "U", type: "light", action: "input", value: "5", secondAction: "input", secondValue: "L5", alphaAction: "input", alphaValue: "U" },
    { main: "6", second: "L6", alpha: "V", type: "light", action: "input", value: "6", secondAction: "input", secondValue: "L6", alphaAction: "input", alphaValue: "V" },
    { main: "−", second: "]", alpha: "W", type: "orange", action: "input", value: "−", secondAction: "input", secondValue: "]", alphaAction: "input", alphaValue: "W" }
  ],
  // Row 7 – sto / 1-2-3 / + (5 keys)
  [
    { main: "sto→", second: "rcl", alpha: "X", type: "dark", action: "system", value: "sto", secondAction: "system", secondValue: "rcl", alphaAction: "input", alphaValue: "X", size: "small" },
    { main: "1", second: "L1", alpha: "Y", type: "light", action: "input", value: "1", secondAction: "input", secondValue: "L1", alphaAction: "input", alphaValue: "Y" },
    { main: "2", second: "L2", alpha: "Z", type: "light", action: "input", value: "2", secondAction: "input", secondValue: "L2", alphaAction: "input", alphaValue: "Z" },
    { main: "3", second: "L3", alpha: "θ", type: "light", action: "input", value: "3", secondAction: "input", secondValue: "L3", alphaAction: "input", alphaValue: "θ" },
    { main: "+", second: "mem", alpha: "\"", type: "orange", action: "input", value: "+", secondAction: "system", secondValue: "mem", alphaAction: "input", alphaValue: "\"" }
  ],
  // Row 8 – on / 0 / . / neg / enter (5 keys)
  [
    { main: "on", second: "off", type: "dark", action: "power", value: "on", secondAction: "power", secondValue: "off", size: "small" },
    { main: "0", second: "catalog", alpha: "_", type: "light", action: "input", value: "0", secondAction: "system", secondValue: "catalog", alphaAction: "input", alphaValue: "_", width: "wide" },
    { main: ".", second: "i", alpha: ":", action: "input", value: ".", secondAction: "input", secondValue: "i", alphaAction: "input", alphaValue: ":" },
    { main: "(−)", second: "ans", alpha: "?", type: "dark", action: "input", value: "(−)", secondAction: "input", secondValue: "Ans", alphaAction: "input", alphaValue: "?", size: "small" },
    { main: "enter", second: "entry", alpha: "solve", type: "accent", action: "execute", value: "ENTER", secondAction: "system", secondValue: "entry", alphaAction: "system", alphaValue: "solve", size: "small" }
  ]
];
