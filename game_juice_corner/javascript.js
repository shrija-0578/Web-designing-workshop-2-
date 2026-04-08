/* ==========================================
   JUICE CORNER — game.js
   ========================================== */

const canvas  = document.getElementById('game-canvas');
const ctx     = canvas.getContext('2d');

/* ---- Fruit definitions ---- */
const FRUITS = [
  { id: 'apple',       emoji: '🍎', name: 'Apple',       color: '#e74c3c', barClass: 'bar-apple'       },
  { id: 'banana',      emoji: '🍌', name: 'Banana',      color: '#f9ca24', barClass: 'bar-banana'      },
  { id: 'lychee',      emoji: '🍒', name: 'Lychee',      color: '#fd79a8', barClass: 'bar-lychee'      },
  { id: 'lemon',       emoji: '🍋', name: 'Lemon',       color: '#f6e58d', barClass: 'bar-lemon'       },
  { id: 'watermelon',  emoji: '🍉', name: 'Watermelon',  color: '#6ab04c', barClass: 'bar-watermelon'  },
  { id: 'grape', emoji: '🍇', name: 'Grape', color: '#b31aff', barClass: 'bar-grape' },
];
const FRUITS_PER_GLASS = 5;
const MAX_LIVES        = 5;

/* ---- Game state ---- */
let state = {};
let highScore = 0;
let animId;
let startTime;

function initState() {
  return {
    running: false,
    lives: MAX_LIVES,
    missedFruits: 0,
    fruits: {},          // per-fruit: { count, glasses }
    falling: [],         // active fruit objects on canvas
    basket: { x: 0, w: 440, h: 28, speed: 8 },
    keys: {},
    score: 0,
    lastSpawn: 0,
    spawnInterval: 4000,
  };
}

/* ---- DOM refs ---- */
const livesEl      = document.getElementById('lives-display');
const highScoreEl  = document.getElementById('high-score-val');
const trackerGrid  = document.getElementById('tracker-grid');
const startOverlay = document.getElementById('start-overlay');
const goOverlay    = document.getElementById('gameover-overlay');
const goStats      = document.getElementById('go-stats');
const goTotal      = document.getElementById('go-total');
const startBtn     = document.getElementById('start-btn');
const restartBtn   = document.getElementById('restart-btn');

/* ---- Score flash & miss flash ---- */
let flashEl = document.createElement('div');
flashEl.id = 'score-flash';
document.body.appendChild(flashEl);

let missFlashEl = document.createElement('div');
missFlashEl.id = 'miss-flash';
document.body.appendChild(missFlashEl);

function showFlash(text, color = '#f7b731') {
  flashEl.textContent = text;
  flashEl.style.color = color;
  flashEl.classList.remove('show');
  void flashEl.offsetWidth;
  flashEl.classList.add('show');
}

function triggerMissFlash() {
  missFlashEl.classList.remove('active');
  void missFlashEl.offsetWidth;
  missFlashEl.classList.add('active');
}

/* ==========================================
   CANVAS RESIZE
   ========================================== */
function resizeCanvas() {
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width  = rect.width;
  canvas.height = rect.height;
  if (state.basket) {
    if (state.basket.x === 0) {
      state.basket.x = canvas.width / 2 - state.basket.w / 2;
    }
    state.basket.x = Math.max(0, Math.min(canvas.width - state.basket.w, state.basket.x));
  }
}
window.addEventListener('resize', resizeCanvas);

/* ==========================================
   BUILD TRACKER HUD
   ========================================== */
function buildTracker() {
  trackerGrid.innerHTML = '';
  FRUITS.forEach(f => {
    const div = document.createElement('div');
    div.className = 'tracker-row';
    div.id = `tracker-${f.id}`;
    div.innerHTML = `
      <div class="tracker-top">
        <span class="tracker-count" id="cnt-${f.id}">0</span>
        <span class="tracker-emoji">${f.emoji}</span>
        <span class="tracker-name">${f.name}</span>
      </div>
      <div class="bar-wrap">
        <div class="bar-fill ${f.barClass}" id="bar-${f.id}"></div>
      </div>
      <div class="glass-icons" id="glasses-${f.id}"></div>
    `;
    trackerGrid.appendChild(div);
  });
}

function updateTracker() {
  FRUITS.forEach(f => {
    const fd = state.fruits[f.id];
    const partial = fd.count % FRUITS_PER_GLASS;
    const pct     = (partial / FRUITS_PER_GLASS) * 100;

    document.getElementById(`cnt-${f.id}`).textContent = fd.glasses;
    document.getElementById(`bar-${f.id}`).style.width = pct + '%';

    const glassesEl = document.getElementById(`glasses-${f.id}`);
    const existing = glassesEl.children.length;
    for (let i = existing; i < fd.glasses; i++) {
      const icon = document.createElement('span');
      icon.className = 'glass-icon';
      icon.textContent = '🧃';
      glassesEl.appendChild(icon);
    }
  });
}

/* ==========================================
   LIVES HUD
   ========================================== */
function buildLives() {
  livesEl.innerHTML = '';
  for (let i = 0; i < MAX_LIVES; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.id = `heart-${i}`;
    livesEl.appendChild(h);
  }
}

function updateLives() {
  for (let i = 0; i < MAX_LIVES; i++) {
    const h = document.getElementById(`heart-${i}`);
    h.classList.toggle('lost', i >= state.lives);
  }
}

/* ==========================================
   FRUIT SPAWNING
   ========================================== */
function spawnFruit(now) {
  if (now - state.lastSpawn < state.spawnInterval) return;
  state.lastSpawn = now;

  const f = FRUITS[Math.floor(Math.random() * FRUITS.length)];
  const size = 32 + Math.random() * 24;
  const x    = size + Math.random() * (canvas.width - size * 2);
  const speedY = 2.2 + Math.random() * 1.5 + (state.score * 0.002   );

  state.falling.push({
    fruitId: f.id,
    emoji:   f.emoji,
    x, y: -size,
    size,
    speedY,
    rotation: 0,
    rotSpeed: (Math.random() - 0.5) * 0.07,
  });

  /* Gradually increase difficulty */
  state.spawnInterval = Math.max(600, 1400 - state.score * 8);
}

/* ==========================================
   COLLISION — basket catch
   ========================================== */
function checkCollisions() {
  const b = state.basket;
  const bTop    = canvas.height - 100;
  const bBottom = canvas.height - 52;
  const bLeft   = b.x;
  const bRight  = b.x + b.w;

  state.falling = state.falling.filter(fr => {
    const frBottom = fr.y + fr.size / 2;
    const frX      = fr.x;

    /* Caught */
    if (frBottom >= bTop && frBottom <= bBottom + 20 &&
        frX >= bLeft - 15 && frX <= bRight + 15) {
      collectFruit(fr.fruitId);
      showFlash('+1 ' + fr.emoji);
      return false;
    }

    /* Missed */
    if (fr.y - fr.size > canvas.height) {
      loseLife();
      return false;
    }

    return true;
  });
}

function collectFruit(id) {
  state.fruits[id].count++;
  if (state.fruits[id].count % FRUITS_PER_GLASS === 0) {
    state.fruits[id].glasses++;
    const f = FRUITS.find(x => x.id === id);
    showFlash('🧃 Glass Ready! ' + f.emoji, '#6ab04c');
  }
  state.score++;
  highScoreEl.textContent = Math.max(highScore, state.score);
  updateTracker();
}

function loseLife() {
  state.missedFruits++;   // count missed fruits
  triggerMissFlash();

  if (state.missedFruits === 2) {
    state.lives--;        // lose 1 life after 2 misses
    state.missedFruits = 0;

    updateLives();

    if (state.lives <= 0) {
      endGame();
    }
  }
}

/* ==========================================
   DRAW
   ========================================== */
function drawBackground() {
  /* Subtle scanline vibe */
  ctx.fillStyle = '#0d0b20';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* Dashed ground line */
  ctx.setLineDash([6, 8]);
  ctx.strokeStyle = 'rgba(247,183,49,0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - 80);
  ctx.lineTo(canvas.width, canvas.height - 80);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawFruits() {
  state.falling.forEach(fr => {
    ctx.save();
    ctx.translate(fr.x, fr.y);
    ctx.rotate(fr.rotation);
    ctx.font = `${fr.size}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(fr.emoji, 0, 0);
    ctx.restore();
  });
}

function drawBasket() {
  const b  = state.basket;
  const bx = b.x;
  const by = canvas.height - 80;
  const bw = b.w;
  const bh = 30;

  /* Shadow */
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(bx + bw / 2, by + bh + 4, bw / 2.2, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  /* Basket body */
  const grad = ctx.createLinearGradient(bx, by, bx, by + bh);
  grad.addColorStop(0, '#c8860a');
  grad.addColorStop(1, '#7a4e08');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(bx + 8,      by);
  ctx.lineTo(bx + bw - 8, by);
  ctx.quadraticCurveTo(bx + bw + 4, by, bx + bw,     by + bh * 0.3);
  ctx.lineTo(bx + bw - 10, by + bh);
  ctx.lineTo(bx + 10,       by + bh);
  ctx.lineTo(bx,             by + bh * 0.3);
  ctx.quadraticCurveTo(bx - 4, by, bx + 8, by);
  ctx.closePath();
  ctx.fill();

  /* Weave lines */
  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    const yy = by + (bh / 4) * i;
    ctx.beginPath();
    ctx.moveTo(bx + 2, yy);
    ctx.lineTo(bx + bw - 2, yy);
    ctx.stroke();
  }

  /* Rim highlight */
  ctx.strokeStyle = 'rgba(255,220,100,0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(bx + 8, by + 1);
  ctx.lineTo(bx + bw - 8, by + 1);
  ctx.stroke();
}

/* ==========================================
   GAME LOOP
   ========================================== */
function gameLoop(now) {
  if (!state.running) return;

  resizeCanvas();
  drawBackground();

  /* Move fruits */
  state.falling.forEach(fr => {
    fr.y += fr.speedY;
    fr.rotation += fr.rotSpeed;
  });

  /* Spawn */
  spawnFruit(now);

  /* Basket keyboard movement */
  if (state.keys['ArrowLeft'])  state.basket.x -= state.basket.speed;
  if (state.keys['ArrowRight']) state.basket.x += state.basket.speed;
  state.basket.x = Math.max(0, Math.min(canvas.width - state.basket.w, state.basket.x));

  checkCollisions();
  drawFruits();
  drawBasket();

  animId = requestAnimationFrame(gameLoop);
}

/* ==========================================
   START / END GAME
   ========================================== */
function startGame() {
  state = initState();
  state.running = true;

  FRUITS.forEach(f => {
    state.fruits[f.id] = { count: 0, glasses: 0 };
  });

  resizeCanvas();
  state.basket.x = canvas.width / 2 - state.basket.w / 2;

  buildLives();
  buildTracker();
  updateLives();
  updateTracker();

  highScore = parseInt(highScoreEl.textContent) || 0;

  startOverlay.classList.remove('active');
  goOverlay.classList.remove('active');

  startTime = Date.now();
  cancelAnimationFrame(animId);
  animId = requestAnimationFrame(gameLoop);
}

function endGame() {
  state.running = false;
  cancelAnimationFrame(animId);

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  const mins    = Math.floor(elapsed / 60);
  const secs    = elapsed % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  /* Update high score */
  if (state.score > highScore) {
    highScore = state.score;
    highScoreEl.textContent = highScore;
  }

  /* Build stats */
  goStats.innerHTML = '';
  FRUITS.forEach(f => {
    const g = state.fruits[f.id]?.glasses || 0;
    const card = document.createElement('div');
    card.className = 'go-fruit-card';
    card.innerHTML = `
      <span class="go-emoji">${f.emoji}</span>
      <span class="go-name">${f.name}</span>
      <span class="go-count">${g}</span>
      <span class="go-unit">glass${g !== 1 ? 'es' : ''}</span>
    `;
    goStats.appendChild(card);
  });

  const totalGlasses = FRUITS.reduce((acc, f) => acc + (state.fruits[f.id]?.glasses || 0), 0);
  goTotal.innerHTML = `Total: <span>${totalGlasses} glass${totalGlasses !== 1 ? 'es' : ''}</span> &nbsp;|&nbsp; Time: <span>${timeStr}</span>`;

  goOverlay.classList.add('active');
}

/* ==========================================
   INPUT HANDLERS
   ========================================== */
document.addEventListener('keydown', e => {
  state.keys[e.key] = true;
  if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight')) e.preventDefault();
});
document.addEventListener('keyup',  e => { state.keys[e.key] = false; });

canvas.addEventListener('mousemove', e => {
  if (!state.running) return;
  const rect = canvas.getBoundingClientRect();
  state.basket.x = (e.clientX - rect.left) - state.basket.w / 2;
  state.basket.x = Math.max(0, Math.min(canvas.width - state.basket.w, state.basket.x));
});

canvas.addEventListener('touchmove', e => {
  if (!state.running) return;
  e.preventDefault();
  const rect  = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  state.basket.x = (touch.clientX - rect.left) - state.basket.w / 2;
  state.basket.x = Math.max(0, Math.min(canvas.width - state.basket.w, state.basket.x));
}, { passive: false });

/* ==========================================
   BUTTONS
   ========================================== */
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

/* ==========================================
   INIT
   ========================================== */
state = initState();
resizeCanvas();
buildLives();
buildTracker();