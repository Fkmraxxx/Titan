/**
 * Exam — Mode examen (désactive certaines applications)
 */

const STORAGE_KEY = 'titanExamMode';
const RESTRICTED_APPS = ['grapher', 'python', 'programs'];
const RESTRICTED_LABELS = { grapher: 'Grapher', python: 'Python REPL', programs: 'Programmes' };

/** Retourne true si le mode examen est actif */
export function isExamActive() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return !!(data && data.active);
  } catch (_) {
    return false;
  }
}

function getExamData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch (_) {
    return null;
  }
}

function setExamActive(active) {
  if (active) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ active: true, startTime: Date.now() }));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function formatDuration(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

let timerInterval = null;

export function render(screenEl, _state) {
  const data = getExamData();
  const active = !!(data && data.active);

  function updateTimer() {
    const timerEl = screenEl.querySelector('#exam-timer');
    if (!timerEl || !data) return;
    timerEl.textContent = formatDuration(Date.now() - data.startTime);
  }

  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:12px;color:#e0e0e0;height:100%;box-sizing:border-box;overflow:auto;background:#1a1a2e">
      <div style="font-size:14px;color:#a0c4ff;font-weight:bold;margin-bottom:10px;border-bottom:1px solid #333;padding-bottom:6px">
        ! Mode Examen
      </div>

      <!-- Statut -->
      <div style="background:${active ? '#1a3a1a' : '#3a1a1a'};border:2px solid ${active ? '#4a8a4a' : '#8a4a4a'};padding:10px;margin-bottom:12px;text-align:center">
        <div style="font-size:16px;font-weight:bold;color:${active ? '#a0ff9f' : '#ff9f9f'}">
          ${active ? '🔒 Mode Examen ACTIF' : '🔓 Mode Examen INACTIF'}
        </div>
        ${active ? `<div id="exam-timer" style="font-size:20px;color:#ffd97d;margin-top:6px;font-family:'Courier New',monospace">
          ${formatDuration(Date.now() - data.startTime)}
        </div>` : ''}
      </div>

      <!-- Bouton toggle -->
      <button id="exam-toggle"
        style="width:100%;background:${active ? '#8a1a1a' : '#1a5a1a'};color:#fff;border:none;padding:10px;font-size:13px;cursor:pointer;margin-bottom:12px;font-weight:bold">
        ${active ? '🔓 Désactiver le mode examen' : '🔒 Activer le mode examen'}
      </button>

      <!-- Applications restreintes -->
      <div style="margin-bottom:10px">
        <div style="font-size:11px;color:#888;margin-bottom:6px">Applications désactivées en mode examen:</div>
        ${RESTRICTED_APPS.map(id => `
          <div style="display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:1px solid #333">
            <span style="color:${active ? '#ff6b6b' : '#555'};font-size:12px">${active ? '✗' : '○'}</span>
            <span style="color:${active ? '#ff9f9f' : '#666'};font-size:12px">${RESTRICTED_LABELS[id]}</span>
          </div>`).join('')}
      </div>

      <!-- Avertissement -->
      ${active ? `<div style="background:#2a1a00;border:1px solid #664400;padding:8px;font-size:11px;color:#ffd97d">
        ⚠ Le mode examen est actif. Certaines fonctions avancées sont désactivées.
        Désactivez uniquement en fin d'examen.
      </div>` : `<div style="background:#1a1a2e;border:1px solid #333;padding:8px;font-size:10px;color:#555">
        En mode examen, les outils de programmation et de tracé de courbes sont désactivés
        conformément aux règles des examens officiels.
      </div>`}
    </div>
  `;

  // Démarrer ou arrêter le timer
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  if (active) {
    timerInterval = setInterval(updateTimer, 1000);
  }

  screenEl.querySelector('#exam-toggle').addEventListener('click', () => {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    setExamActive(!active);
    render(screenEl, _state);
  });
}

/** Affiche un message d'avertissement si l'app est restreinte en mode examen */
export function renderExamBlock(screenEl, appId) {
  if (!isExamActive() || !RESTRICTED_APPS.includes(appId)) return false;
  screenEl.innerHTML = `
    <div style="font-family:monospace;padding:20px;color:#e0e0e0;height:100%;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#1a1a2e">
      <div style="font-size:32px;margin-bottom:12px">🔒</div>
      <div style="font-size:16px;color:#ff9f9f;font-weight:bold;margin-bottom:8px">Application restreinte</div>
      <div style="font-size:12px;color:#888;text-align:center">
        ${RESTRICTED_LABELS[appId] || appId} est désactivé en mode examen.
      </div>
    </div>
  `;
  return true;
}
