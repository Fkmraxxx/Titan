/**
 * Lists — Gestion et opérations sur des listes
 */

let dataStr = '5, 3, 8, 1, 9, 2, 7, 4, 6, 5';
let listResult = null;
let listResultLabel = '';
let errorMsg = '';

function parseList(str) {
  return str.split(/[,\s]+/).map(s => s.trim()).filter(Boolean).map(Number);
}

function fmtN(v) { return parseFloat(v.toPrecision(8)).toString(); }

function runOp(op) {
  errorMsg = ''; listResult = null; listResultLabel = '';
  try {
    const data = parseList(dataStr);
    if (data.length === 0) throw new Error('Liste vide');
    if (data.some(isNaN)) throw new Error('Valeurs non numériques');

    switch (op) {
      case 'sort_asc':
        listResult = [...data].sort((a, b) => a - b);
        listResultLabel = 'Trié (croissant)'; break;
      case 'sort_desc':
        listResult = [...data].sort((a, b) => b - a);
        listResultLabel = 'Trié (décroissant)'; break;
      case 'reverse':
        listResult = [...data].reverse();
        listResultLabel = 'Inversé'; break;
      case 'unique':
        listResult = [...new Set(data)];
        listResultLabel = 'Valeurs uniques'; break;
      case 'sum':
        listResult = data.reduce((s, v) => s + v, 0);
        listResultLabel = 'Somme'; break;
      case 'mean':
        listResult = data.reduce((s, v) => s + v, 0) / data.length;
        listResultLabel = 'Moyenne'; break;
      case 'min':
        listResult = Math.min(...data);
        listResultLabel = 'Minimum'; break;
      case 'max':
        listResult = Math.max(...data);
        listResultLabel = 'Maximum'; break;
      case 'range':
        listResult = Math.max(...data) - Math.min(...data);
        listResultLabel = 'Étendue'; break;
      case 'show':
        listResult = data;
        listResultLabel = `Liste (${data.length} éléments)`; break;
    }
  } catch (e) {
    errorMsg = e.message;
  }
}

export function render(screenEl, _state) {
  let resHtml = '';
  if (listResult !== null) {
    if (Array.isArray(listResult)) {
      resHtml = `
        <div style="background:#2a2a3e;border:1px solid #444;padding:8px">
          <div style="font-size:11px;color:#888;margin-bottom:4px">${listResultLabel}</div>
          <div style="color:#a0ff9f;font-size:11px;word-break:break-all">[${listResult.map(fmtN).join(', ')}]</div>
          <div style="font-size:10px;color:#666;margin-top:2px">${listResult.length} éléments</div>
        </div>`;
    } else {
      resHtml = `
        <div style="background:#2a2a3e;border:1px solid #444;padding:8px;text-align:center">
          <div style="font-size:11px;color:#888;margin-bottom:4px">${listResultLabel}</div>
          <div style="font-size:22px;color:#a0ff9f;font-weight:bold">${fmtN(listResult)}</div>
        </div>`;
    }
  }

  const btnStyle = 'background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:5px 8px;font-size:11px;cursor:pointer;margin:2px';

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:10px;border-bottom:1px solid #333;padding-bottom:6px">
        L Listes
      </div>

      <div style="margin-bottom:8px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">Données (séparées par virgule)</label>
        <textarea id="list-data" rows="2"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box;resize:vertical">${dataStr}</textarea>
      </div>

      <div style="margin-bottom:10px">
        <div style="font-size:11px;color:#888;margin-bottom:4px">Opérations</div>
        <div style="display:flex;flex-wrap:wrap;gap:2px">
          <button class="list-op" data-op="sort_asc" style="${btnStyle}">↑ Trier</button>
          <button class="list-op" data-op="sort_desc" style="${btnStyle}">↓ Trier</button>
          <button class="list-op" data-op="reverse" style="${btnStyle}">⇄ Inverser</button>
          <button class="list-op" data-op="unique" style="${btnStyle}">≠ Unique</button>
          <button class="list-op" data-op="sum" style="${btnStyle}">Σ Somme</button>
          <button class="list-op" data-op="mean" style="${btnStyle}">x̄ Moyenne</button>
          <button class="list-op" data-op="min" style="${btnStyle}">Min</button>
          <button class="list-op" data-op="max" style="${btnStyle}">Max</button>
          <button class="list-op" data-op="range" style="${btnStyle}">Étendue</button>
          <button class="list-op" data-op="show" style="${btnStyle}">Afficher</button>
        </div>
      </div>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:12px;margin-bottom:8px">⚠ ${errorMsg}</div>` : ''}
      ${resHtml}
    </div>
  `;

  screenEl.querySelector('#list-data').addEventListener('input', e => { dataStr = e.target.value; });
  screenEl.querySelectorAll('.list-op').forEach(btn => {
    btn.addEventListener('click', () => {
      dataStr = screenEl.querySelector('#list-data').value;
      runOp(btn.dataset.op);
      render(screenEl, _state);
    });
  });
}
