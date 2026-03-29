/**
 * Inference — Tests statistiques (z-test, t-test)
 */

let testType = 'z-test';
let xBar = '105', mu0 = '100', stdVal = '15', nVal = '25';
let result = null;
let errorMsg = '';

// Approximation erf (Abramowitz & Stegun)
function erf(z) {
  const t = 1 / (1 + 0.3275911 * Math.abs(z));
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const v = 1 - poly * Math.exp(-z * z);
  return z >= 0 ? v : -v;
}

function normalCDF(z) {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

function pValue2Tailed(stat) {
  return 2 * (1 - normalCDF(Math.abs(stat)));
}

function runTest() {
  errorMsg = ''; result = null;
  const xB = parseFloat(xBar), m = parseFloat(mu0), s = parseFloat(stdVal), N = parseFloat(nVal);
  if ([xB, m, s, N].some(isNaN)) { errorMsg = 'Paramètres invalides'; return; }
  if (s <= 0 || N <= 0) { errorMsg = 's et n doivent être > 0'; return; }

  const se = s / Math.sqrt(N);
  const stat = (xB - m) / se;
  const p = pValue2Tailed(stat);
  const df = Math.floor(N) - 1;

  result = {
    stat: parseFloat(stat.toPrecision(6)),
    p: parseFloat(p.toPrecision(6)),
    se: parseFloat(se.toPrecision(6)),
    df: testType === 't-test' ? df : null,
    sig: p < 0.05
  };
}

export function render(screenEl, _state) {
  const isZ = testType === 'z-test';
  const statLabel = isZ ? 'z' : 't';

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:10px;border-bottom:1px solid #333;padding-bottom:6px">
        χ Inférence statistique
      </div>

      <div style="margin-bottom:8px">
        <select id="inf-type" style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px">
          <option value="z-test" ${isZ ? 'selected' : ''}>Test Z (σ connue)</option>
          <option value="t-test" ${!isZ ? 'selected' : ''}>Test t (s estimée)</option>
        </select>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:6px">
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">x̄ (moy. échant.)</label>
          <input id="inf-xbar" type="number" value="${xBar}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:11px;box-sizing:border-box" />
        </div>
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">μ₀ (hyp. nulle)</label>
          <input id="inf-mu" type="number" value="${mu0}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:11px;box-sizing:border-box" />
        </div>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:8px">
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">${isZ ? 'σ' : 's'}</label>
          <input id="inf-std" type="number" value="${stdVal}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:11px;box-sizing:border-box" />
        </div>
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">n</label>
          <input id="inf-n" type="number" value="${nVal}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:11px;box-sizing:border-box" />
        </div>
      </div>

      <button id="inf-btn"
        style="width:100%;background:#3a6bc4;color:#fff;border:none;padding:7px;font-size:13px;cursor:pointer;margin-bottom:10px">
        Tester
      </button>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:12px;margin-bottom:8px">⚠ ${errorMsg}</div>` : ''}
      ${result ? `
        <div style="background:#2a2a3e;border:1px solid #444;padding:10px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="color:#888">${statLabel} statistique</span>
            <span style="color:#a0c4ff;font-weight:bold">${result.stat}</span>
          </div>
          ${result.df !== null ? `<div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="color:#888">degrés de liberté</span>
            <span style="color:#a0c4ff">${result.df}</span>
          </div>` : ''}
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="color:#888">Erreur std</span>
            <span style="color:#a0c4ff">${result.se}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="color:#888">p-value (2 queues)</span>
            <span style="color:${result.p < 0.05 ? '#a0ff9f' : '#ff6b6b'};font-weight:bold">${result.p}</span>
          </div>
          <div style="text-align:center;margin-top:6px;font-size:12px;color:${result.sig ? '#a0ff9f' : '#ff6b6b'}">
            ${result.sig ? '✓ Significatif (α=0.05)' : '✗ Non significatif (α=0.05)'}
          </div>
        </div>` : ''}
    </div>
  `;

  screenEl.querySelector('#inf-type').addEventListener('change', e => { testType = e.target.value; render(screenEl, _state); });
  screenEl.querySelector('#inf-btn').addEventListener('click', () => {
    xBar = screenEl.querySelector('#inf-xbar').value;
    mu0 = screenEl.querySelector('#inf-mu').value;
    stdVal = screenEl.querySelector('#inf-std').value;
    nVal = screenEl.querySelector('#inf-n').value;
    runTest();
    render(screenEl, _state);
  });
}
