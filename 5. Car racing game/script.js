function start() {
  click_sound.play();
  document.querySelector("img").style.display = "none";
  document.querySelector("h1").style.display = "none";
  document.querySelector("button").style.display = "none";
  document.querySelector('a').style.display="none";
  document.getElementById("start").style.height = "0px";
  Start();
  musicSound.play();
}

const gameOverSound = new Audio("Sounds/gameover.mp3");
const car_start = new Audio("Sounds/Car_start.wav");
const moveSound = new Audio("Sounds/move.mp3");
const music = new Audio("Sounds/music.mp3");
const click_sound = new Audio("Sounds/click_sound.mp3");

// Music loop
music.loop = true;

function sound_on() {
  click_sound.play();
  music.pause();
  document.getElementById("sound_on").style.display = "none";
  document.getElementById("sound_off").style.display = "block";
}
function sound_off() {
  click_sound.play();
  music.play();
  document.getElementById("sound_on").style.display = "block";
  document.getElementById("sound_off").style.display = "none";
}

const score = document.querySelector(".score");
const highScore = document.querySelector(".highScore");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const ClickToStart = document.querySelector(".ClickToStart");
ClickToStart.addEventListener("click", Start);
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

let rendom_num = 0;

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
let player = {
  speed: 3,
  score: 0,
  highScore: 0,
};
function keydown(e) {
  keys[e.key] = true;
}
function keyup(e) {
  keys[e.key] = false;
}
// starting the game
function Start() {
  click_sound.play();
  document.getElementById("sound_on").style.display = "block";
  document.getElementById("sound_off").style.display = "none";
  // Game music
  music.play();
  gameArea.innerHTML = "";
  startScreen.classList.add("hide");
  player.isStart = true;
  player.score = 0;
  window.requestAnimationFrame(Play);
  // creating the road lines
  for (i = 0; i < 5; i++) {
    let roadLines = document.createElement("div");
    roadLines.setAttribute("class", "roadLines");
    roadLines.y = i * 140;
    roadLines.style.top = roadLines.y + "px";
    gameArea.appendChild(roadLines);
  }
  // creating the opponents car
  for (i = 0; i < 3; i++) {
    let Opponents = document.createElement("div");
    Opponents.setAttribute("class", "Opponents");
    Opponents.y = i * -300;
    Opponents.style.top = Opponents.y + "px";
    gameArea.appendChild(Opponents);
    Opponents.style.left = Math.floor(Math.random() * 350) + "px";
    if (rendom_num == 0) {
      rendom_num = 1;
      Opponents.style.filter = "invert(1)";
    } else if (rendom_num == 1) {
      rendom_num = 0;
      Opponents.style.filter = "invert(0)";
    }
  }
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
}
function randomColor() {
  function c() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return "#" + c() + c() + c();
}

let sound_play = 0;

//play the game
function Play() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  if (player.isStart) {
    moveLines();
    moveOpponents(car);
    if (keys.ArrowUp && player.y > road.top + 70) {
      player.y -= player.speed; // Car Move Sound
      car_start.play();
    }
    if (keys.ArrowDown && player.y < road.height - 75) {
      player.y += player.speed; // Car Move Sound
      sound_play = 1;
    }
    if (keys.ArrowRight && player.x < 350) {
      player.x += player.speed; // Car Move Sound
      sound_play = 1;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed; // Car Move Sound
      sound_play = 1;
    }
    if (sound_play == 1) {
      moveSound.play();
      sound_play = 0;
    }
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    highScore.innerHTML = "HighScore" + ":" + (player.highScore - 1);
    player.score++;
    player.speed += 0.002;
    if (player.highScore < player.score) {
      player.highScore++;
      highScore.innerHTML = "HighScore" + ":" + (player.highScore - 1);
      highScore.style.top = "80px";
    }
    score.innerHTML = "Score" + ":" + (player.score - 1);
    window.requestAnimationFrame(Play);
  }
}
function moveLines() {
  let roadLines = document.querySelectorAll(".roadLines");
  roadLines.forEach(function (item) {
    if (item.y >= 700) item.y -= 700;
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}
function moveOpponents(car) {
  let Opponents = document.querySelectorAll(".Opponents");
  Opponents.forEach(function (item) {
    if (isCollide(car, item)) {
      // Game Over Sound
      gameOverSound.play();
      car_start.pause();
      endGame();
    }
    if (item.y >= 750) {
      item.y -= 900;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}
//check whether the cars collide or not
function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

//game is end
function endGame() {
  music.pause();
  player.isStart = false;
  player.speed = 3;
  startScreen.classList.remove("hide");
}