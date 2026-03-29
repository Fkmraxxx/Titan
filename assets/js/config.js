export const SOFT_KEYS = ["Y=", "Window", "Zoom", "Trace", "Graph"];

export const APPS = [
  { id: "calculation", label: "Calculation", icon: "∑", hint: "scientifique" },
  { id: "grapher", label: "Grapher", icon: "ƒ", hint: "courbes" },
  { id: "equations", label: "Equations", icon: "=", hint: "solveur" },
  { id: "statistics", label: "Statistics", icon: "▤", hint: "données" },
  { id: "regression", label: "Regression", icon: "↗", hint: "modèles" },
  { id: "distributions", label: "Distributions", icon: "π", hint: "probas" },
  { id: "sequences", label: "Sequences", icon: "n", hint: "suites" },
  { id: "inference", label: "Inference", icon: "χ", hint: "tests" },
  { id: "finance", label: "Finance", icon: "¤", hint: "intérêts" },
  { id: "python", label: "Python", icon: "Py", hint: "scripts" },
  { id: "matrix", label: "Matrix", icon: "[]", hint: "matrices" },
  { id: "complex", label: "Complex", icon: "i", hint: "complexes" },
  { id: "lists", label: "Lists", icon: "L", hint: "listes" },
  { id: "programs", label: "Programs", icon: "<>", hint: "modules" },
  { id: "geometry", label: "Geometry", icon: "△", hint: "formes" },
  { id: "elements", label: "Elements", icon: "H", hint: "périodique" },
  { id: "settings", label: "Settings", icon: "⚙", hint: "système" },
  { id: "exam", label: "Exam", icon: "!", hint: "mode test" }
];

export const KEY_ROWS = [
  [
    { main: "shift", type: "accent", action: "meta", value: "SHIFT", size: "small" },
    { main: "alpha", sub: "ALPHA", type: "accent", action: "meta", value: "ALPHA", size: "small" },
    { main: "x,n,t", sub: "cut", type: "dark", action: "input", value: "x,n,t", size: "small" },
    { main: "var", sub: "copy", type: "dark", action: "input", value: "var", size: "small" },
    { main: "tool", sub: "paste", type: "dark", action: "system", value: "tools", size: "small" },
    { main: "del", sub: "clear", type: "dark", action: "system", value: "clear", size: "small" }
  ],
  [
    { main: "eˣ", sub: "[", action: "input", value: "e^(", size: "small" },
    { main: "ln", sub: "]", action: "input", value: "ln(", size: "small" },
    { main: "log", sub: "{", action: "input", value: "log(", size: "small" },
    { main: "i", sub: "}", action: "input", value: "i", size: "small" },
    { main: ",", sub: "−", action: "input", value: ",", size: "small" },
    { main: "xʸ", sub: "→", action: "input", value: "^", size: "small" }
  ],
  [
    { main: "sin", sub: "asin", action: "input", value: "sin(", size: "small" },
    { main: "cos", sub: "acos", action: "input", value: "cos(", size: "small" },
    { main: "tan", sub: "atan", action: "input", value: "tan(", size: "small" },
    { main: "π", action: "input", value: "π" },
    { main: "√", action: "input", value: "√(" },
    { main: "x²", action: "input", value: "^2" }
  ],
  [
    { main: "math", sub: "test", type: "dark", action: "system", value: "math", size: "small" },
    { main: "apps", sub: "menu", type: "dark", action: "home", value: "home", size: "small" },
    { main: "prgm", sub: "code", type: "dark", action: "open", value: "programs", size: "small" },
    { main: "stat", sub: "data", type: "dark", action: "open", value: "statistics", size: "small" },
    { main: "vars", sub: "mem", type: "dark", action: "input", value: "vars", size: "small" },
    { main: "clear", sub: "esc", type: "dark", action: "system", value: "clear", size: "small" }
  ],
  [
    { main: "7", action: "input", value: "7" },
    { main: "8", action: "input", value: "8" },
    { main: "9", action: "input", value: "9" },
    { main: "(", action: "input", value: "(" },
    { main: ")", action: "input", value: ")" },
    { main: "÷", action: "input", value: "/" }
  ],
  [
    { main: "4", action: "input", value: "4" },
    { main: "5", action: "input", value: "5" },
    { main: "6", action: "input", value: "6" },
    { main: "×", action: "input", value: "*" },
    { main: "%", action: "input", value: "%" },
    { main: "−", action: "input", value: "-" }
  ],
  [
    { main: "1", action: "input", value: "1" },
    { main: "2", action: "input", value: "2" },
    { main: "3", action: "input", value: "3" },
    { main: "+", action: "input", value: "+" },
    { main: "Ans", action: "input", value: "Ans", size: "small" },
    { main: "EXE", type: "accent", action: "execute", value: "EXE", size: "small" }
  ],
  [
    { main: "0", action: "input", value: "0" },
    { main: ".", action: "input", value: "." },
    { main: "x10ˣ", action: "input", value: "E", size: "small" },
    { main: "x⁻¹", action: "input", value: "^-1", size: "small" },
    { main: "sto→", action: "input", value: "→", size: "small" },
    { main: "entry", type: "accent", action: "execute", value: "ENTER", size: "small" }
  ]
];
