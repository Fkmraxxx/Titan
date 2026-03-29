/**
 * Equations — Résolution d'équations linéaires et quadratiques
 */

let type = 'linear';
let a = '1', b = '-3', c = '2';
let results = null;
let errorMsg = '';

function solve() {
  errorMsg = '';
  results = null;
  const A = parseFloat(a);
  const B = parseFloat(b);
  const C = parseFloat(c);

  if (type === 'linear') {
    if (isNaN(A) || isNaN(B)) { errorMsg = 'Coefficients invalides'; return; }
    if (A === 0) { errorMsg = B === 0 ? 'Infinité de solutions' : 'Aucune solution'; return; }
    results = { x: -B / A };
  } else {
    if (isNaN(A) || isNaN(B) || isNaN(C)) { errorMsg = 'Coefficients invalides'; return; }
    if (A === 0) { errorMsg = 'a ≠ 0 requis pour quadratique'; return; }
    const disc = B * B - 4 * A * C;
    if (disc > 0) {
      results = {
        disc,
        x1: (-B + Math.sqrt(disc)) / (2 * A),
        x2: (-B - Math.sqrt(disc)) / (2 * A),
        type: 'real'
      };
    } else if (disc === 0) {
      results = { disc, x1: -B / (2 * A), type: 'double' };
    } else {
      const re = -B / (2 * A);
      const im = Math.sqrt(-disc) / (2 * A);
      results = { disc, re, im, type: 'complex' };
    }
  }
}

function fmt(n) {
  if (n === null || n === undefined) return '';
  return parseFloat(n.toPrecision(10)).toString();
}

export function render(screenEl, _state) {
  const isLinear = type === 'linear';

  let resHtml = '';
  if (results) {
    if (isLinear) {
      resHtml = `<div style="text-align:center"><span style="color:#a0ff9f;font-size:18px">x = ${fmt(results.x)}</span></div>`;
    } else if (results.type === 'real') {
      resHtml = `
        <div style="font-size:11px;color:#888;margin-bottom:4px">Δ = ${fmt(results.disc)} (deux racines réelles)</div>
        <div style="color:#a0ff9f;font-size:14px">x₁ = ${fmt(results.x1)}</div>
        <div style="color:#a0ff9f;font-size:14px">x₂ = ${fmt(results.x2)}</div>`;
    } else if (results.type === 'double') {
      resHtml = `
        <div style="font-size:11px;color:#888;margin-bottom:4px">Δ = 0 (racine double)</div>
        <div style="color:#a0ff9f;font-size:14px">x = ${fmt(results.x1)}</div>`;
    } else {
      resHtml = `
        <div style="font-size:11px;color:#888;margin-bottom:4px">Δ = ${fmt(results.disc)} (racines complexes)</div>
        <div style="color:#a0ff9f;font-size:14px">x₁ = ${fmt(results.re)} + ${fmt(results.im)}i</div>
        <div style="color:#a0ff9f;font-size:14px">x₂ = ${fmt(results.re)} − ${fmt(results.im)}i</div>`;
    }
  }

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:10px;border-bottom:1px solid #333;padding-bottom:6px">
        = Équations
      </div>

      <div style="margin-bottom:8px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">Type</label>
        <select id="eq-type" style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px">
          <option value="linear" ${isLinear ? 'selected' : ''}>Linéaire: ax + b = 0</option>
          <option value="quadratic" ${!isLinear ? 'selected' : ''}>Quadratique: ax² + bx + c = 0</option>
        </select>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:8px">
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">a</label>
          <input id="eq-a" type="number" value="${a}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
        </div>
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">b</label>
          <input id="eq-b" type="number" value="${b}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
        </div>
        ${!isLinear ? `<div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">c</label>
          <input id="eq-c" type="number" value="${c}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
        </div>` : ''}
      </div>

      <div style="font-size:11px;color:#666;margin-bottom:8px">
        ${isLinear ? `${a}x + (${b}) = 0` : `${a}x² + (${b})x + (${c}) = 0`}
      </div>

      <button id="eq-btn"
        style="width:100%;background:#3a6bc4;color:#fff;border:none;padding:7px;font-size:13px;cursor:pointer;margin-bottom:10px">
        Résoudre
      </button>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:12px;margin-bottom:8px">⚠ ${errorMsg}</div>` : ''}
      ${resHtml ? `<div style="background:#2a2a3e;border:1px solid #444;padding:10px">${resHtml}</div>` : ''}
    </div>
  `;

  screenEl.querySelector('#eq-type').addEventListener('change', e => { type = e.target.value; render(screenEl, _state); });
  screenEl.querySelector('#eq-btn').addEventListener('click', () => {
    a = screenEl.querySelector('#eq-a').value;
    b = screenEl.querySelector('#eq-b').value;
    if (!isLinear) c = screenEl.querySelector('#eq-c').value;
    solve();
    render(screenEl, _state);
  });
}
