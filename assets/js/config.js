export const SOFT_KEYS = ["Y=", "Window", "Zoom", "Trace", "Graph"];

export const APPS = [
  { id: "calculation", label: "Calculation", icon: "∑", hint: "Bientôt disponible" },
  { id: "grapher", label: "Grapher", icon: "ƒ", hint: "Bientôt disponible" },
  { id: "equations", label: "Equations", icon: "=", hint: "Bientôt disponible" },
  { id: "statistics", label: "Statistics", icon: "▤", hint: "Bientôt disponible" },
  { id: "regression", label: "Regression", icon: "↗", hint: "Bientôt disponible" },
  { id: "distributions", label: "Distributions", icon: "π", hint: "Bientôt disponible" },
  { id: "sequences", label: "Sequences", icon: "n", hint: "Bientôt disponible" },
  { id: "inference", label: "Inference", icon: "χ", hint: "Bientôt disponible" },
  { id: "finance", label: "Finance", icon: "¤", hint: "Bientôt disponible" },
  { id: "python", label: "Python", icon: "Py", hint: "Bientôt disponible" },
  { id: "matrix", label: "Matrix", icon: "[]", hint: "Bientôt disponible" },
  { id: "complex", label: "Complex", icon: "i", hint: "Bientôt disponible" },
  { id: "lists", label: "Lists", icon: "L", hint: "Bientôt disponible" },
  { id: "programs", label: "Programs", icon: "<>", hint: "Bientôt disponible" },
  { id: "geometry", label: "Geometry", icon: "△", hint: "Bientôt disponible" },
  { id: "elements", label: "Elements", icon: "H", hint: "Bientôt disponible" },
  { id: "settings", label: "Settings", icon: "⚙", hint: "Bientôt disponible" },
  { id: "exam", label: "Exam", icon: "!", hint: "Bientôt disponible" }
];

export const KEY_ROWS = [
  [
    { main: "2nd", type: "accent", action: "meta", value: "2ND", size: "small" },
    { main: "alpha", sub: "A-LOCK", type: "accent", action: "meta", value: "ALPHA", size: "small" },
    { main: "x,t,θ,n", type: "dark", action: "input", value: "x", size: "small" },
    { main: "stat", sub: "list", type: "dark", action: "system", value: "stat", size: "small" },
    { main: "math", sub: "test", type: "dark", action: "system", value: "math", size: "small" },
    { main: "apps", sub: "menu", type: "dark", action: "home", value: "home", size: "small" }
  ],
  [
    { main: "x⁻¹", sub: "MATRIX", action: "input", value: "⁻¹", size: "small" },
    { main: "sin", sub: "sin⁻¹", action: "func", value: "sin", size: "small" },
    { main: "cos", sub: "cos⁻¹", action: "func", value: "cos", size: "small" },
    { main: "tan", sub: "tan⁻¹", action: "func", value: "tan", size: "small" },
    { main: "^", sub: "π", action: "input", value: "^" },
    { main: "x²", sub: "√", action: "input", value: "²", size: "small" }
  ],
  [
    { main: "log", sub: "10ˣ", action: "func", value: "log", size: "small" },
    { main: "ln", sub: "eˣ", action: "func", value: "ln", size: "small" },
    { main: "sto→", sub: "RCL", type: "dark", action: "system", value: "sto", size: "small" },
    { main: "(", action: "input", value: "(" },
    { main: ")", action: "input", value: ")" },
    { main: "÷", type: "orange", action: "input", value: "÷" }
  ],
  [
    { main: "MODE", sub: "QUIT", type: "dark", action: "system", value: "mode", size: "small" },
    { main: "DEL", sub: "INS", type: "dark", action: "system", value: "del", size: "small" },
    { main: ",", sub: "EE", type: "dark", action: "input", value: ",", size: "small" },
    { main: "7", type: "light", action: "input", value: "7" },
    { main: "8", type: "light", action: "input", value: "8" },
    { main: "9", type: "light", action: "input", value: "9" }
  ],
  [
    { main: "×", type: "orange", action: "input", value: "×" },
    { main: "CLEAR", type: "dark", action: "system", value: "clear", size: "small" },
    { main: "%", action: "input", value: "%", size: "small" },
    { main: "4", type: "light", action: "input", value: "4" },
    { main: "5", type: "light", action: "input", value: "5" },
    { main: "6", type: "light", action: "input", value: "6" }
  ],
  [
    { main: "−", type: "orange", action: "input", value: "−" },
    { main: "Ans", type: "dark", action: "input", value: "Ans", size: "small" },
    { main: "π", action: "input", value: "π", size: "small" },
    { main: "1", type: "light", action: "input", value: "1" },
    { main: "2", type: "light", action: "input", value: "2" },
    { main: "3", type: "light", action: "input", value: "3" }
  ],
  [
    { main: "+", type: "orange", action: "input", value: "+" },
    { main: "(−)", type: "dark", action: "input", value: "(−)", size: "small" },
    { main: ".", action: "input", value: ".", size: "small" },
    { main: "0", type: "light", action: "input", value: "0", width: "wide" },
    { main: "ENTER", type: "accent", action: "execute", value: "ENTER", size: "small" }
  ]
];
