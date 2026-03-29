/**
 * Statistics — Statistiques descriptives
 */

let dataStr = '4, 7, 13, 2, 1, 7, 3, 9, 7, 5';
let results = null;
let errorMsg = '';

function parseData(str) {
  return str.split(/[,\s]+/).map(s => s.trim()).filter(Boolean).map(Number);
}

function computeStats(data) {
  const n = data.length;
  if (n === 0) throw new Error('Aucune donnée');
  if (data.some(isNaN)) throw new Error('Valeurs non numériques détectées');

  const sum = data.reduce((acc, v) => acc + v, 0);
  const mean = sum / n;

  const sorted = [...data].sort((a, b) => a - b);
  const median = n % 2 === 0
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
    : sorted[Math.floor(n / 2)];

  // Mode : valeur(s) la plus fréquente
  const freq = {};
  data.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
  const maxFreq = Math.max(...Object.values(freq));
  const modes = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);

  const variance = data.reduce((acc, v) => acc + (v - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);

  return {
    n, sum, mean, median,
    mode: modes.length === n ? 'Aucun' : modes.join(', '),
    variance, stdDev,
    min: sorted[0],
    max: sorted[n - 1],
    range: sorted[n - 1] - sorted[0]
  };
}

function fmt(v) {
  if (typeof v === 'number') return parseFloat(v.toPrecision(8)).toString();
  return v;
}

export function render(screenEl, _state) {
  let resHtml = '';
  if (results) {
    const rows = [
      ['n', results.n],
      ['Σ (somme)', fmt(results.sum)],
      ['Moyenne', fmt(results.mean)],
      ['Médiane', fmt(results.median)],
      ['Mode', results.mode],
      ['Variance', fmt(results.variance)],
      ['Écart-type σ', fmt(results.stdDev)],
      ['Min', fmt(results.min)],
      ['Max', fmt(results.max)],
      ['Étendue', fmt(results.range)],
    ];
    resHtml = `
      <div style="background:#2a2a3e;border:1px solid #444;padding:8px;font-size:11px">
        ${rows.map(([l, v]) => `
          <div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid #333">
            <span style="color:#888">${l}</span>
            <span style="color:#a0ff9f;font-weight:bold">${v}</span>
          </div>`).join('')}
      </div>`;
  }

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:10px;border-bottom:1px solid #333;padding-bottom:6px">
        ▤ Statistiques
      </div>

      <div style="margin-bottom:8px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">Données (séparées par virgule)</label>
        <textarea id="stat-data" rows="3"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box;resize:vertical"
          placeholder="ex: 1, 2, 3, 4, 5">${dataStr}</textarea>
      </div>

      <button id="stat-btn"
        style="width:100%;background:#3a6bc4;color:#fff;border:none;padding:7px;font-size:13px;cursor:pointer;margin-bottom:10px">
        Calculer
      </button>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:12px;margin-bottom:8px">⚠ ${errorMsg}</div>` : ''}
      ${resHtml}
    </div>
  `;

  screenEl.querySelector('#stat-btn').addEventListener('click', () => {
    dataStr = screenEl.querySelector('#stat-data').value;
    errorMsg = '';
    results = null;
    try {
      const data = parseData(dataStr);
      results = computeStats(data);
    } catch (e) {
      errorMsg = e.message;
    }
    render(screenEl, _state);
  });
}
