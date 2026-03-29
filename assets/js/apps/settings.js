/**
 * Settings — Paramètres de la calculatrice
 */

const STORAGE_KEY = 'titanSettings';

const DEFAULTS = {
  angleMode: 'deg',
  theme: 'dark',
  precision: 6,
  language: 'fr'
};

/** Retourne les paramètres actuels depuis localStorage */
export function getSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return Object.assign({}, DEFAULTS, JSON.parse(stored));
  } catch (_) { /* ignore */ }
  return Object.assign({}, DEFAULTS);
}

function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (_) { /* ignore */ }
}

export function render(screenEl, _state) {
  const settings = getSettings();

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:10px;border-bottom:1px solid #333;padding-bottom:6px">
        ⚙ Paramètres
      </div>

      <div style="margin-bottom:10px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">Mode angulaire</label>
        <select id="s-angle" style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:5px;font-size:12px">
          <option value="deg" ${settings.angleMode === 'deg' ? 'selected' : ''}>Degrés (DEG)</option>
          <option value="rad" ${settings.angleMode === 'rad' ? 'selected' : ''}>Radians (RAD)</option>
        </select>
      </div>

      <div style="margin-bottom:10px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">Thème</label>
        <select id="s-theme" style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:5px;font-size:12px">
          <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>Sombre (dark)</option>
          <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>Clair (light)</option>
        </select>
      </div>

      <div style="margin-bottom:10px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">Précision (chiffres significatifs)</label>
        <input id="s-precision" type="range" min="4" max="12" step="1" value="${settings.precision}"
          style="width:100%;accent-color:#3a6bc4" />
        <div id="s-prec-val" style="font-size:11px;color:#a0c4ff;text-align:right">${settings.precision} chiffres</div>
      </div>

      <div style="margin-bottom:10px">
        <label style="font-size:11px;color:#888;display:block;margin-bottom:3px">Langue</label>
        <select id="s-lang" style="width:100%;background:#2a2a3e;color:#e0e0e0;border:1px solid #444;padding:5px;font-size:12px">
          <option value="fr" ${settings.language === 'fr' ? 'selected' : ''}>Français</option>
          <option value="en" ${settings.language === 'en' ? 'selected' : ''}>English</option>
        </select>
      </div>

      <button id="s-save"
        style="width:100%;background:#3a6bc4;color:#fff;border:none;padding:8px;font-size:13px;cursor:pointer;margin-bottom:10px">
        💾 Sauvegarder
      </button>

      <div id="s-msg" style="font-size:12px;color:#a0ff9f;text-align:center;min-height:18px"></div>

      <div style="background:#2a2a3e;border:1px solid #333;padding:8px;font-size:11px;margin-top:8px">
        <div style="color:#888;margin-bottom:4px">Paramètres actuels:</div>
        <div style="display:flex;justify-content:space-between"><span style="color:#555">Angles</span><span style="color:#a0c4ff">${settings.angleMode.toUpperCase()}</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:#555">Thème</span><span style="color:#a0c4ff">${settings.theme}</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:#555">Précision</span><span style="color:#a0c4ff">${settings.precision}</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:#555">Langue</span><span style="color:#a0c4ff">${settings.language}</span></div>
      </div>
    </div>
  `;

  // Mise à jour de l'affichage de la précision
  screenEl.querySelector('#s-precision').addEventListener('input', e => {
    screenEl.querySelector('#s-prec-val').textContent = e.target.value + ' chiffres';
  });

  screenEl.querySelector('#s-save').addEventListener('click', () => {
    const newSettings = {
      angleMode: screenEl.querySelector('#s-angle').value,
      theme: screenEl.querySelector('#s-theme').value,
      precision: parseInt(screenEl.querySelector('#s-precision').value),
      language: screenEl.querySelector('#s-lang').value
    };
    saveSettings(newSettings);
    const msg = screenEl.querySelector('#s-msg');
    msg.textContent = '✓ Paramètres sauvegardés';
    setTimeout(() => { if (msg) msg.textContent = ''; }, 2000);
    render(screenEl, _state);
  });
}
