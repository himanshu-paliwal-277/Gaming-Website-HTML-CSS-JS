// New game

function New_game(){
   audioTurn.play();
   location.reload();
}

function start(){
   audioTurn.play();
   document.querySelector('img').style.display="none";
   document.querySelector('h1').style.display="none";
   document.querySelector('button').style.display="none";
   document.querySelector('a').style.display="none";
   document.getElementById('start').style.height="0px";
   music.play();
}

function sound_on() {
   audioTurn.play();
   music.pause();
   document.getElementById('sound_on').style.display="none";
   document.getElementById('sound_off').style.display="block";
}

function sound_off() {
   audioTurn.play();
   music.play();
   document.getElementById('sound_on').style.display="block";
   document.getElementById('sound_off').style.display="none";
}

const gameBoard = document.querySelector("#gameBoard");
const digits = document.querySelector("#digits");
const deleteNum = document.querySelector("#delete");
const mistake = document.querySelector("#mistake");
let lastSelected = null;
let error = 0;

let music = new Audio("Assets/music.mp3")
let audioTurn = new Audio("Assets/ting.mp3")

// Music loop
music.loop = true;

// Game Music
// music.play();

//puzzle
const puzzle = [
   "8-6-1----",
   "--3-64-9-",
   "9-----816",
   "-8-396---",
   "7-2-4-3-9",
   "---572-8-",
   "521-----4",
   "-3-75-2--",
   "----2-1-5",
];

//puzzle solution
const solution = [
   "856917423",
   "213864597",
   "947235816",
   "185396724",
   "762148359",
   "394572681",
   "521683974",
   "439751268",
   "678429135",
];

//when window load puzzle create
window.onload = (() => {
   for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
         const div = document.createElement("div");
         div.classList.add("tile");
         div.addEventListener("click", selectTile);
         div.setAttribute("row", i);
         div.setAttribute("col", j);


         if (puzzle[i][j] != "-") {
            div.innerText = puzzle[i][j];
            div.classList.add("filled");
         }

         if (i == 2 || i == 5) {
            div.classList.add("border-bottom");
         }

         if (j == 2 || j == 5) {
            div.classList.add("border-right");
         }
         gameBoard.appendChild(div);
      }
   }

   // creating digits
   for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.classList.add("tile");
      div.addEventListener("click", addNumber);
      div.innerText = i + 1;
      div.style.height = gameBoard.querySelector(".tile").clientHeight + "px";
      digits.appendChild(div);
   }
});

//select Tile
function selectTile() {
   if (lastSelected != null) {
      lastSelected.classList.remove("select-tile");
   }
   lastSelected = this;
   lastSelected.classList.add("select-tile");
}

//add digits (0-9) to Tile
function addNumber() {
   // Click Sound
   audioTurn.play();
   if (lastSelected.innerText == "" || lastSelected.classList.contains("danger")) {
      lastSelected.innerText = this.innerText;
   }

   let row = lastSelected.getAttribute("row");
   let col = lastSelected.getAttribute("col");
   if (solution[row][col] == lastSelected.innerText) {
      lastSelected.classList.remove("danger");

   } else {
      lastSelected.classList.add("danger");
      addErrorandDisplay();
   }

   if (error > 4) {
      alert("You Lost!");
      // Reload Game
      location.reload();
   }

   if (isAllTilesFilled()) {
      const allTiles = gameBoard.querySelectorAll(".tile");
      let userAnswer = [...allTiles].map((tile) => {
         return tile.innerText;
      });
      let num = 0;
      for (let i = 0; i < 9; i++) {
         for (let j = 0; j < 9; j++) {
            if (solution[i][j] != userAnswer[num]) {
               allTiles[num].classList.add("danger");
            }
            num++
         }
      }

      let dangerClass = [...allTiles].some((tile) => {
         return tile.classList.contains("danger");
      });

      if (dangerClass) {
         if (error > 4) {
            alert("you lost!");
            location.reload();
         }
      } else {
         alert("Congratuations! You win the puzzle!");
      }
   }
}

//delete number of Tile
deleteNum.onclick = () => {
   audioTurn.play();
   if (!lastSelected.classList.contains("filled")) {
      lastSelected.innerText = "";

   }
}

//check again any wrong numbers in any tile
function addErrorandDisplay() {
   error++;
   mistake.innerText = error;
}

//check all tiles filled or not
function isAllTilesFilled() {
   const allTiles = gameBoard.querySelectorAll(".tile");
   return [...allTiles].every((tile) => {
      return tile.innerText != "";
   });
}
