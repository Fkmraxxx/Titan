/**
 * Elements — Tableau périodique (20 premiers éléments + quelques importants)
 */

const ELEMENTS = [
  { z: 1,  sym: 'H',  name: 'Hydrogène',   mass: 1.008,   cat: 'nonmetal' },
  { z: 2,  sym: 'He', name: 'Hélium',       mass: 4.0026,  cat: 'noble' },
  { z: 3,  sym: 'Li', name: 'Lithium',      mass: 6.941,   cat: 'alkali' },
  { z: 4,  sym: 'Be', name: 'Béryllium',    mass: 9.0122,  cat: 'alkaline' },
  { z: 5,  sym: 'B',  name: 'Bore',         mass: 10.81,   cat: 'metalloid' },
  { z: 6,  sym: 'C',  name: 'Carbone',      mass: 12.011,  cat: 'nonmetal' },
  { z: 7,  sym: 'N',  name: 'Azote',        mass: 14.007,  cat: 'nonmetal' },
  { z: 8,  sym: 'O',  name: 'Oxygène',      mass: 15.999,  cat: 'nonmetal' },
  { z: 9,  sym: 'F',  name: 'Fluor',        mass: 18.998,  cat: 'halogen' },
  { z: 10, sym: 'Ne', name: 'Néon',         mass: 20.18,   cat: 'noble' },
  { z: 11, sym: 'Na', name: 'Sodium',       mass: 22.99,   cat: 'alkali' },
  { z: 12, sym: 'Mg', name: 'Magnésium',    mass: 24.305,  cat: 'alkaline' },
  { z: 13, sym: 'Al', name: 'Aluminium',    mass: 26.982,  cat: 'metal' },
  { z: 14, sym: 'Si', name: 'Silicium',     mass: 28.086,  cat: 'metalloid' },
  { z: 15, sym: 'P',  name: 'Phosphore',    mass: 30.974,  cat: 'nonmetal' },
  { z: 16, sym: 'S',  name: 'Soufre',       mass: 32.06,   cat: 'nonmetal' },
  { z: 17, sym: 'Cl', name: 'Chlore',       mass: 35.45,   cat: 'halogen' },
  { z: 18, sym: 'Ar', name: 'Argon',        mass: 39.948,  cat: 'noble' },
  { z: 19, sym: 'K',  name: 'Potassium',    mass: 39.098,  cat: 'alkali' },
  { z: 20, sym: 'Ca', name: 'Calcium',      mass: 40.078,  cat: 'alkaline' },
  { z: 26, sym: 'Fe', name: 'Fer',          mass: 55.845,  cat: 'metal' },
  { z: 29, sym: 'Cu', name: 'Cuivre',       mass: 63.546,  cat: 'metal' },
  { z: 47, sym: 'Ag', name: 'Argent',       mass: 107.87,  cat: 'metal' },
  { z: 79, sym: 'Au', name: 'Or',           mass: 196.97,  cat: 'metal' },
  { z: 82, sym: 'Pb', name: 'Plomb',        mass: 207.2,   cat: 'metal' },
  { z: 92, sym: 'U',  name: 'Uranium',      mass: 238.03,  cat: 'actinide' },
];

const CAT_COLORS = {
  alkali:    '#ff9f9f',
  alkaline:  '#ffd97d',
  metal:     '#a0c4ff',
  metalloid: '#caffbf',
  nonmetal:  '#9bf6ff',
  halogen:   '#ffc6ff',
  noble:     '#fdffb6',
  actinide:  '#ffa07a',
};

let selectedElement = null;
let searchStr = '';

function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

export function render(screenEl, _state) {
  const filtered = searchStr
    ? ELEMENTS.filter(e =>
        e.name.toLowerCase().includes(searchStr.toLowerCase()) ||
        e.sym.toLowerCase().includes(searchStr.toLowerCase()) ||
        String(e.z).includes(searchStr))
    : ELEMENTS;

  const detailHtml = selectedElement ? (() => {
    const e = selectedElement;
    const color = CAT_COLORS[e.cat] || '#e0e0e0';
    return `
      <div style="background:#2a2a3e;border:1px solid #444;padding:8px;margin-bottom:8px;display:flex;gap:10px;align-items:center">
        <div style="font-size:32px;font-weight:bold;color:${color};min-width:44px;text-align:center">${escHtml(e.sym)}</div>
        <div>
          <div style="font-size:14px;color:#e0e0e0">${escHtml(e.name)}</div>
          <div style="font-size:11px;color:#888">Z = ${e.z} | M = ${e.mass} g/mol</div>
          <div style="font-size:10px;color:${color}">${e.cat}</div>
        </div>
      </div>`;
  })() : '';

  const gridHtml = filtered.map(e => {
    const color = CAT_COLORS[e.cat] || '#e0e0e0';
    const selected = selectedElement && selectedElement.z === e.z;
    return `
      <div class="elem-card" data-z="${e.z}"
        style="background:${selected ? '#3a6bc4' : '#2a2a3e'};border:1px solid ${selected ? '#6699ff' : '#444'};
          padding:4px 6px;cursor:pointer;text-align:center;min-width:44px">
        <div style="font-size:9px;color:#888">${e.z}</div>
        <div style="font-size:14px;font-weight:bold;color:${color}">${escHtml(e.sym)}</div>
        <div style="font-size:8px;color:#666;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:44px">${escHtml(e.name)}</div>
        <div style="font-size:8px;color:#555">${e.mass}</div>
      </div>`;
  }).join('');

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:10px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:8px;border-bottom:1px solid #333;padding-bottom:6px">
        H Éléments
      </div>

      <input id="elem-search" type="text" value="${escHtml(searchStr)}" placeholder="Rechercher (nom, symbole, Z)..."
        style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px;box-sizing:border-box;margin-bottom:8px" />

      ${detailHtml}

      <div style="display:flex;flex-wrap:wrap;gap:4px">
        ${gridHtml}
      </div>
    </div>
  `;

  screenEl.querySelector('#elem-search').addEventListener('input', e => {
    searchStr = e.target.value;
    render(screenEl, _state);
  });

  screenEl.querySelectorAll('.elem-card').forEach(card => {
    card.addEventListener('click', () => {
      const z = parseInt(card.dataset.z);
      selectedElement = ELEMENTS.find(e => e.z === z) || null;
      render(screenEl, _state);
    });
  });
}
