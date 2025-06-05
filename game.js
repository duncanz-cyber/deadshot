const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bullets = [];
let enemies = [];

const player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  size: 20,
  color: "cyan",
  speed: 5
};

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);
}

function drawBullets() {
  ctx.fillStyle = "red";
  bullets.forEach(b => {
    ctx.fillRect(b.x - 2, b.y - 10, 4, 10);
  });
}

function drawEnemies() {
  ctx.fillStyle = "lime";
  enemies.forEach(e => {
    ctx.fillRect(e.x - 10, e.y - 10, 20, 20);
  });
}

function update() {
  // Move bullets
  bullets = bullets.map(b => ({...b, y: b.y - 5})).filter(b => b.y > 0);

  // Simple enemy drop
  enemies = enemies.map(e => ({...e, y: e.y + 1}));

  // Collision detection
  bullets.forEach((b, i) => {
    enemies.forEach((e, j) => {
      if (Math.abs(b.x - e.x) < 10 && Math.abs(b.y - e.y) < 10) {
        enemies.splice(j, 1);
        bullets.splice(i, 1);
      }
    });
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  drawEnemies();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowRight") player.x += player.speed;
  if (e.key === " " || e.key === "ArrowUp") {
    bullets.push({x: player.x, y: player.y});
  }
});

// Spawn enemies every few seconds
setInterval(() => {
  for (let i = 0; i < 5; i++) {
    enemies.push({x: Math.random() * canvas.width, y: 0});
  }
}, 3000);

gameLoop();
