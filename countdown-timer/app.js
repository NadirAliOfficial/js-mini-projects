let total = 0, interval = null, paused = false;
const timeDisplay = document.getElementById('time-display');

function fmt(n) { return String(n).padStart(2, '0'); }
function toStr(s) { return `${fmt(Math.floor(s/3600))}:${fmt(Math.floor(s%3600/60))}:${fmt(s%60)}`; }

function beep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    osc.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.start();
    setTimeout(() => { osc.stop(); ctx.close(); }, 800);
  } catch(e) {}
}

document.getElementById('start-btn').addEventListener('click', () => {
  const h = parseInt(document.getElementById('hours').value) || 0;
  const m = parseInt(document.getElementById('minutes').value) || 0;
  const s = parseInt(document.getElementById('seconds').value) || 0;
  total = h * 3600 + m * 60 + s;
  if (!total) return;
  document.getElementById('setup').classList.add('hidden');
  document.getElementById('display').classList.remove('hidden');
  document.getElementById('done').classList.add('hidden');
  timeDisplay.textContent = toStr(total);
  startTimer();
});

function startTimer() {
  interval = setInterval(() => {
    if (paused) return;
    total--;
    timeDisplay.textContent = toStr(total);
    if (total <= 0) {
      clearInterval(interval);
      document.getElementById('display').classList.add('hidden');
      document.getElementById('done').classList.remove('hidden');
      beep();
    }
  }, 1000);
}

document.getElementById('pause-btn').addEventListener('click', function() {
  paused = !paused;
  this.textContent = paused ? 'Resume' : 'Pause';
});

document.getElementById('reset-btn').addEventListener('click', () => {
  clearInterval(interval); paused = false;
  document.getElementById('display').classList.add('hidden');
  document.getElementById('done').classList.add('hidden');
  document.getElementById('setup').classList.remove('hidden');
});
