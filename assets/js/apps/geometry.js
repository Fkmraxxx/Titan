/**
 * Geometry — Calculs géométriques (cercle, rectangle, triangle, triangle rectangle)
 */

let shape = 'circle';
// Paramètres selon la forme
let geoParams = { r: '5', l: '4', w: '3', base: '6', height: '4', a: '3', b: '4', c: '5', sa: '3', sb: '4', sc: '5' };
let geoResult = null;
let errorMsg = '';

function fmtN(v) { return parseFloat(v.toPrecision(8)).toString(); }

function calculate() {
  errorMsg = ''; geoResult = null;
  try {
    const p = {};
    for (const [k, v] of Object.entries(geoParams)) p[k] = parseFloat(v);
    const res = {};

    if (shape === 'circle') {
      if (isNaN(p.r) || p.r < 0) throw new Error('r invalide');
      res.aire = Math.PI * p.r * p.r;
      res.perimetre = 2 * Math.PI * p.r;
      res.rows = [['Rayon', p.r], ['Aire', fmtN(res.aire)], ['Périmètre (C)', fmtN(res.perimetre)]];
    } else if (shape === 'rectangle') {
      if ([p.l, p.w].some(isNaN)) throw new Error('Paramètres invalides');
      res.aire = p.l * p.w;
      res.perimetre = 2 * (p.l + p.w);
      res.diagonale = Math.sqrt(p.l * p.l + p.w * p.w);
      res.rows = [['Longueur', p.l], ['Largeur', p.w], ['Aire', fmtN(res.aire)], ['Périmètre', fmtN(res.perimetre)], ['Diagonale', fmtN(res.diagonale)]];
    } else if (shape === 'triangle') {
      const a = p.sa, b = p.sb, c = p.sc;
      if ([a, b, c].some(isNaN) || a <= 0 || b <= 0 || c <= 0) throw new Error('Côtés invalides');
      if (a + b <= c || a + c <= b || b + c <= a) throw new Error('Triangle impossible');
      const s = (a + b + c) / 2;
      res.aire = Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Héron
      res.perimetre = a + b + c;
      // Angles par loi des cosinus
      const A = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180 / Math.PI;
      const B = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180 / Math.PI;
      const C = 180 - A - B;
      res.rows = [['a', a], ['b', b], ['c', c], ['Aire (Héron)', fmtN(res.aire)], ['Périmètre', fmtN(res.perimetre)], ['Angle A', fmtN(A) + '°'], ['Angle B', fmtN(B) + '°'], ['Angle C', fmtN(C) + '°']];
    } else if (shape === 'right') {
      if ([p.a, p.b].some(isNaN)) throw new Error('Paramètres invalides');
      const hyp = Math.sqrt(p.a * p.a + p.b * p.b);
      res.aire = p.a * p.b / 2;
      res.perimetre = p.a + p.b + hyp;
      const angA = Math.atan(p.a / p.b) * 180 / Math.PI;
      res.rows = [['a (côté)', p.a], ['b (côté)', p.b], ['Hypoténuse', fmtN(hyp)], ['Aire', fmtN(res.aire)], ['Périmètre', fmtN(res.perimetre)], ['Angle A', fmtN(angA) + '°'], ['Angle B', fmtN(90 - angA) + '°']];
    }

    geoResult = res.rows;
  } catch (e) {
    errorMsg = e.message;
  }
}

function inputsForShape() {
  const style = 'width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box';
  const lbl = (t) => `<label style="font-size:11px;color:#888;display:block;margin-bottom:2px">${t}</label>`;
  const inp = (id, key) => `<input id="geo-${key}" type="number" step="any" value="${geoParams[key]}" style="${style}" />`;

  if (shape === 'circle') return `<div>${lbl('Rayon r')}${inp('r', 'r')}</div>`;
  if (shape === 'rectangle') return `
    <div style="display:flex;gap:6px">
      <div style="flex:1">${lbl('Longueur l')}${inp('l', 'l')}</div>
      <div style="flex:1">${lbl('Largeur w')}${inp('w', 'w')}</div>
    </div>`;
  if (shape === 'triangle') return `
    <div style="display:flex;gap:6px">
      <div style="flex:1">${lbl('Côté a')}${inp('sa', 'sa')}</div>
      <div style="flex:1">${lbl('Côté b')}${inp('sb', 'sb')}</div>
      <div style="flex:1">${lbl('Côté c')}${inp('sc', 'sc')}</div>
    </div>`;
  if (shape === 'right') return `
    <div style="display:flex;gap:6px">
      <div style="flex:1">${lbl('Côté a')}${inp('a', 'a')}</div>
      <div style="flex:1">${lbl('Côté b')}${inp('b', 'b')}</div>
    </div>`;
  return '';
}

export function render(screenEl, _state) {
  const paramKeys = { circle: ['r'], rectangle: ['l', 'w'], triangle: ['sa', 'sb', 'sc'], right: ['a', 'b'] };

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:10px;border-bottom:1px solid #333;padding-bottom:6px">
        △ Géométrie
      </div>

      <div style="margin-bottom:8px">
        <select id="geo-shape" style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px">
          <option value="circle" ${shape === 'circle' ? 'selected' : ''}>Cercle</option>
          <option value="rectangle" ${shape === 'rectangle' ? 'selected' : ''}>Rectangle</option>
          <option value="triangle" ${shape === 'triangle' ? 'selected' : ''}>Triangle (3 côtés)</option>
          <option value="right" ${shape === 'right' ? 'selected' : ''}>Triangle rectangle</option>
        </select>
      </div>

      <div style="margin-bottom:8px">${inputsForShape()}</div>

      <button id="geo-btn"
        style="width:100%;background:#3a6bc4;color:#fff;border:none;padding:7px;font-size:13px;cursor:pointer;margin-bottom:10px">
        Calculer
      </button>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:12px;margin-bottom:8px">⚠ ${errorMsg}</div>` : ''}
      ${geoResult ? `
        <div style="background:#2a2a3e;border:1px solid #444;padding:8px;font-size:12px">
          ${geoResult.map(([l, v]) => `
            <div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid #333">
              <span style="color:#888">${l}</span>
              <span style="color:#a0ff9f;font-weight:bold">${v}</span>
            </div>`).join('')}
        </div>` : ''}
    </div>
  `;

  screenEl.querySelector('#geo-shape').addEventListener('change', e => { shape = e.target.value; geoResult = null; errorMsg = ''; render(screenEl, _state); });
  screenEl.querySelector('#geo-btn').addEventListener('click', () => {
    // Lire les paramètres selon la forme
    for (const key of (paramKeys[shape] || [])) {
      const el = screenEl.querySelector(`#geo-${key}`);
      if (el) geoParams[key] = el.value;
    }
    calculate();
    render(screenEl, _state);
  });
}
