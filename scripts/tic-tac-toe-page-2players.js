// (cells) is an arrey []
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("h2");
const restartBtn = document.querySelector(".restart-btn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// (options) is the corresponding array for (cells)
let options =[ "", "", "", 
               "", "", "", 
               "", "", "" ];

let currentPlayer = "X";
let isClickable=false;

initializeGame();
restartBtn.addEventListener('click',restartGame);

function initializeGame(){
isClickable=true;    
currentPlayer="X";
statusText.innerHTML="";
optionsToCells();
PlayMove();
}
function PlayMove(){
cells.forEach((cell)=>{
  cell.addEventListener('click',()=>{
    if(cell.innerHTML=="" && isClickable){
     cell.innerHTML=currentPlayer;
     cell.classList.add(currentPlayer); 
     cellsToOptions();
     endGame(isGamefinished());
    }
   }
  )
 }
)
}
function endGame(result){
if(result==`draw`){
statusText.innerHTML="It's a DRAW";
isClickable=false;
}
else if(result==`Xwon`){
statusText.innerHTML="X WON";
for(let i=0; i<CheckWinner().winCondition.length; i++){
  cells[CheckWinner().winCondition[i]].classList.add('X-won');  
}
isClickable=false;
} 
else if(result==`Owon`){
statusText.innerHTML="O WON";
for(let i=0; i<CheckWinner().winCondition.length; i++){
  cells[CheckWinner().winCondition[i]].classList.add('O-won');  
}
isClickable=false;
}
else{
ChangePlayerMove();
statusText.innerHTML=`${currentPlayer}'s turn`;    
}
}
function optionsToCells(){
for(let i=0; i<cells.length ; i++){
cells[i].innerHTML=options[i];
}    
}
function cellsToOptions(){
for(let i=0; i<cells.length ; i++){
options[i]=cells[i].innerHTML;
}  
}
function isGamefinished(){
if(CheckWinner()){
 return `${currentPlayer}won`;
}
else if(!isGameContinuable()){
 return `draw`;  
}
else{
 return `continuable` ;  
}
}
function ChangePlayerMove(){
currentPlayer= currentPlayer==='X' ? 'O' :'X';
}
function CheckWinner (){
  for(let i=0 ; i<winConditions.length ; i++) {
    let winning_props={
      isWinning:undefined, 
      winCondition:undefined,
      playerMove:undefined
    }
    for(let j = 0; j<winConditions[i].length; j++){
      if(j!== 0){
      
      if(options[winConditions[i][j-1]] === options[winConditions[i][j]] && 
      options[winConditions[i][j]] !==""){
        winning_props.isWinning=true;
        winning_props.playerMove= options[winConditions[i][j]];
        winning_props.winCondition=winConditions[i];
      } 
      
      else{
        winning_props.isWinning=false;
        winning_props.playerMove=undefined;
        winning_props.winCondition=undefined;
        break; 
      }
      }
    }
    if(winning_props.isWinning){
      return winning_props;
    }
  }
  return 0;
}
function isGameContinuable(){
 if(deadpaths()==8){
  return 0;
 }
 else{
  return 1;  
 }
}
function deadpaths(){
let deadpaths=0;
for(let i=0; i<winConditions.length ; i++){
 let xplayer_counter=0;
 let oplayer_counter=0;

 for (let j=0; j<winConditions[i].length; j++){
  if(options[winConditions[i][j]]=="X"){xplayer_counter++;}
  if(options[winConditions[i][j]]=="O"){oplayer_counter++;}   
 }
 if(xplayer_counter!==0 && oplayer_counter!==0){
  deadpaths++;
 }
}
return deadpaths;
}
function restartGame(){
options.forEach((cell,index)=>{options[index]="";})
cells.forEach((cell)=>{cell.classList.value="";cell.classList.add("cell")})    
optionsToCells();
initializeGame();
}