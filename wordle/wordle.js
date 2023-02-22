var height = 4;
var width = 4;
var row = 0;
var col = 0;
var startOver = false;
var word = "";
var maxAttempts = 6;
const hintButton = document.getElementById("hint");
const startOverButton = document.getElementById("new-game");
const hintContainer = document.getElementById("hint-container");
const congratsImage = document.createElement('img');
congratsImage.src = 'congrats.gif';
const congratsContainer = document.createElement('div');
congratsContainer.appendChild(congratsImage);

hintButton.addEventListener("click", () => {
  hintContainer.innerText = word.hint;
});


  startOverButton.addEventListener("click", () => {
    window.location.reload();
    });
window.onload = async () => {
    initialize();
  const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
      "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
  });
  let json = await res.json();
  let { dictionary } = json;
  word = dictionary[Math.floor(Math.random() * dictionary.length)];
  word.word = word.word.toUpperCase();
    
  startGame();
};
function startOver() {
    window.location.reload();
  }
function startGame() {

    let attempts = 0; // Track the number of attempts
    const answer = document.getElementById("answer");
    
   
    document.addEventListener("keyup", (e) => {
        
      if (startOver) return;
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = String.fromCharCode(e.keyCode);
        if (col < width) {
          let currBox = document.getElementById(
            row.toString() + "-" + col.toString()
          );
          if (currBox.innerText == "") {
            currBox.innerText = letter;
            col += 1;
          }
        }
      } else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
          col -= 1;
        }
        let currBox = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        currBox.innerText = "";
      } else if (e.code == "Enter") {
        if (col != width) {
          window.alert("Complete the word!");
        }
        if (col == width) {
          const currentGuess = Array.from(document.querySelectorAll('.box')).slice(width*row, width*(row+1)).map(box => box.innerText).join("");
          const result = checkGuess(currentGuess);
          console.log("zbi",result);
          console.log("zbi",word)
          markBoxes(result);
          row += 1;
          col = 0;
          attempts += 1;
          if (result === "exact") { // If the user correctly guesses the word
            startOver = true;
            answer.innerText = word.word;
            // Hide everything except the "congratulations" image
const elementsToHide = document.querySelectorAll("body > *:not(img)");
elementsToHide.forEach((element) => {
  element.style.display = "none";
});
            const congratsImage = document.createElement('img');
            congratsImage.src = 'congrats.gif';
            const congratsContainer = document.createElement('div');
            congratsContainer.appendChild(congratsImage);
            document.body.appendChild(congratsContainer);
            
            window.alert("Congratulations, you have won!");
          } else if (attempts == maxAttempts && result !== "exact") { // If the maximum attempts is reached and the user did not guess the word correctly
            startOver = true;
            answer.innerText = word.word;
            window.alert("You have run out of attempts! The correct word was: " + word.word);
          } else if (!startOver && row == height && result === "exact") { // If the user correctly guesses the word within the maximum attempts
            startOver = true;
            answer.innerText = word.word;
            window.alert("Congratulations, you have won!");
          } else if (!startOver && row == height) { // If the user runs out of attempts, but did not correctly guess the word
            startOver = true;
            answer.innerText = word.word;
            window.alert("You have run out of attempts! The correct word was: " +
                word.word); 
            }
        }
    }
    });
}
        
    


function checkGuess(guess) {
    const result = [];
    for (let i = 0; i < guess.length; i++) {
      const letter = guess.charAt(i);
      if (word.word.includes(letter)) {
        if (word.word.charAt(i) == letter) {
          result.push("exact");
        } else {
          result.push("partial");
        }
      } else {
        result.push("none");
      }
    }
    return result;
  }
  
  function markBoxes(result) {
    const boxes = document.querySelectorAll(".box");
    const boxCount = boxes.length;
    const rowLength = boxCount / height;
    let allGreen = true;
    for (let i = 0; i < result.length; i++) {
      const box = boxes[row * rowLength + i];
      const value = result[i];
      if (value === "exact") {
        box.classList.add("exact");
      } else if (value === "partial") {
        box.classList.add("partial");
        allGreen = false;
      } else {
        const letter = box.innerText;
        if (word.word.includes(letter)) {
          box.classList.add("none");
          allGreen = false;
        } else {
          box.classList.add("none-gray");
          allGreen = false;

        }
      }
    }
    if (allGreen) {
        // Hide everything except the "congratulations" image
        console.log("allgreen")
const elementsToHide = document.querySelectorAll("body > *:not(img)");
elementsToHide.forEach((element) => {
  element.style.display = "none";
});
        startOver = true;
        answer.innerText = word.word;
        const congratsImage = document.createElement('img');
        congratsImage.src = 'congrats.gif';
        const congratsContainer = document.createElement('div');
        congratsContainer.appendChild(congratsImage);
        document.body.appendChild(congratsContainer);
        window.alert("Congratulations, you have won!");
    }
  }
  
  
  
  
  function initialize() {
    const height = 4;
    const width = 4;
    const board = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push("");
        const box = document.createElement("div");
        box.id = i.toString() + "-" + j.toString();
        box.classList.add("box");
        document.getElementById("board").appendChild(box);
      }
      board.push(row);
    }
  }
  