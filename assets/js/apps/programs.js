/**
 * Programs — Éditeur et exécuteur de programmes simples
 */

let code = `PRINT "Bonjour!"
LET x = 5
LET y = x * 3
PRINT y
FOR i = 1 TO 5 DO PRINT i`;
let output = [];
let errorMsg = '';

// Variables du programme
const progVars = {};

function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

function evalExpr(expr, vars) {
  // Remplace les variables
  let processed = expr.trim();
  for (const [k, v] of Object.entries(vars)) {
    processed = processed.replace(new RegExp('\\b' + k + '\\b', 'g'), v);
  }
  processed = processed.replace(/\^/g, '**');
  // Sécurité basique
  if (!/^[0-9+\-*/().\s"'a-zA-Z_]+$/.test(processed)) throw new Error('Expression interdite: ' + expr);
  // Pour les chaînes littérales
  if (/^".*"$/.test(processed.trim()) || /^'.*'$/.test(processed.trim())) {
    return processed.trim().slice(1, -1);
  }
  try {
    // eslint-disable-next-line no-new-func
    return new Function('return ' + processed)();
  } catch {
    return processed;
  }
}

function runProgram(lines, vars) {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || line.startsWith('//') || line.startsWith('#')) { i++; continue; }

    // PRINT expr
    const printMatch = line.match(/^PRINT\s+(.+)$/i);
    if (printMatch) {
      try { out.push(String(evalExpr(printMatch[1], vars))); }
      catch (e) { out.push('ERR: ' + e.message); }
      i++; continue;
    }

    // LET var = expr
    const letMatch = line.match(/^LET\s+([a-zA-Z_]\w*)\s*=\s*(.+)$/i);
    if (letMatch) {
      try { vars[letMatch[1]] = evalExpr(letMatch[2], vars); }
      catch (e) { out.push('ERR: ' + e.message); }
      i++; continue;
    }

    // IF cond THEN action
    const ifMatch = line.match(/^IF\s+(.+?)\s+THEN\s+(.+)$/i);
    if (ifMatch) {
      try {
        let cond = ifMatch[1];
        for (const [k, v] of Object.entries(vars)) {
          cond = cond.replace(new RegExp('\\b' + k + '\\b', 'g'), v);
        }
        cond = cond.replace(/\^/g, '**');
        // eslint-disable-next-line no-new-func
        const condVal = new Function('return ' + cond)();
        if (condVal) {
          const subLine = ifMatch[2].trim();
          const subPrint = subLine.match(/^PRINT\s+(.+)$/i);
          if (subPrint) out.push(String(evalExpr(subPrint[1], vars)));
        }
      } catch (e) { out.push('ERR: ' + e.message); }
      i++; continue;
    }

    // FOR var = from TO to DO action
    const forMatch = line.match(/^FOR\s+([a-zA-Z_]\w*)\s*=\s*(.+?)\s+TO\s+(.+?)\s+DO\s+(.+)$/i);
    if (forMatch) {
      try {
        const varName = forMatch[1];
        const fromVal = evalExpr(forMatch[2], vars);
        const toVal = evalExpr(forMatch[3], vars);
        const doLine = forMatch[4].trim();
        if (Math.abs(toVal - fromVal) > 1000) { out.push('ERR: boucle trop longue'); i++; continue; }
        for (let v = fromVal; v <= toVal; v++) {
          vars[varName] = v;
          const subPrint = doLine.match(/^PRINT\s+(.+)$/i);
          if (subPrint) out.push(String(evalExpr(subPrint[1], vars)));
        }
      } catch (e) { out.push('ERR: ' + e.message); }
      i++; continue;
    }

    out.push(`? Ligne inconnue: ${line}`);
    i++;
  }
  return out;
}

function execute() {
  errorMsg = '';
  output = [];
  // Réinitialiser les variables
  for (const k of Object.keys(progVars)) delete progVars[k];
  try {
    const lines = code.split('\n');
    output = runProgram(lines, progVars);
  } catch (e) {
    errorMsg = e.message;
  }
}

export function render(screenEl, _state) {
  screenEl.innerHTML = `
    <div style="font-family:'Courier New',monospace;padding:10px;color:#e0e0e0;height:100%;box-sizing:border-box;display:flex;flex-direction:column;background:#0d1117">
      <div style="font-size:13px;color:#a0c4ff;font-weight:bold;margin-bottom:6px;border-bottom:1px solid #333;padding-bottom:5px">
        &lt;&gt; Programmes
      </div>

      <div style="font-size:10px;color:#555;margin-bottom:4px">
        Commandes: PRINT expr | LET x = expr | IF cond THEN PRINT | FOR i = 1 TO n DO PRINT
      </div>

      <textarea id="prog-code" rows="6"
        style="flex:none;width:100%;background:#1a1a2e;color:#a0c4ff;border:1px solid #444;padding:6px;font-size:11px;font-family:'Courier New',monospace;box-sizing:border-box;resize:vertical;margin-bottom:6px">${escHtml(code)}</textarea>

      <div style="display:flex;gap:6px;margin-bottom:6px">
        <button id="prog-run"
          style="flex:1;background:#3a6bc4;color:#fff;border:none;padding:6px;font-size:12px;cursor:pointer">
          ▶ Exécuter
        </button>
        <button id="prog-clear"
          style="background:#4a2a2a;color:#ff6b6b;border:none;padding:6px 10px;font-size:12px;cursor:pointer">
          ✕ Effacer
        </button>
      </div>

      ${errorMsg ? `<div style="color:#ff6b6b;font-size:11px;margin-bottom:4px">⚠ ${errorMsg}</div>` : ''}

      <div style="flex:1;background:#0a0a14;border:1px solid #333;padding:6px;overflow-y:auto;font-size:11px;min-height:60px">
        <div style="color:#555;font-size:10px;margin-bottom:4px">Sortie:</div>
        ${output.length === 0
          ? '<span style="color:#333">— vide —</span>'
          : output.map(line => `<div style="color:${line.startsWith('ERR') ? '#ff6b6b' : '#a0ff9f'}">${escHtml(line)}</div>`).join('')}
      </div>
    </div>
  `;

  screenEl.querySelector('#prog-run').addEventListener('click', () => {
    code = screenEl.querySelector('#prog-code').value;
    execute();
    render(screenEl, _state);
  });
  screenEl.querySelector('#prog-clear').addEventListener('click', () => {
    output = []; errorMsg = '';
    render(screenEl, _state);
  });
}
