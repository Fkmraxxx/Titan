/**
 * Complex — Opérations sur les nombres complexes
 */

let ca1 = '3', cb1 = '4';
let ca2 = '1', cb2 = '2';
let complexOp = 'add';
let result = null;
let errorMsg = '';

function parseComplex(a, b) {
  const re = parseFloat(a), im = parseFloat(b);
  if (isNaN(re) || isNaN(im)) throw new Error('Valeurs invalides');
  return { re, im };
}

function fmtC(re, im) {
  const imAbs = Math.abs(im);
  if (im === 0) return `${fmtN(re)}`;
  if (re === 0) return `${im < 0 ? '-' : ''}${fmtN(imAbs)}i`;
  return `${fmtN(re)} ${im < 0 ? '−' : '+'} ${fmtN(imAbs)}i`;
}

function fmtN(v) { return parseFloat(v.toPrecision(8)).toString(); }

function calculate() {
  errorMsg = ''; result = null;
  try {
    const z1 = parseComplex(ca1, cb1);
    const z2 = parseComplex(ca2, cb2);
    let re, im, extra = '';

    switch (complexOp) {
      case 'add':
        re = z1.re + z2.re; im = z1.im + z2.im; break;
      case 'sub':
        re = z1.re - z2.re; im = z1.im - z2.im; break;
      case 'mul':
        re = z1.re * z2.re - z1.im * z2.im;
        im = z1.re * z2.im + z1.im * z2.re; break;
      case 'div': {
        const denom = z2.re * z2.re + z2.im * z2.im;
        if (denom === 0) throw new Error('Division par zéro');
        re = (z1.re * z2.re + z1.im * z2.im) / denom;
        im = (z1.im * z2.re - z1.re * z2.im) / denom;
        break;
      }
      case 'mod':
        re = Math.sqrt(z1.re * z1.re + z1.im * z1.im); im = 0;
        extra = `|z₁| = ${fmtN(re)}`; break;
      case 'arg':
        re = Math.atan2(z1.im, z1.re); im = 0;
        extra = `arg(z₁) = ${fmtN(re)} rad (${fmtN(re * 180 / Math.PI)}°)`; break;
      case 'conj':
        re = z1.re; im = -z1.im; break;
      case 'pow2':
        re = z1.re * z1.re - z1.im * z1.im;
        im = 2 * z1.re * z1.im; break;
      default:
        throw new Error('Opération inconnue');
    }

    const modR = Math.sqrt(re * re + im * im);
    const argR = Math.atan2(im, re);
    result = {
      cartesian: fmtC(re, im),
      polar: `${fmtN(modR)}∠${fmtN(argR * 180 / Math.PI)}°`,
      extra
    };
  } catch (e) {
    errorMsg = e.message;
  }
}

export function render(screenEl, _state) {
  const singleOps = new Set(['mod', 'arg', 'conj', 'pow2']);
  const needsZ2 = !singleOps.has(complexOp);

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:10px;border-bottom:1px solid #333;padding-bottom:6px">
        i Nombres Complexes
      </div>

      <div style="margin-bottom:8px">
        <div style="font-size:11px;color:#888;margin-bottom:3px">z₁ = a + bi</div>
        <div style="display:flex;gap:6px">
          <div style="flex:1">
            <label style="font-size:10px;color:#666">a (réel)</label>
            <input id="c-a1" type="number" value="${ca1}"
              style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
          </div>
          <div style="flex:1">
            <label style="font-size:10px;color:#666">b (imag)</label>
            <input id="c-b1" type="number" value="${cb1}"
              style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
          </div>
        </div>
      </div>

      <div style="margin-bottom:8px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">Opération</label>
        <select id="c-op" style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px">
          <option value="add" ${complexOp === 'add' ? 'selected' : ''}>z₁ + z₂</option>
          <option value="sub" ${complexOp === 'sub' ? 'selected' : ''}>z₁ − z₂</option>
          <option value="mul" ${complexOp === 'mul' ? 'selected' : ''}>z₁ × z₂</option>
          <option value="div" ${complexOp === 'div' ? 'selected' : ''}>z₁ ÷ z₂</option>
          <option value="mod" ${complexOp === 'mod' ? 'selected' : ''}>|z₁| module</option>
          <option value="arg" ${complexOp === 'arg' ? 'selected' : ''}>arg(z₁)</option>
          <option value="conj" ${complexOp === 'conj' ? 'selected' : ''}>z̄₁ conjugué</option>
          <option value="pow2" ${complexOp === 'pow2' ? 'selected' : ''}>z₁²</option>
        </select>
      </div>

      ${needsZ2 ? `<div style="margin-bottom:8px">
        <div style="font-size:11px;color:#888;margin-bottom:3px">z₂ = a + bi</div>
        <div style="display:flex;gap:6px">
          <div style="flex:1">
            <label style="font-size:10px;color:#666">a (réel)</label>
            <input id="c-a2" type="number" value="${ca2}"
              style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
          </div>
          <div style="flex:1">
            <label style="font-size:10px;color:#666">b (imag)</label>
            <input id="c-b2" type="number" value="${cb2}"
              style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box" />
          </div>
        </div>
      </div>` : ''}

      <button id="c-btn"
        style="width:100%;background:#3a6bc4;color:#fff;border:none;padding:7px;font-size:13px;cursor:pointer;margin-bottom:10px">
        Calculer
      </button>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:12px;margin-bottom:8px">⚠ ${errorMsg}</div>` : ''}
      ${result ? `
        <div style="background:#2a2a3e;border:1px solid #444;padding:10px">
          ${result.extra ? `<div style="color:#ffd97d;font-size:12px;margin-bottom:4px">${result.extra}</div>` : ''}
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="color:#888;font-size:11px">Cartésien</span>
            <span style="color:#a0ff9f;font-size:14px;font-weight:bold">${result.cartesian}</span>
          </div>
          <div style="display:flex;justify-content:space-between">
            <span style="color:#888;font-size:11px">Polaire</span>
            <span style="color:#a0c4ff;font-size:12px">${result.polar}</span>
          </div>
        </div>` : ''}
    </div>
  `;

  screenEl.querySelector('#c-op').addEventListener('change', e => { complexOp = e.target.value; result = null; render(screenEl, _state); });
  screenEl.querySelector('#c-btn').addEventListener('click', () => {
    ca1 = screenEl.querySelector('#c-a1').value;
    cb1 = screenEl.querySelector('#c-b1').value;
    if (needsZ2) {
      ca2 = screenEl.querySelector('#c-a2').value;
      cb2 = screenEl.querySelector('#c-b2').value;
    }
    calculate();
    render(screenEl, _state);
  });
}
