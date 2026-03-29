/**
 * Fk Titan — Calculator Engine
 * Handles expression evaluation with full scientific calculator support.
 */

/**
 * Safely evaluate a mathematical expression string.
 * Converts display symbols to JS-compatible math, then evaluates.
 */
export function evaluateExpression(expr, ans) {
  if (!expr || expr.trim() === "") return null;

  let processed = expr;

  // Replace Ans with the last answer value
  processed = processed.replace(/Ans/g, `(${ans})`);

  // Replace display symbols with JS operators
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

  // Handle scientific functions
  processed = processed.replace(/sin\(/g, "Math.sin(");
  processed = processed.replace(/cos\(/g, "Math.cos(");
  processed = processed.replace(/tan\(/g, "Math.tan(");
  processed = processed.replace(/ln\(/g, "Math.log(");
  processed = processed.replace(/log\(/g, "Math.log10(");
  processed = processed.replace(/√\(/g, "Math.sqrt(");

  // Handle power operator: ^ → **
  processed = processed.replace(/\^/g, "**");

  // Implicit multiplication: 2( → 2*(, )(→)*(
  processed = processed.replace(/(\d)\(/g, "$1*(");
  processed = processed.replace(/\)\(/g, ")*(");

  // Validate: only allow safe characters
  if (/[^0-9+\-*/().eE,\s]/.test(processed.replace(/Math\.(sin|cos|tan|log|log10|sqrt|PI|pow|abs|ceil|floor|round|exp)/g, ""))) {
    throw new Error("Expression invalide");
  }

  // Try to evaluate
  // We use Function constructor with no access to global scope
  const fn = new Function(`"use strict"; return (${processed});`);
  const result = fn();

  if (typeof result !== "number" || !isFinite(result)) {
    if (result !== result) throw new Error("Résultat indéfini"); // NaN check
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
  // Use toPrecision for large/small numbers
  const str = num.toPrecision(12);
  // Remove trailing zeros
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
