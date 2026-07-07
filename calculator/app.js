let expr = '', result = '0', lastWasOp = false;
const exprEl = document.getElementById('expr');
const resultEl = document.getElementById('result');

function update() { exprEl.textContent = expr; resultEl.textContent = result; }

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => handle(btn.dataset));
});

document.addEventListener('keydown', e => {
  if ('0123456789'.includes(e.key)) handle({value: e.key});
  else if ('+-*/'.includes(e.key)) handle({value: e.key});
  else if (e.key === 'Enter' || e.key === '=') handle({action: 'equals'});
  else if (e.key === 'Backspace') { expr = expr.slice(0,-1); update(); }
  else if (e.key === 'Escape') handle({action: 'clear'});
  else if (e.key === '.') handle({value: '.'});
});

function handle({value, action}) {
  if (value !== undefined) { expr += value; try { result = String(eval(expr)); } catch { result = '...'; } }
  else if (action === 'clear') { expr = ''; result = '0'; }
  else if (action === 'equals') { try { result = String(eval(expr)); expr = result; } catch { result = 'Error'; } }
  else if (action === 'sign') { expr = expr ? String(eval(expr) * -1) : '0'; result = expr; }
  else if (action === 'percent') { try { result = String(eval(expr) / 100); expr = result; } catch {} }
  update();
}
