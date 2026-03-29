/**
 * Finance — Calculs financiers (intérêts composés, valeur temporelle de l'argent)
 */

let finMode = 'compound';
// Intérêts composés
let P = '1000', r = '5', nComp = '12', t = '5';
// TVM
let PV = '1000', rTVM = '5', nTVM = '10', PMT = '100';
let result = null;
let errorMsg = '';

function fmt(v) {
  return v.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calculate() {
  errorMsg = ''; result = null;
  if (finMode === 'compound') {
    const Pv = parseFloat(P), rv = parseFloat(r) / 100, nv = parseFloat(nComp), tv = parseFloat(t);
    if ([Pv, rv, nv, tv].some(isNaN) || nv <= 0 || tv <= 0) { errorMsg = 'Paramètres invalides'; return; }
    const A = Pv * Math.pow(1 + rv / nv, nv * tv);
    result = { A, interest: A - Pv, label: 'Intérêts composés' };
  } else {
    const pv = parseFloat(PV), rv = parseFloat(rTVM) / 100, nv = parseFloat(nTVM), pmt = parseFloat(PMT);
    if ([pv, rv, nv, pmt].some(isNaN) || nv <= 0) { errorMsg = 'Paramètres invalides'; return; }
    let FV;
    if (rv === 0) {
      FV = pv + pmt * nv;
    } else {
      FV = pv * Math.pow(1 + rv, nv) + pmt * (Math.pow(1 + rv, nv) - 1) / rv;
    }
    result = { FV, label: 'Valeur future (TVM)' };
  }
}

export function render(screenEl, _state) {
  const isCompound = finMode === 'compound';

  let formHtml = isCompound ? `
    <div style="display:flex;gap:6px;margin-bottom:6px">
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">P (capital)</label>
        <input id="fin-p" type="number" value="${P}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
      </div>
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">r (% annuel)</label>
        <input id="fin-r" type="number" value="${r}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
      </div>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:8px">
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">n (périodes/an)</label>
        <input id="fin-n" type="number" value="${nComp}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
      </div>
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">t (années)</label>
        <input id="fin-t" type="number" value="${t}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
      </div>
    </div>` : `
    <div style="display:flex;gap:6px;margin-bottom:6px">
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">PV (val. présente)</label>
        <input id="fin-pv" type="number" value="${PV}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:11px;box-sizing:border-box" />
      </div>
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">r (% annuel)</label>
        <input id="fin-rtvm" type="number" value="${rTVM}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:11px;box-sizing:border-box" />
      </div>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:8px">
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">n (périodes)</label>
        <input id="fin-ntvm" type="number" value="${nTVM}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:11px;box-sizing:border-box" />
      </div>
      <div style="flex:1">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">PMT (versement)</label>
        <input id="fin-pmt" type="number" value="${PMT}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:11px;box-sizing:border-box" />
      </div>
    </div>`;

  let resHtml = '';
  if (result) {
    if (isCompound) {
      resHtml = `
        <div style="background:#2a2a3e;border:1px solid #444;padding:10px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="color:#888">Montant final A</span>
            <span style="color:#a0ff9f;font-weight:bold">${fmt(result.A)} €</span>
          </div>
          <div style="display:flex;justify-content:space-between">
            <span style="color:#888">Intérêts gagnés</span>
            <span style="color:#ffd97d">${fmt(result.interest)} €</span>
          </div>
        </div>`;
    } else {
      resHtml = `
        <div style="background:#2a2a3e;border:1px solid #444;padding:10px;text-align:center">
          <div style="font-size:11px;color:#888;margin-bottom:4px">Valeur future (FV)</div>
          <div style="font-size:20px;color:#a0ff9f;font-weight:bold">${fmt(result.FV)} €</div>
        </div>`;
    }
  }

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:10px;border-bottom:1px solid #333;padding-bottom:6px">
        ¤ Finance
      </div>

      <div style="margin-bottom:8px">
        <select id="fin-mode" style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px">
          <option value="compound" ${isCompound ? 'selected' : ''}>Intérêts composés</option>
          <option value="tvm" ${!isCompound ? 'selected' : ''}>TVM — Valeur temporelle</option>
        </select>
      </div>

      ${formHtml}

      <button id="fin-btn"
        style="width:100%;background:#3a6bc4;color:#fff;border:none;padding:7px;font-size:13px;cursor:pointer;margin-bottom:10px">
        Calculer
      </button>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:12px;margin-bottom:8px">⚠ ${errorMsg}</div>` : ''}
      ${resHtml}
    </div>
  `;

  screenEl.querySelector('#fin-mode').addEventListener('change', e => { finMode = e.target.value; render(screenEl, _state); });
  screenEl.querySelector('#fin-btn').addEventListener('click', () => {
    if (isCompound) {
      P = screenEl.querySelector('#fin-p').value;
      r = screenEl.querySelector('#fin-r').value;
      nComp = screenEl.querySelector('#fin-n').value;
      t = screenEl.querySelector('#fin-t').value;
    } else {
      PV = screenEl.querySelector('#fin-pv').value;
      rTVM = screenEl.querySelector('#fin-rtvm').value;
      nTVM = screenEl.querySelector('#fin-ntvm').value;
      PMT = screenEl.querySelector('#fin-pmt').value;
    }
    calculate();
    render(screenEl, _state);
  });
}
