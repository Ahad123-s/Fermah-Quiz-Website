const questions = [
  {
    question: "According to the Overview page, Fermah is described as a:",
    choices: [
      "Centralized proof-service provider",
      "Universal proof market",
      "Dedicated to one specific proof system",
      "Blockchain network only for token transfers"
    ],
    correct: 1
  },
  {
    question: "On the supply side, Fermah’s market consists of machines such as GPUs run by:",
    choices: [
      "End-users of DApps",
      "Smart contract developers",
      "EigenLayer Operators",
      "Proof consumers only"
    ],
    correct: 2
  },
  {
    question: "The Overview states that on the demand side, Fermah can generate proofs for:",
    choices: [
      "Only one chain",
      "Only one proof system",
      "Any instance in which ZK is used",
      "Only non-zero-knowledge proofs"
    ],
    correct: 2
  },
  {
    question: "The Matchmaker component in Fermah is meant to:",
    choices: [
      "Allocate resources inefficiently",
      "Ensure high cost for proving",
      "Handle only trivial workflows",
      "Ensure efficient allocation of resources while maintaining competitive pricing"
    ],
    correct: 3
  },
  {
    question: "Fermah is designed to support all proof systems, including which of the following?",
    choices: [
      "zkVMs, zkEVMs, and Groth16",
      "Only Groth16",
      "Only zkEVMs",
      "Only zkSNARKs unrelated to those mentioned"
    ],
    correct: 0
  },
  {
    question: "The “Why Fermah?” page states that generating zero-knowledge proofs is resource-intensive because it requires:",
    choices: [
      "Only software tools",
      "No infrastructure",
      "Expensive, powerful physical infrastructure",
      "Free and widely available machines"
    ],
    correct: 2
  },
  {
    question: "A problem identified on the “Why Fermah?” page is that even if infrastructure is deployed, it faces:",
    choices: [
      "High utilization rate",
      "Extremely low cost",
      "Low utilization rate",
      "No maintenance needs"
    ],
    correct: 2
  },
  {
    question: "The “Why Fermah?” page summarizes the state of proof generation today as:",
    choices: [
      "Cheap, fast, and reliable",
      "Expensive, slow, and unreliable",
      "Cost-free and instantaneous",
      "Universally available without error"
    ],
    correct: 1
  },
  {
    question: "Fermah’s network design is described in the Overview as having a “lean mechanism design” which:",
    choices: [
      "Increases cost of generating proofs",
      "Keeps cost high and utilization low",
      "Minimizes the cost of generating proofs",
      "Ignores machine utilization"
    ],
    correct: 2
  },
  {
    question: "The overall sum of Fermah’s components (supply, demand, Matchmaker, orchestration) enables:",
    choices: [
      "Proving only one proof system",
      "Universal proving — proofs for any proof system, chain, or VM",
      "Only token transactions",
      "Only non-zero-knowledge workflows"
    ],
    correct: 1
  }
];

const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreEl = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let selectedAnswers = Array(questions.length).fill(null);

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1}: ${q.question}`;
  choicesEl.innerHTML = "";

  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.textContent = `${String.fromCharCode(65 + i)}. ${choice}`;
    btn.classList.add("choice-btn");
    btn.onclick = () => selectAnswer(i);
    if (selectedAnswers[currentQuestion] === i) {
      btn.style.backgroundColor = "#004d40";
    }
    choicesEl.appendChild(btn);
  });

  prevBtn.style.display = currentQuestion > 0 ? "inline-block" : "none";
}

function selectAnswer(index) {
  selectedAnswers[currentQuestion] = index;
}

nextBtn.onclick = () => {
  if (selectedAnswers[currentQuestion] == null)
    return alert("Please select an answer!");
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    finishQuiz();
  }
};

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
};

function finishQuiz() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  score = selectedAnswers.reduce(
    (acc, ans, i) => acc + (ans === questions[i].correct ? 1 : 0),
    0
  );
  scoreEl.textContent = score;
}

restartBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  selectedAnswers.fill(null);
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
};

startBtn.onclick = startQuiz;
