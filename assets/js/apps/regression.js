/**
 * Regression — Régression linéaire (moindres carrés)
 */

let xStr = '1, 2, 3, 4, 5';
let yStr = '2, 4, 5, 4, 5';
let results = null;
let errorMsg = '';

function parseList(str) {
  return str.split(/[,\s]+/).map(s => s.trim()).filter(Boolean).map(Number);
}

function linearRegression(xs, ys) {
  const n = xs.length;
  if (n < 2) throw new Error('Au moins 2 points requis');
  if (n !== ys.length) throw new Error('x et y doivent avoir le même nombre de valeurs');
  if (xs.some(isNaN) || ys.some(isNaN)) throw new Error('Valeurs non numériques');

  const sumX = xs.reduce((s, v) => s + v, 0);
  const sumY = ys.reduce((s, v) => s + v, 0);
  const sumXX = xs.reduce((s, v) => s + v * v, 0);
  const sumXY = xs.reduce((s, v, i) => s + v * ys[i], 0);

  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) throw new Error('Les x sont tous identiques');

  const a = (n * sumXY - sumX * sumY) / denom; // pente
  const b = (sumY - a * sumX) / n;              // ordonnée à l'origine

  const meanY = sumY / n;
  const ssTot = ys.reduce((s, v) => s + (v - meanY) ** 2, 0);
  const ssRes = ys.reduce((s, v, i) => s + (v - (a * xs[i] + b)) ** 2, 0);
  const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;

  return { a, b, r2, n };
}

function fmt(v) { return parseFloat(v.toPrecision(8)).toString(); }

export function render(screenEl, _state) {
  let resHtml = '';
  if (results) {
    resHtml = `
      <div style="background:#2a2a3e;border:1px solid #444;padding:10px;text-align:center">
        <div style="font-size:14px;color:#a0c4ff;margin-bottom:6px">y = ax + b</div>
        <div style="color:#a0ff9f;font-size:16px;margin-bottom:4px">a = ${fmt(results.a)}</div>
        <div style="color:#a0ff9f;font-size:16px;margin-bottom:4px">b = ${fmt(results.b)}</div>
        <div style="color:#ffd97d;font-size:13px">R² = ${fmt(results.r2)}</div>
        <div style="font-size:10px;color:#888;margin-top:4px">${results.n} points</div>
      </div>`;
  }

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:10px;border-bottom:1px solid #333;padding-bottom:6px">
        ↗ Régression linéaire
      </div>

      <div style="margin-bottom:8px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">Valeurs x (séparées par virgule)</label>
        <input id="reg-x" type="text" value="${xStr}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
      </div>

      <div style="margin-bottom:8px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">Valeurs y (séparées par virgule)</label>
        <input id="reg-y" type="text" value="${yStr}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
      </div>

      <button id="reg-btn"
        style="width:100%;background:#3a6bc4;color:#fff;border:none;padding:7px;font-size:13px;cursor:pointer;margin-bottom:10px">
        Calculer
      </button>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:12px;margin-bottom:8px">⚠ ${errorMsg}</div>` : ''}
      ${resHtml}
    </div>
  `;

  screenEl.querySelector('#reg-btn').addEventListener('click', () => {
    xStr = screenEl.querySelector('#reg-x').value;
    yStr = screenEl.querySelector('#reg-y').value;
    errorMsg = ''; results = null;
    try {
      results = linearRegression(parseList(xStr), parseList(yStr));
    } catch (e) {
      errorMsg = e.message;
    }
    render(screenEl, _state);
  });
}
