
const { drawCard, SpinWheel, PlayerChance } = window.MIL;

const screens = new Map(
  Array.from(document.querySelectorAll('.screen')).map((el) => [el.dataset.screen, el])
);
const homeBtn = document.getElementById('homeBtn');
const roundPill = document.getElementById('roundPill');
const roundPillText = document.getElementById('roundPillText');

const splashTapTarget = document.getElementById('splashTapTarget');

const btnPlay = document.getElementById('btnPlay');
const btnMultiplayer = document.getElementById('btnMultiplayer');
const btnTutorial = document.getElementById('btnTutorial');
const btnPolicy = document.getElementById('btnPolicy');

const playerCountButtons = document.querySelectorAll('[data-players]');

const chanceLabel = document.getElementById('chanceLabel');
const chanceStatus = document.getElementById('chanceStatus');
const chancePad = document.getElementById('chancePad');
const chancePadHint = document.getElementById('chancePadHint');
const chanceRetry = document.getElementById('chanceRetry');

const turnBadge = document.getElementById('turnBadge');
const btnSpin = document.getElementById('btnSpin');
const wheelEl = document.getElementById('wheel');
const wheelResult = document.getElementById('wheelResult');

const categoryPill = document.getElementById('categoryPill');
const quizCard = document.getElementById('quizCard');
const quizQuestion = document.getElementById('quizQuestion');
const quizAnswers = document.getElementById('quizAnswers');
const quizExplanation = document.getElementById('quizExplanation');
const btnNextTurn = document.getElementById('btnNextTurn');

// Screens that show the persistent round pill / home button.
const GAMEPLAY_SCREENS = new Set(['playerChance', 'wheel', 'card']);
const NO_HOME_SCREENS = new Set(['splash', 'menu']);

const state = {
  mode: null, 
  playerCount: 4,
  round: 1,
  currentTurn: null,
};

const wheel = new SpinWheel(wheelEl);
const playerChance = new PlayerChance({
  pad: chancePad,
  hint: chancePadHint,
  status: chanceStatus,
  retryBtn: chanceRetry,
});

function showScreen(name) {
  screens.forEach((el, key) => {
    el.classList.toggle('active', key === name);
  });
  homeBtn.hidden = NO_HOME_SCREENS.has(name);
  roundPill.hidden = !GAMEPLAY_SCREENS.has(name);
  if (GAMEPLAY_SCREENS.has(name)) {
    roundPillText.textContent = `Round ${state.round}`;
  }
  const active = screens.get(name);
  if (active) active.scrollTop = 0;
}

splashTapTarget.addEventListener('click', () => showScreen('menu'));

btnPlay.addEventListener('click', () => {
  state.mode = 'single';
  state.round = 1;
  state.currentTurn = null;
  showScreen('wheel');
});

btnMultiplayer.addEventListener('click', () => showScreen('playerCount'));
btnTutorial.addEventListener('click', () => showScreen('tutorial'));
btnPolicy.addEventListener('click', () => showScreen('policy'));

playerCountButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    state.mode = 'multi';
    state.playerCount = Number(btn.dataset.players);
    state.round = 1;
    startPlayerChance();
  });
});

homeBtn.addEventListener('click', () => {
  state.mode = null;
  state.currentTurn = null;
  showScreen('menu');
});

function startPlayerChance() {
  showScreen('playerChance');
  chanceLabel.textContent = 'Tap together!';
  playerChance.start(state.playerCount).then((winnerColor) => {
    state.currentTurn = winnerColor;
    showScreen('wheel');
    updateTurnBadge();
  });
}

function updateTurnBadge() {
  if (state.mode === 'multi' && state.currentTurn) {
    turnBadge.hidden = false;
    turnBadge.textContent = `${state.currentTurn.name}'s turn to spin`;
    turnBadge.style.background = state.currentTurn.hex;
    turnBadge.style.color = '#fff';
  } else {
    turnBadge.hidden = true;
  }
}

btnSpin.addEventListener('click', async () => {
  btnSpin.disabled = true;
  wheelResult.textContent = 'Spinning…';
  const winner = await wheel.spin();
  wheelResult.textContent = `${winner.name}!`;
  setTimeout(() => {
    showCard(winner.id);
    btnSpin.disabled = false;
  }, 900);
});

const ICON_CORRECT = '\u2713'; 
const ICON_INCORRECT = '\u2715'; 

function showCard(categoryId) {
  const card = drawCard(categoryId);

  categoryPill.textContent = card.category.name;
  categoryPill.style.background = card.category.hex;
  categoryPill.style.boxShadow = `0 4px 0 ${card.category.hexDark}`;

  quizCard.style.setProperty('--cat-color', card.category.hex);

  quizQuestion.textContent = card.question;

  quizExplanation.hidden = true;
  quizExplanation.textContent = card.explanation;

  quizAnswers.innerHTML = '';
  quizAnswers.dataset.locked = 'false';
  const letters = ['A', 'B', 'C', 'D'];

  card.options.forEach((optionText, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.innerHTML = `
      <span class="quiz-option-letter">${letters[index]}.</span>
      <span class="quiz-option-text"></span>
      <span class="quiz-option-icon" aria-hidden="true"></span>
    `;
    btn.querySelector('.quiz-option-text').textContent = optionText;

    btn.addEventListener('click', () => {
      
      if (quizAnswers.dataset.locked === 'true') return;
      quizAnswers.dataset.locked = 'true';

      const allButtons = Array.from(quizAnswers.querySelectorAll('.quiz-option'));

      allButtons.forEach((otherBtn, otherIndex) => {
        otherBtn.disabled = true; 

        if (otherIndex === card.correctIndex) {

          otherBtn.classList.add('is-correct');
          otherBtn.querySelector('.quiz-option-icon').textContent = ICON_CORRECT;
        } else if (otherIndex === index) {

          otherBtn.classList.add('is-incorrect');
          otherBtn.querySelector('.quiz-option-icon').textContent = ICON_INCORRECT;
        } else {
          otherBtn.classList.add('is-dimmed');
        }
      });

      quizExplanation.hidden = false;
    });

    quizAnswers.appendChild(btn);
  });

  wheelResult.textContent = '\u00A0';
  showScreen('card');
}

btnNextTurn.addEventListener('click', () => {
  state.round += 1;
  if (state.mode === 'multi') {
    startPlayerChance();
  } else {
    showScreen('wheel');
  }
});

showScreen('splash');
