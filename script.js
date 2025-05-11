const quizData = [
  { question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris' },
  { question: 'What is the largest planet in our solar system?', options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'], answer: 'Jupiter' },
  { question: 'Which country won the FIFA World Cup in 2018?', options: ['Brazil', 'Germany', 'France', 'Argentina'], answer: 'France' },
  { question: 'What is the tallest mountain in the world?', options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'], answer: 'Mount Everest' },
  { question: 'Which is the largest ocean on Earth?', options: ['Pacific Ocean', 'Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean'], answer: 'Pacific Ocean' },
  { question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Cu', 'Fe'], answer: 'Au' },
  { question: 'Who painted the Mona Lisa?', options: ['Pablo Picasso', 'Vincent van Gogh', 'Leonardo da Vinci', 'Michelangelo'], answer: 'Leonardo da Vinci' },
  { question: 'Which planet is known as the Red Planet?', options: ['Mars', 'Venus', 'Mercury', 'Uranus'], answer: 'Mars' },
  { question: 'What is the largest species of shark?', options: ['Great White Shark', 'Whale Shark', 'Tiger Shark', 'Hammerhead Shark'], answer: 'Whale Shark' },
  { question: 'Which animal is known as the King of the Jungle?', options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'], answer: 'Lion' },
];

const quizEl = document.getElementById('quiz');
const resultEl = document.getElementById('result');
const submitBtn = document.getElementById('submit');
const retryBtn = document.getElementById('retry');

let current = 0, score = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function renderQuestion() {
  const { question, options } = quizData[current];
  shuffle(options);
  quizEl.innerHTML = `
    <div class="question">${question}</div>
    <div class="options">
      ${options.map(opt => `
        <label>
          <input type="radio" name="quiz" value="${opt}"> ${opt}
        </label>
      `).join('')}
    </div>
  `;
}

function checkAnswer() {
  const selected = document.querySelector('input[name="quiz"]:checked');
  if (!selected) return;

  if (selected.value === quizData[current].answer) score++;
  current++;

  if (current < quizData.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizEl.style.display = 'none';
  submitBtn.style.display = 'none';
  retryBtn.style.display = 'inline-block';
  resultEl.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  current = 0;
  score = 0;
  resultEl.innerHTML = '';
  quizEl.style.display = 'block';
  submitBtn.style.display = 'inline-block';
  retryBtn.style.display = 'none';
  renderQuestion();
}

submitBtn.onclick = checkAnswer;
retryBtn.onclick = retryQuiz;

renderQuestion();
