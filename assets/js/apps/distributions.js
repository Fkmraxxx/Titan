/**
 * Distributions — Lois de probabilité (Normale, Binomiale)
 */

let distType = 'normal';
// Paramètres normale
let mu = '0', sigma = '1', xVal = '1';
// Paramètres binomiale
let nParam = '10', pParam = '0.5', kParam = '3';
let result = null;
let errorMsg = '';

// Approximation de erf (Abramowitz & Stegun 7.1.26)
function erf(z) {
  const t = 1 / (1 + 0.3275911 * Math.abs(z));
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const val = 1 - poly * Math.exp(-z * z);
  return z >= 0 ? val : -val;
}

// CDF normale standard
function normalCDF(x, m, s) {
  return 0.5 * (1 + erf((x - m) / (s * Math.sqrt(2))));
}

// Coefficient binomial C(n,k)
function comb(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let c = 1;
  for (let i = 0; i < k; i++) {
    c = c * (n - i) / (i + 1);
  }
  return c;
}

function calculate() {
  errorMsg = ''; result = null;
  if (distType === 'normal') {
    const m = parseFloat(mu), s = parseFloat(sigma), x = parseFloat(xVal);
    if (isNaN(m) || isNaN(s) || isNaN(x)) { errorMsg = 'Paramètres invalides'; return; }
    if (s <= 0) { errorMsg = 'σ doit être > 0'; return; }
    result = { p: normalCDF(x, m, s), label: `P(X ≤ ${x}) avec μ=${m}, σ=${s}` };
  } else {
    const n = parseInt(nParam), p = parseFloat(pParam), k = parseInt(kParam);
    if (isNaN(n) || isNaN(p) || isNaN(k)) { errorMsg = 'Paramètres invalides'; return; }
    if (p < 0 || p > 1) { errorMsg = 'p doit être entre 0 et 1'; return; }
    if (k < 0 || k > n) { errorMsg = 'k doit être entre 0 et n'; return; }
    result = {
      p: comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k),
      label: `P(X = ${k}) avec n=${n}, p=${p}`
    };
  }
}

export function render(screenEl, _state) {
  const isNormal = distType === 'normal';

  let paramsHtml = isNormal ? `
    <div style="display:flex;gap:6px;margin-bottom:8px">
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">μ (moyenne)</label>
        <input id="d-mu" type="number" value="${mu}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
      </div>
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">σ (écart-type)</label>
        <input id="d-sigma" type="number" value="${sigma}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
      </div>
    </div>
    <div style="margin-bottom:8px">
      <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">x</label>
      <input id="d-x" type="number" value="${xVal}"
        style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
    </div>` : `
    <div style="display:flex;gap:6px;margin-bottom:8px">
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">n (essais)</label>
        <input id="d-n" type="number" value="${nParam}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
      </div>
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">p (probabilité)</label>
        <input id="d-p" type="number" step="0.01" value="${pParam}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
      </div>
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">k (succès)</label>
        <input id="d-k" type="number" value="${kParam}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
      </div>
    </div>`;

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:10px;border-bottom:1px solid #333;padding-bottom:6px">
        π Distributions
      </div>

      <div style="margin-bottom:8px">
        <select id="d-type" style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px">
          <option value="normal" ${isNormal ? 'selected' : ''}>Loi Normale N(μ,σ)</option>
          <option value="binomial" ${!isNormal ? 'selected' : ''}>Loi Binomiale B(n,p)</option>
        </select>
      </div>

      ${paramsHtml}

      <button id="d-btn"
        style="width:100%;background:#3a6bc4;color:#fff;border:none;padding:7px;font-size:13px;cursor:pointer;margin-bottom:10px">
        Calculer
      </button>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:12px;margin-bottom:8px">⚠ ${errorMsg}</div>` : ''}
      ${result ? `
        <div style="background:#2a2a3e;border:1px solid #444;padding:10px;text-align:center">
          <div style="font-size:11px;color:#888;margin-bottom:4px">${result.label}</div>
          <div style="font-size:22px;color:#a0ff9f;font-weight:bold">${parseFloat(result.p.toPrecision(8))}</div>
        </div>` : ''}
    </div>
  `;

  screenEl.querySelector('#d-type').addEventListener('change', e => { distType = e.target.value; render(screenEl, _state); });
  screenEl.querySelector('#d-btn').addEventListener('click', () => {
    if (isNormal) {
      mu = screenEl.querySelector('#d-mu').value;
      sigma = screenEl.querySelector('#d-sigma').value;
      xVal = screenEl.querySelector('#d-x').value;
    } else {
      nParam = screenEl.querySelector('#d-n').value;
      pParam = screenEl.querySelector('#d-p').value;
      kParam = screenEl.querySelector('#d-k').value;
    }
    calculate();
    render(screenEl, _state);
  });
}
