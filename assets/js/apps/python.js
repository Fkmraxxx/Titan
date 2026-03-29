/**
 * Python — REPL simplifié (évaluation d'expressions mathématiques)
 */

// Historique et variables du REPL
let history = [];
let current = '';
const vars = {};

// Regex whitelist : chiffres, opérateurs, fonctions Math, variables alphanum, espaces
const SAFE_RE = /^[0-9+\-*/^().\s,nxMathsincotaglqrpube_A-Z=]+$/i;

function pyEval(input) {
  const trimmed = input.trim();
  if (!trimmed) return '';

  // Affectation de variable : x = expr
  const assignMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
  if (assignMatch) {
    const varName = assignMatch[1];
    const expr = assignMatch[2];
    const val = evalExpr(expr);
    vars[varName] = val;
    return `${varName} = ${val}`;
  }

  return String(evalExpr(trimmed));
}

function evalExpr(expr) {
  // Remplace les noms de variables connus
  let processed = expr.replace(/\^/g, '**');
  // Injecte les variables utilisateur
  const varNames = Object.keys(vars);
  // Construit la liste des paramètres de la Function
  const paramNames = varNames.concat(['Math']);
  const paramVals = varNames.map(k => vars[k]).concat([Math]);

  // Sécurité : whitelist élargie (autorise noms de variables)
  const safe = /^[0-9+\-*/().\s,_a-zA-Z]+$/;
  if (!safe.test(processed)) throw new Error('Expression non autorisée');

  return new Function(...paramNames, 'return ' + processed)(...paramVals);
}

function execute(input) {
  let output;
  try {
    output = pyEval(input);
  } catch (e) {
    output = 'Erreur: ' + e.message;
  }
  history.push({ input, output });
}

export function render(screenEl, _state) {
  const histHtml = history.map(h => `
    <div style="margin-bottom:4px">
      <div style="color:#a0c4ff">>>> ${escHtml(h.input)}</div>
      <div style="color:${String(h.output).startsWith('Erreur') ? '#ff6b6b' : '#a0ff9f'}">${escHtml(String(h.output))}</div>
    </div>`).join('');

  screenEl.innerHTML = `
    <div style="font-family:'Courier New',monospace;padding:10px;color:#e0e0e0;height:100%;box-sizing:border-box;display:flex;flex-direction:column;background:#0d1117">
      <div style="font-size:13px;color:#a0c4ff;font-weight:bold;margin-bottom:8px;border-bottom:1px solid #333;padding-bottom:6px">
        Py REPL
      </div>

      <div id="py-hist" style="flex:1;overflow-y:auto;font-size:11px;margin-bottom:8px;min-height:60px">
        ${histHtml || '<span style="color:#555">Entrez une expression...</span>'}
      </div>

      <div style="font-size:10px;color:#555;margin-bottom:4px">Fonctions: Math.sin, Math.cos, Math.sqrt, Math.PI... | Variables: x = 3</div>

      <div style="display:flex;gap:6px">
        <span style="color:#a0c4ff;font-size:12px;align-self:center">>>></span>
        <input id="py-input" type="text" value="${escAttr(current)}"
          style="flex:1;background:#1a1a2e;color:#e0e0e0;border:1px solid #444;padding:4px;font-size:12px" />
        <button id="py-enter"
          style="background:#3a6bc4;color:#fff;border:none;padding:4px 10px;font-size:12px;cursor:pointer">
          ↵
        </button>
        <button id="py-clear"
          style="background:#4a2a2a;color:#ff6b6b;border:none;padding:4px 8px;font-size:11px;cursor:pointer">
          ✕
        </button>
      </div>
    </div>
  `;

  const inputEl = screenEl.querySelector('#py-input');
  const histEl = screenEl.querySelector('#py-hist');

  // Scroll vers le bas
  histEl.scrollTop = histEl.scrollHeight;

  function submit() {
    const val = inputEl.value.trim();
    if (!val) return;
    current = '';
    execute(val);
    render(screenEl, _state);
  }

  screenEl.querySelector('#py-enter').addEventListener('click', submit);
  inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
  inputEl.addEventListener('input', e => { current = e.target.value; });

  screenEl.querySelector('#py-clear').addEventListener('click', () => {
    history = [];
    current = '';
    render(screenEl, _state);
  });

  inputEl.focus();
}

function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

function escAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}
