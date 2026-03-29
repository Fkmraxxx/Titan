/**
 * Matrix — Opérations matricielles (2x2 et 3x3)
 */

let size = '2';
let matA = [['1','0'],['0','1']];
let matB = [['1','0'],['0','1']];
let op = 'add';
let result = null;
let errorMsg = '';

function getMatrix(prefix, s, screenEl) {
  const m = [];
  for (let i = 0; i < s; i++) {
    m.push([]);
    for (let j = 0; j < s; j++) {
      const el = screenEl.querySelector(`#${prefix}-${i}-${j}`);
      m[i].push(el ? el.value : '0');
    }
  }
  return m;
}

function toNum(m) {
  return m.map(row => row.map(v => parseFloat(v) || 0));
}

function det2(m) { return m[0][0] * m[1][1] - m[0][1] * m[1][0]; }

function det3(m) {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}

function inv2(m) {
  const d = det2(m);
  if (Math.abs(d) < 1e-12) throw new Error('Matrice singulière (det=0)');
  return [
    [m[1][1] / d, -m[0][1] / d],
    [-m[1][0] / d, m[0][0] / d]
  ];
}

function inv3(m) {
  const d = det3(m);
  if (Math.abs(d) < 1e-12) throw new Error('Matrice singulière (det=0)');
  const cofactors = [
    [ (m[1][1]*m[2][2]-m[1][2]*m[2][1]), -(m[1][0]*m[2][2]-m[1][2]*m[2][0]),  (m[1][0]*m[2][1]-m[1][1]*m[2][0])],
    [-(m[0][1]*m[2][2]-m[0][2]*m[2][1]),  (m[0][0]*m[2][2]-m[0][2]*m[2][0]), -(m[0][0]*m[2][1]-m[0][1]*m[2][0])],
    [ (m[0][1]*m[1][2]-m[0][2]*m[1][1]), -(m[0][0]*m[1][2]-m[0][2]*m[1][0]),  (m[0][0]*m[1][1]-m[0][1]*m[1][0])]
  ];
  return cofactors.map(row => row.map(v => v / d));
}

function addMat(A, B) { return A.map((row, i) => row.map((v, j) => v + B[i][j])); }

function mulMat(A, B) {
  const n = A.length;
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) =>
      A[i].reduce((s, _, k) => s + A[i][k] * B[k][j], 0)));
}

function fmtNum(v) { return parseFloat(v.toPrecision(6)).toString(); }

function matrixHtml(m, label) {
  const rows = m.map(row =>
    `<tr>${row.map(v => `<td style="padding:2px 6px;text-align:center;color:#a0ff9f">${fmtNum(v)}</td>`).join('')}</tr>`
  ).join('');
  return `<div style="margin-bottom:4px;font-size:10px;color:#888">${label}</div>
    <table style="border-collapse:collapse;border:1px solid #444;margin-bottom:8px">
      ${rows}
    </table>`;
}

function matInputHtml(prefix, s, mat) {
  return Array.from({ length: s }, (_, i) =>
    `<tr>${Array.from({ length: s }, (_, j) =>
      `<td><input id="${prefix}-${i}-${j}" type="number" value="${mat[i]?.[j] ?? '0'}"
        style="width:38px;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:2px;font-size:11px;text-align:center" /></td>`
    ).join('')}</tr>`
  ).join('');
}

export function render(screenEl, _state) {
  const s = parseInt(size);

  // Ajuster les matrices à la taille sélectionnée
  while (matA.length < s) { matA.push(Array(matA[0]?.length || s).fill('0')); }
  while (matB.length < s) { matB.push(Array(matB[0]?.length || s).fill('0')); }
  matA = matA.slice(0, s).map(r => { const row = r.slice(0, s); while (row.length < s) row.push('0'); return row; });
  matB = matB.slice(0, s).map(r => { const row = r.slice(0, s); while (row.length < s) row.push('0'); return row; });

  const needsB = op === 'add' || op === 'mul';

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:10px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:8px;border-bottom:1px solid #333;padding-bottom:6px">
        [] Matrices
      </div>

      <div style="display:flex;gap:8px;margin-bottom:8px">
        <div>
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">Taille</label>
          <select id="mat-size" style="background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:3px;font-size:12px">
            <option value="2" ${size === '2' ? 'selected' : ''}>2×2</option>
            <option value="3" ${size === '3' ? 'selected' : ''}>3×3</option>
          </select>
        </div>
        <div>
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">Opération</label>
          <select id="mat-op" style="background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:3px;font-size:12px">
            <option value="add" ${op === 'add' ? 'selected' : ''}>A + B</option>
            <option value="mul" ${op === 'mul' ? 'selected' : ''}>A × B</option>
            <option value="det" ${op === 'det' ? 'selected' : ''}>det(A)</option>
            <option value="inv" ${op === 'inv' ? 'selected' : ''}>A⁻¹</option>
          </select>
        </div>
      </div>

      <div style="display:flex;gap:12px;margin-bottom:8px;flex-wrap:wrap">
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:3px">Matrice A</div>
          <table style="border-collapse:collapse">${matInputHtml('a', s, matA)}</table>
        </div>
        ${needsB ? `<div>
          <div style="font-size:11px;color:#888;margin-bottom:3px">Matrice B</div>
          <table style="border-collapse:collapse">${matInputHtml('b', s, matB)}</table>
        </div>` : ''}
      </div>

      <button id="mat-btn"
        style="width:100%;background:#3a6bc4;color:#fff;border:none;padding:6px;font-size:12px;cursor:pointer;margin-bottom:8px">
        Calculer
      </button>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:12px;margin-bottom:6px">⚠ ${errorMsg}</div>` : ''}
      ${result !== null ? (() => {
        if (typeof result === 'number') {
          return `<div style="background:#2a2a3e;border:1px solid #444;padding:8px;text-align:center">
            <span style="color:#888;font-size:11px">det(A) = </span>
            <span style="color:#a0ff9f;font-size:18px;font-weight:bold">${fmtNum(result)}</span>
          </div>`;
        }
        return `<div style="background:#2a2a3e;border:1px solid #444;padding:8px">
          ${matrixHtml(result, 'Résultat')}
        </div>`;
      })() : ''}
    </div>
  `;

  screenEl.querySelector('#mat-size').addEventListener('change', e => { size = e.target.value; result = null; errorMsg = ''; render(screenEl, _state); });
  screenEl.querySelector('#mat-op').addEventListener('change', e => { op = e.target.value; result = null; errorMsg = ''; render(screenEl, _state); });

  screenEl.querySelector('#mat-btn').addEventListener('click', () => {
    // Lire les valeurs depuis les inputs
    matA = getMatrix('a', s, screenEl);
    if (needsB) matB = getMatrix('b', s, screenEl);
    errorMsg = ''; result = null;
    try {
      const A = toNum(matA);
      const B = toNum(matB);
      if (op === 'add') result = addMat(A, B);
      else if (op === 'mul') result = mulMat(A, B);
      else if (op === 'det') result = s === 2 ? det2(A) : det3(A);
      else if (op === 'inv') result = s === 2 ? inv2(A) : inv3(A);
    } catch (e) {
      errorMsg = e.message;
    }
    render(screenEl, _state);
  });
}

// Exports pour les tests unitaires
export { det2, det3, inv2, inv3, addMat, mulMat, toNum };
