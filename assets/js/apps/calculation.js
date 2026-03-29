/**
 * Calculation — Sommation (Σ) et produit (Π)
 */

// État interne du module
let mode = 'sum';
let expr = 'n';
let from = '1';
let to = '10';
let result = null;
let errorMsg = '';

// Regex whitelist pour l'expression (n, chiffres, opérateurs, fonctions Math)
const SAFE_RE = /^[0-9+\-*/^().\s,nxMathsincotaglqrpube]+$/;

function safeEval(expression, n) {
  const sanitized = expression.trim();
  if (!SAFE_RE.test(sanitized)) throw new Error('Expression invalide');
  // Remplace ^ par ** pour JavaScript
  const jsExpr = sanitized.replace(/\^/g, '**');
  return new Function('n', 'Math', 'return ' + jsExpr)(n, Math);
}

function calculate() {
  errorMsg = '';
  result = null;
  const fromNum = parseFloat(from);
  const toNum = parseFloat(to);
  if (isNaN(fromNum) || isNaN(toNum)) {
    errorMsg = 'Bornes invalides';
    return;
  }
  if (toNum - fromNum > 10000) {
    errorMsg = 'Intervalle trop grand (max 10 000)';
    return;
  }
  try {
    let acc = mode === 'sum' ? 0 : 1;
    for (let n = fromNum; n <= toNum; n++) {
      const val = safeEval(expr, n);
      if (typeof val !== 'number' || !isFinite(val)) throw new Error('Résultat indéfini pour n=' + n);
      if (mode === 'sum') acc += val;
      else acc *= val;
    }
    result = acc;
  } catch (e) {
    errorMsg = e.message;
  }
}

export function render(screenEl, _state) {
  const symbol = mode === 'sum' ? 'Σ' : 'Π';
  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;border-bottom:1px solid #333;padding-bottom:8px">
        <span style="font-size:18px;font-weight:bold;color:#a0c4ff">${symbol}</span>
        <span style="font-size:14px;color:#a0c4ff">Calcul</span>
      </div>

      <div style="margin-bottom:8px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">Mode</label>
        <select id="calc-mode" style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px">
          <option value="sum" ${mode === 'sum' ? 'selected' : ''}>Σ Sommation</option>
          <option value="product" ${mode === 'product' ? 'selected' : ''}>Π Produit</option>
        </select>
      </div>

      <div style="margin-bottom:8px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">Expression f(n)</label>
        <input id="calc-expr" type="text" value="${expr}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box"
          placeholder="ex: n^2" />
      </div>

      <div style="display:flex;gap:8px;margin-bottom:8px">
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">De (from)</label>
          <input id="calc-from" type="number" value="${from}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
        </div>
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">À (to)</label>
          <input id="calc-to" type="number" value="${to}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
        </div>
      </div>

      <button id="calc-btn"
        style="width:100%;background:#3a6bc4;color:#fff;border:none;padding:7px;font-size:13px;cursor:pointer;margin-bottom:10px">
        Calculer
      </button>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:12px;margin-bottom:8px">⚠ ${errorMsg}</div>` : ''}
      ${result !== null && !errorMsg ? `
        <div style="background:#2a2a3e;border:1px solid #444;padding:8px;text-align:center">
          <div style="font-size:11px;color:#888;margin-bottom:4px">${symbol} f(n), n=${from}..${to}</div>
          <div style="font-size:20px;color:#a0ff9f;font-weight:bold">${result}</div>
        </div>` : ''}
    </div>
  `;

  // Rattachement des événements
  screenEl.querySelector('#calc-mode').addEventListener('change', e => { mode = e.target.value; render(screenEl, _state); });
  screenEl.querySelector('#calc-expr').addEventListener('input', e => { expr = e.target.value; });
  screenEl.querySelector('#calc-from').addEventListener('input', e => { from = e.target.value; });
  screenEl.querySelector('#calc-to').addEventListener('input', e => { to = e.target.value; });
  screenEl.querySelector('#calc-btn').addEventListener('click', () => {
    expr = screenEl.querySelector('#calc-expr').value;
    from = screenEl.querySelector('#calc-from').value;
    to = screenEl.querySelector('#calc-to').value;
    calculate();
    render(screenEl, _state);
  });
}
