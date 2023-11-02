let Jump_sound = new Audio("Sound/jump.wav");
let game_over_sound = new Audio("Sound/gameover.mp3");
let click_sound = new Audio("Sound/click_sound.mp3");

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const motion = document.querySelector(".path_background");

dino.style.animationPlayState = "paused";
cactus.style.animationPlayState = "paused";
motion.style.animationPlayState = "paused";

function dinosaur_game() {
  click_sound.play();
  document.getElementById("game_start_box").style.display = "none";
  document.getElementById("game_over_box").style.display = "none";

  dino.style.animationPlayState = "running";
  cactus.style.animationPlayState = "running";
  motion.style.animationPlayState = "running";

  function jump() {
    if (dispatchEvent.classList != "jump") {
      //first it checks if the dino is mid-jump. If not, it makes it jump.
      dino.classList.add("jump");

      setTimeout(function () {
        dino.classList.remove("jump"); //removes the jump class from the dino once it has jumped so that it can jump again
      }, 300);
    }
  }

  let checkAlive = setInterval(function () {
    let dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );

    let cactusLeft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    //check for collision
    if (cactusLeft > 0 && cactusLeft < 70 && dinoTop >= 143) {
      dino.style.animationPlayState = "paused";
      cactus.style.animationPlayState = "paused";
      motion.style.animationPlayState = "paused";
      //   alert("TATA TATA | BYE BYE | Gaya");
      document.getElementById("game_over_box").style.display = "flex";
      document.getElementById("game_start_box").style.display = "none";
      //   window.location.reload();
      // game_over_sound.play();
    }
  }, 10);

  document.addEventListener("keydown", function (event) {
    jump();
    Jump_sound.play();
  });
}

function start() {
  click_sound.play();
  document.querySelector("img").style.display = "none";
  document.querySelector("h1").style.display = "none";
  document.getElementById("btn").style.display = "none";
  document.querySelector('a').style.display="none";
  document.getElementById("start").style.height = "0px";
}

function reload_game() {
  click_sound.play();
  window.location.reload();
}
