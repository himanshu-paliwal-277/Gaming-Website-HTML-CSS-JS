function start() {
  Click_sound.play();
  document.querySelector("img").style.display = "none";
  document.querySelector("h1").style.display = "none";
  document.querySelector("button").style.display = "none";
  document.querySelector("a").style.display = "none";
  document.getElementById("start").style.height = "0px";
  music.play();
}

function back_btn() {
  Click_sound.play();
  document.getElementById("start").style.height = "95vh";
  document.querySelector("img").style.display = "block";
  document.querySelector("h1").style.display = "block";
  document.querySelector("button").style.display = "block";
  document.querySelector("a").style.display = "block";
  music.pause();
}

function sound_on() {
  Click_sound.play();
  music.pause();
  document.getElementById("sound_on").style.display = "none";
  document.getElementById("sound_off").style.display = "block";
}

function sound_off() {
  Click_sound.play();
  music.play();
  document.getElementById("sound_on").style.display = "block";
  document.getElementById("sound_off").style.display = "none";
}

function reset_game() {
  document.getElementById("sound_on").style.display = "block";
  document.getElementById("sound_off").style.display = "none";
  document.getElementById("Game_over").style.display = "none";
  document
    .querySelector(".imgbox1")
    .getElementsByTagName("img")[0].style.width = "0px";
  music.play();
}

console.log("Welcome to Tic Tac Toe");
let music = new Audio("Assets/music.mp3");
let audioTurn = new Audio("Assets/ting.mp3");
let Click_sound = new Audio("Assets/click_sound.mp3");
let gameover = new Audio("Assets/gameover.mp3");
let turn = "X";
let isgameover = false;

// Music loop
music.loop = true;

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won";
      isgameover = true;
      gameover.play();
      document
        .querySelector(".imgbox1")
        .getElementsByTagName("img")[0].style.width = "220px";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";
      music.pause();
      document.getElementById("Game_over").style.display = "flex";
    }
  });
};

// Game Logic
// music.play()
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

// Add onclick listener to reset button
reset.addEventListener("click", () => {
  Click_sound.play();
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  document.querySelector(".line").style.width = "0vw";
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px";
  music.play();
});
