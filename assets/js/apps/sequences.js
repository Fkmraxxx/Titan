/**
 * Sequences — Suites arithmétiques et géométriques
 */

let seqType = 'arithmetic';
let a1 = '2', dOrR = '3', n = '10';
let results = null;
let errorMsg = '';

function compute() {
  errorMsg = ''; results = null;
  const A1 = parseFloat(a1);
  const D = parseFloat(dOrR);
  const N = parseInt(n);

  if (isNaN(A1) || isNaN(D) || isNaN(N)) { errorMsg = 'Paramètres invalides'; return; }
  if (N < 1 || N > 1000) { errorMsg = 'n doit être entre 1 et 1000'; return; }

  let an, sn;
  const terms = [];

  if (seqType === 'arithmetic') {
    an = A1 + (N - 1) * D;
    sn = N / 2 * (2 * A1 + (N - 1) * D);
    for (let i = 1; i <= Math.min(N, 10); i++) {
      terms.push(A1 + (i - 1) * D);
    }
  } else {
    an = A1 * Math.pow(D, N - 1);
    sn = D === 1 ? A1 * N : A1 * (1 - Math.pow(D, N)) / (1 - D);
    for (let i = 1; i <= Math.min(N, 10); i++) {
      terms.push(A1 * Math.pow(D, i - 1));
    }
  }

  results = { an, sn, terms };
}

function fmt(v) { return parseFloat(v.toPrecision(10)).toString(); }

export function render(screenEl, _state) {
  const isArith = seqType === 'arithmetic';
  const dLabel = isArith ? 'd (raison)' : 'r (raison)';

  let resHtml = '';
  if (results) {
    const termsStr = results.terms.map((v, i) => `<span style="color:#a0ff9f">u${i + 1}=${fmt(v)}</span>`).join(', ');
    resHtml = `
      <div style="background:#2a2a3e;border:1px solid #444;padding:10px">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <span style="color:#888">u<sub>n</sub> (n=${n})</span>
          <span style="color:#a0ff9f;font-weight:bold">${fmt(results.an)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span style="color:#888">S<sub>n</sub></span>
          <span style="color:#a0ff9f;font-weight:bold">${fmt(results.sn)}</span>
        </div>
        <div style="font-size:10px;color:#666;word-break:break-all">${termsStr}${results.terms.length < parseInt(n) ? '...' : ''}</div>
      </div>`;
  }

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:10px;border-bottom:1px solid #333;padding-bottom:6px">
        n Suites numériques
      </div>

      <div style="margin-bottom:8px">
        <select id="seq-type" style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px">
          <option value="arithmetic" ${isArith ? 'selected' : ''}>Arithmétique: u_n = u₁ + (n-1)d</option>
          <option value="geometric" ${!isArith ? 'selected' : ''}>Géométrique: u_n = u₁ · r^(n-1)</option>
        </select>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:8px">
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">u₁</label>
          <input id="seq-a1" type="number" value="${a1}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
        </div>
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">${dLabel}</label>
          <input id="seq-d" type="number" value="${dOrR}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
        </div>
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">n</label>
          <input id="seq-n" type="number" value="${n}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
        </div>
      </div>

      <button id="seq-btn"
        style="width:100%;background:#3a6bc4;color:#fff;border:none;padding:7px;font-size:13px;cursor:pointer;margin-bottom:10px">
        Calculer
      </button>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:12px;margin-bottom:8px">⚠ ${errorMsg}</div>` : ''}
      ${resHtml}
    </div>
  `;

  screenEl.querySelector('#seq-type').addEventListener('change', e => { seqType = e.target.value; render(screenEl, _state); });
  screenEl.querySelector('#seq-btn').addEventListener('click', () => {
    a1 = screenEl.querySelector('#seq-a1').value;
    dOrR = screenEl.querySelector('#seq-d').value;
    n = screenEl.querySelector('#seq-n').value;
    compute();
    render(screenEl, _state);
  });
}
