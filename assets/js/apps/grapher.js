/**
 * Grapher — Traceur de fonctions f(x)
 */

let funcStr = 'Math.sin(x)';
let xMin = '-6.28';
let xMax = '6.28';
let errorMsg = '';

const SAFE_RE = /^[0-9+\-*/^().\s,nxMathsincotaglqrpube]+$/;

function safeEval(expression, x) {
  const sanitized = expression.trim();
  if (!SAFE_RE.test(sanitized)) throw new Error('Expression invalide');
  const jsExpr = sanitized.replace(/\^/g, '**');
  return new Function('x', 'Math', 'return ' + jsExpr)(x, Math);
}

function plotGraph(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const xMinVal = parseFloat(xMin);
  const xMaxVal = parseFloat(xMax);
  if (isNaN(xMinVal) || isNaN(xMaxVal) || xMinVal >= xMaxVal) {
    errorMsg = 'xMin/xMax invalides';
    return;
  }

  // Calcul de yMin/yMax pour calibration
  const points = [];
  const steps = W;
  for (let i = 0; i <= steps; i++) {
    const x = xMinVal + (i / steps) * (xMaxVal - xMinVal);
    try {
      const y = safeEval(funcStr, x);
      if (isFinite(y)) points.push({ x, y });
    } catch (_) { /* point ignoré */ }
  }

  if (points.length === 0) { errorMsg = 'Aucun point calculable'; return; }
  errorMsg = '';

  let yMin = Math.min(...points.map(p => p.y));
  let yMax = Math.max(...points.map(p => p.y));
  const yPad = (yMax - yMin) * 0.1 || 1;
  yMin -= yPad; yMax += yPad;

  const toCanvas = (x, y) => ({
    cx: ((x - xMinVal) / (xMaxVal - xMinVal)) * W,
    cy: H - ((y - yMin) / (yMax - yMin)) * H
  });

  // Fond
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, W, H);

  // Grille
  ctx.strokeStyle = '#2a2a3e';
  ctx.lineWidth = 0.5;
  const xStep = (xMaxVal - xMinVal) / 8;
  const yStep = (yMax - yMin) / 6;
  for (let gx = xMinVal; gx <= xMaxVal; gx += xStep) {
    const { cx } = toCanvas(gx, 0);
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
  }
  for (let gy = yMin; gy <= yMax; gy += yStep) {
    const { cy } = toCanvas(0, gy);
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 1;
  if (yMin <= 0 && yMax >= 0) {
    const { cy } = toCanvas(0, 0);
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
  }
  if (xMinVal <= 0 && xMaxVal >= 0) {
    const { cx } = toCanvas(0, 0);
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
  }

  // Courbe
  ctx.strokeStyle = '#a0c4ff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  let started = false;
  for (let i = 0; i <= steps; i++) {
    const x = xMinVal + (i / steps) * (xMaxVal - xMinVal);
    try {
      const y = safeEval(funcStr, x);
      if (!isFinite(y)) { started = false; continue; }
      const { cx, cy } = toCanvas(x, y);
      if (!started) { ctx.moveTo(cx, cy); started = true; }
      else ctx.lineTo(cx, cy);
    } catch (_) { started = false; }
  }
  ctx.stroke();
}

export function render(screenEl, _state) {
  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:10px;color:#e0e0e0;height:100%;box-sizing:border-box;display:flex;flex-direction:column;background:#1a1a2e">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;border-bottom:1px solid #333;padding-bottom:6px">
        <span style="font-size:14px;color:#a0c4ff;font-weight:bold">ƒ Grapher</span>
      </div>

      <div style="margin-bottom:6px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">f(x) =</label>
        <input id="g-func" type="text" value="${funcStr}"
          style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box"
          placeholder="ex: Math.sin(x)" />
      </div>

      <div style="display:flex;gap:6px;margin-bottom:6px">
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">xMin</label>
          <input id="g-xmin" type="number" value="${xMin}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
        </div>
        <div style="flex:1">
          <label style="font-size:11px;color:#888;display:block;margin-bottom:2px">xMax</label>
          <input id="g-xmax" type="number" value="${xMax}"
            style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
        </div>
      </div>

      <button id="g-btn"
        style="background:#3a6bc4;color:#fff;border:none;padding:6px;font-size:12px;cursor:pointer;margin-bottom:6px">
        Tracer
      </button>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:11px;margin-bottom:4px">⚠ ${errorMsg}</div>` : ''}

      <canvas id="g-canvas" width="280" height="160"
        style="border:1px solid #444;background:#0d1117;width:100%;flex:1;min-height:100px"></canvas>
    </div>
  `;

  const canvas = screenEl.querySelector('#g-canvas');
  // Tracé initial
  plotGraph(canvas);

  screenEl.querySelector('#g-btn').addEventListener('click', () => {
    funcStr = screenEl.querySelector('#g-func').value;
    xMin = screenEl.querySelector('#g-xmin').value;
    xMax = screenEl.querySelector('#g-xmax').value;
    // Re-tracer sans re-rendre tout le DOM
    plotGraph(canvas);
    const errEl = screenEl.querySelector('#g-error');
    if (errEl) errEl.textContent = errorMsg ? '⚠ ' + errorMsg : '';
    if (errorMsg) {
      render(screenEl, _state);
    }
  });
}
