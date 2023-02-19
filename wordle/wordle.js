var height =4;
var width = 4;

var row = 0; 
var col = 0;
var startOver = false;
var word = " ";
const button = document.getElementById("button");


window.onload = async()=>{
    initialize();
        const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
    "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
});
let json = await res.json();
let {dictionary} = json;
word = dictionary[Math.floor(Math.random() * dictionary.length)];
word.word= word.word.toUpperCase();

    startGame();
}

function startGame() {
    document.addEventListener("keyup", (e) => {                                                                                                                         //the     implementation of this function has been adapted from the URL : https://www.youtube.com/watch?v=ckjRsPaWHX8
        if (startOver) return; 
      
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const letter = String.fromCharCode(e.keyCode); 
            if (col < width) {
              let currBox = document.getElementById(row.toString() + '-' + col.toString());
              if (currBox.innerText == "") {
                currBox.innerText = letter;
                col += 1;
              }                                                                                                                                                             
            }
          }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
            }
            let currBox = document.getElementById(row.toString() + '-' + col.toString());
            currBox.innerText = "";
        }

        else if (e.code == "Enter") {
            console.log(e.code);
            if(col!=width){
                window.alert("Complete the word!");
            }
            if (col == width) {
            row += 1; 
            col = 0;
        }
        if (!startOver && row == height) {
            startOver = true;
            document.getElementById("answer").innerText = word;
        }
         } })

}




function initialize() {
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
  }}

   