/**
 * Fk Titan — Calculator Engine
 * Handles expression evaluation with full scientific calculator support.
 * Uses a safe recursive descent parser — no eval/Function constructor.
 */

/**
 * Tokenize a mathematical expression string into tokens.
 */
function tokenize(expr) {
  const tokens = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];

    // Skip whitespace
    if (ch === " ") { i++; continue; }

    // Numbers (including decimals)
    if ((ch >= "0" && ch <= "9") || (ch === "." && i + 1 < expr.length && expr[i + 1] >= "0" && expr[i + 1] <= "9")) {
      let num = "";
      while (i < expr.length && ((expr[i] >= "0" && expr[i] <= "9") || expr[i] === ".")) {
        num += expr[i++];
      }
      tokens.push({ type: "number", value: parseFloat(num) });
      continue;
    }

    // Functions: sin, cos, tan, log, ln, sqrt
    const funcs = ["sin", "cos", "tan", "log", "ln", "sqrt"];
    let matched = false;
    for (const fn of funcs) {
      if (expr.substring(i, i + fn.length) === fn) {
        tokens.push({ type: "func", value: fn });
        i += fn.length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // Operators and parens
    if ("+-*/^%".includes(ch)) {
      tokens.push({ type: "op", value: ch });
      i++;
      continue;
    }
    if (ch === "(") { tokens.push({ type: "lparen" }); i++; continue; }
    if (ch === ")") { tokens.push({ type: "rparen" }); i++; continue; }

    // Unknown character
    throw new Error(`Caractère invalide: ${ch}`);
  }
  return tokens;
}

/**
 * Recursive descent parser for safe math evaluation.
 *
 * Grammar:
 *   expression = term (('+' | '-') term)*
 *   term       = power (('*' | '/' | '%') power)*
 *   power      = unary ('^' unary)*
 *   unary      = ('-' unary) | postfix
 *   postfix    = primary
 *   primary    = number | func '(' expression ')' | '(' expression ')'
 */
function parse(tokens) {
  let pos = 0;

  function peek() { return tokens[pos] || null; }
  function consume() { return tokens[pos++]; }

  function expect(type) {
    const t = consume();
    if (!t || t.type !== type) throw new Error("Expression invalide");
    return t;
  }

  function parseExpression() {
    let left = parseTerm();
    while (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "-")) {
      const op = consume().value;
      const right = parseTerm();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }

  function parseTerm() {
    let left = parsePower();
    while (peek() && peek().type === "op" && (peek().value === "*" || peek().value === "/" || peek().value === "%")) {
      const op = consume().value;
      const right = parsePower();
      if (op === "*") left = left * right;
      else if (op === "/") {
        if (right === 0) throw new Error("Division par zéro");
        left = left / right;
      }
      else left = left % right;
    }
    return left;
  }

  function parsePower() {
    let base = parseUnary();
    while (peek() && peek().type === "op" && peek().value === "^") {
      consume();
      const exp = parseUnary();
      base = Math.pow(base, exp);
    }
    return base;
  }

  function parseUnary() {
    if (peek() && peek().type === "op" && peek().value === "-") {
      consume();
      return -parseUnary();
    }
    return parsePrimary();
  }

  function parsePrimary() {
    const t = peek();
    if (!t) throw new Error("Expression incomplète");

    // Number
    if (t.type === "number") {
      consume();
      return t.value;
    }

    // Function call
    if (t.type === "func") {
      const fn = consume().value;
      expect("lparen");
      const arg = parseExpression();
      expect("rparen");
      switch (fn) {
        case "sin": return Math.sin(arg);
        case "cos": return Math.cos(arg);
        case "tan": return Math.tan(arg);
        case "ln": return Math.log(arg);
        case "log": return Math.log10(arg);
        case "sqrt": return Math.sqrt(arg);
        default: throw new Error(`Fonction inconnue: ${fn}`);
      }
    }

    // Parenthesized expression
    if (t.type === "lparen") {
      consume();
      const val = parseExpression();
      expect("rparen");
      return val;
    }

    throw new Error("Expression invalide");
  }

  const result = parseExpression();
  if (pos < tokens.length) {
    throw new Error("Expression invalide");
  }
  return result;
}

/**
 * Safely evaluate a mathematical expression string.
 * Converts display symbols to parser-compatible form, then evaluates via
 * recursive descent parser (no eval/Function).
 */
export function evaluateExpression(expr, ans) {
  if (!expr || expr.trim() === "") return null;

  let processed = expr;

  // Replace Ans with the last answer value
  processed = processed.replace(/Ans/g, `(${ans})`);

  // Replace display symbols with standard operators
  processed = processed.replace(/×/g, "*");
  processed = processed.replace(/÷/g, "/");
  processed = processed.replace(/−/g, "-");
  processed = processed.replace(/π/g, `(${Math.PI})`);

  // Handle negative sign: (−) → negation
  processed = processed.replace(/\(−\)/g, "(-1)*");

  // Handle percentage: convert "X%" to "(X/100)"
  processed = processed.replace(/(\d+\.?\d*)%/g, "($1/100)");

  // Handle x² → ^2
  processed = processed.replace(/²/g, "^2");

  // Handle x⁻¹ → ^(-1)
  processed = processed.replace(/⁻¹/g, "^(-1)");

  // Handle function calls without explicit parentheses
  processed = processed.replace(/sin\b(?!\()/g, "sin(");
  processed = processed.replace(/cos\b(?!\()/g, "cos(");
  processed = processed.replace(/tan\b(?!\()/g, "tan(");
  processed = processed.replace(/ln\b(?!\()/g, "ln(");
  processed = processed.replace(/log\b(?!\()/g, "log(");
  processed = processed.replace(/sqrt\b(?!\()/g, "sqrt(");

  // Implicit multiplication: 2( → 2*(, )( → )*(, )2 → )*2
  processed = processed.replace(/(\d)\(/g, "$1*(");
  processed = processed.replace(/\)\(/g, ")*(");
  processed = processed.replace(/\)(\d)/g, ")*$1");

  // Tokenize and parse safely
  const tokens = tokenize(processed);
  const result = parse(tokens);

  if (typeof result !== "number" || !isFinite(result)) {
    if (Number.isNaN(result)) throw new Error("Résultat indéfini");
    throw new Error("Résultat infini");
  }

  return result;
}

/**
 * Format a number for display
 */
export function formatResult(num) {
  if (num === null || num === undefined) return "";
  if (Number.isInteger(num) && Math.abs(num) < 1e15) {
    return num.toString();
  }
  const str = num.toPrecision(12);
  return parseFloat(str).toString();
}

/**
 * Render the calculator screen HTML
 */
export function renderCalcScreen(state) {
  const historyHtml = state.calcHistory
    .map((entry) => {
      if (entry.error) {
        return `
          <div class="calc-history-item">
            <div class="calc-history-expr">${escapeHtml(entry.expr)}</div>
            <div class="calc-history-error">${escapeHtml(entry.error)}</div>
          </div>
        `;
      }
      return `
        <div class="calc-history-item">
          <div class="calc-history-expr">${escapeHtml(entry.expr)}</div>
          <div class="calc-history-result">= ${escapeHtml(entry.result)}</div>
        </div>
      `;
    })
    .join("");

  // Live preview of result
  let preview = "";
  if (state.buffer.trim()) {
    try {
      const val = evaluateExpression(state.buffer, state.ans);
      if (val !== null) {
        preview = formatResult(val);
      }
    } catch {
      // Don't show preview on error
    }
  }

  const indicators = [];
  if (state.shiftActive) indicators.push({ label: "2ND", active: true });
  if (state.alphaActive) indicators.push({ label: "ALPHA", active: true });
  if (state.ans !== 0) indicators.push({ label: `ANS=${formatResult(state.ans)}`, active: false });

  const indicatorHtml = indicators.length > 0
    ? `<div class="calc-indicator">${indicators.map(
        (i) => `<span class="calc-indicator-item${i.active ? " active" : ""}">${escapeHtml(i.label)}</span>`
      ).join("")}</div>`
    : "";

  return `
    <div class="calc-view">
      <div class="calc-history">${historyHtml}</div>
      <div class="calc-input-area">
        <div class="calc-expression">${escapeHtml(state.buffer)}<span class="calc-cursor"></span></div>
        <div class="calc-result-preview ${preview ? "has-result" : ""}">${preview ? escapeHtml(preview) : "&nbsp;"}</div>
        ${indicatorHtml}
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}
