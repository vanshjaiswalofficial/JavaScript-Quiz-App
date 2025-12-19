const questions = [
  { q: "Which data structure uses LIFO (Last In First Out)?", choices: ["Queue","Stack","Tree","Graph"], answer: 1 },
  { q: "Which keyword declares a constant in JavaScript?", choices: ["let","var","const","fixed"], answer: 2 },
  { q: "What does HTML stand for?", choices: ["Hyper Text Markup Language","High Transfer Markup Language","Hyperlink Text Markdown Language","Hyper Tool Markup Language"], answer: 0 },
  { q: "Which loop runs a known number of times?", choices: ["while loop","do-while loop","for loop","forever loop"], answer: 2 },
  { q: "Which symbol starts a single-line comment in JavaScript?", choices: ["/*","//","#","--"], answer: 1 }
];

let current = 0;
let score = 0;

const totalEl = document.getElementById('total');
const currentEl = document.getElementById('current');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const resultEl = document.getElementById('result');
const scoreText = document.getElementById('scoreText');
const restartBtn = document.getElementById('restartBtn');

totalEl.textContent = questions.length;

function showQuestion() {
  const q = questions[current];
  currentEl.textContent = current + 1;
  questionEl.textContent = q.q;
  optionsEl.innerHTML = '';
  nextBtn.disabled = true;
  resultEl.classList.add('hidden');

  q.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = choice;
    btn.dataset.index = idx;
    btn.addEventListener('click', handleChoice);
    optionsEl.appendChild(btn);
  });
}

function handleChoice(e) {
  const chosen = parseInt(e.currentTarget.dataset.index, 10);
  const q = questions[current];
  // disable all
  const buttons = Array.from(optionsEl.querySelectorAll('button'));
  buttons.forEach(b => { b.classList.add('disabled'); b.disabled = true; });

  if (chosen === q.answer) {
    e.currentTarget.classList.add('correct');
    score += 1;
  } else {
    e.currentTarget.classList.add('wrong');
    // highlight correct
    const correctBtn = buttons.find(b => parseInt(b.dataset.index,10) === q.answer);
    if (correctBtn) correctBtn.classList.add('correct');
  }
  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  current += 1;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector('.quiz-card').classList.add('hidden');
  resultEl.classList.remove('hidden');
  scoreText.textContent = `${score} out of ${questions.length}`;
}

restartBtn.addEventListener('click', () => {
  current = 0; score = 0;
  document.querySelector('.quiz-card').classList.remove('hidden');
  showQuestion();
});

// initial
showQuestion();
