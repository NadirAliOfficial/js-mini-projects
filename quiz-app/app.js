const questions = [
  { q: "What does HTML stand for?", options: ["Hyper Text Markup Language","High Tech Modern Language","Hyper Transfer Markup Logic","Home Tool Markup Language"], answer: 0 },
  { q: "Which language runs in a browser?", options: ["Java","C++","Python","JavaScript"], answer: 3 },
  { q: "What does CSS stand for?", options: ["Computer Style Sheets","Creative Style System","Cascading Style Sheets","Colorful Style Syntax"], answer: 2 },
  { q: "Which tag is used for links in HTML?", options: ["<link>","<a>","<href>","<url>"], answer: 1 },
  { q: "What is the correct way to declare a JavaScript variable?", options: ["v name = 5","var name = 5","variable name = 5","x = int 5"], answer: 1 },
];

let current = 0, score = 0;
const qNum = document.getElementById('q-num');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');

function load() {
  const q = questions[current];
  qNum.textContent = `Question ${current+1} of ${questions.length}`;
  questionEl.textContent = q.q;
  optionsEl.innerHTML = '';
  nextBtn.classList.add('hidden');
  progressBar.style.width = `${(current/questions.length)*100}%`;
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.addEventListener('click', () => select(btn, i, q.answer));
    optionsEl.appendChild(btn);
  });
}

function select(btn, i, answer) {
  document.querySelectorAll('.options button').forEach(b => b.disabled = true);
  if (i === answer) { btn.classList.add('correct'); score++; }
  else { btn.classList.add('wrong'); document.querySelectorAll('.options button')[answer].classList.add('correct'); }
  nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  current++;
  if (current < questions.length) load();
  else {
    document.getElementById('quiz-box').classList.add('hidden');
    const result = document.getElementById('result');
    result.classList.remove('hidden');
    document.getElementById('score').textContent = `${score} / ${questions.length} correct`;
  }
});

document.getElementById('restart-btn').addEventListener('click', () => {
  current = 0; score = 0;
  document.getElementById('quiz-box').classList.remove('hidden');
  document.getElementById('result').classList.add('hidden');
  load();
});

load();
