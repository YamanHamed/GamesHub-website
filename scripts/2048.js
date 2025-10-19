let gameBox= document.querySelector('.gamebox');

let gameOverBox=document.createElement('div');
    gameOverBox.classList.add('game-over-box')
let gameOverBox_h1=document.createElement('h1');
    gameOverBox_h1.innerHTML='Game Over';
    gameOverBox.appendChild(gameOverBox_h1);
let gameOverBox_p=document.createElement('p');
    gameOverBox_p.innerHTML='Thanks for playing';
    gameOverBox.appendChild(gameOverBox_p);

let scoreElement= document.querySelector('.score');
let restartBtn= document.querySelector('.restart-btn')
let score=0;
let gameArray=[
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
            ];

function initializeGame(){
    gameArray=[
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
            ];
    score=0;
    gameOverBox.remove();
    addFirstTwoTiles();
    display();
    addEventListeners();
}
function addFirstTwoTiles(){
    let x1= getRandomNumber(0,3);
    let y1= getRandomNumber(0,3);
    let x2= getRandomNumber(0,3);
    let y2= getRandomNumber(0,3);
     
    let condition=true;
    while(condition){
        if(x1==x2 && y1==y2){
            x2=getRandomNumber(0,3);
            y2=getRandomNumber(0,3);

            if(!(x1==x2 && y1==y2)){
                condition=false;
            }
            if(x1==x2 && y1==y2){
                condition=true;
            }
        }
        else{
            condition=false;
        }
    }

    gameArray[x1][y1]=2;
    gameArray[x2][y2]=2;
}
function display(){
    for(let i = 0; i < gameArray.length; i++){
        for(let j = 0; j < gameArray[i].length; j++){
            let tileValue = gameArray[i][j];
            let tile= document.getElementById(`${i},${j}`)
            if(tileValue){
                tile.innerHTML= tileValue;
                tile.classList.value= ""; //clear the classList
                tile.classList.add('tile');
                tile.classList.add(`x${tileValue}`);
            }
            else{
                tile.innerHTML="";
                tile.classList.value= ""; //clear the classList
                tile.classList.add('tile');
            }
        }
        
    }
    scoreElement.innerHTML=`Score: ${score}`
}
function addEventListeners(){
    window.addEventListener('keyup',doMove)
    restartBtn.addEventListener('click',initializeGame)
}
function doMove(event){
    if(!isGameOver()){
        if(event.key=='ArrowUp'){
        ArrowUp();
        addNewTile();
        endGame()
        display(); 
        }
        if(event.key=='ArrowDown'){
        ArrowDown();
        addNewTile();
        endGame()
        display();    
        }
        if(event.key=='ArrowRight'){  
        ArrowRight();
        addNewTile(); 
        endGame()
        display();
        }
        if(event.key=='ArrowLeft'){
        ArrowLeft();
        addNewTile();
        endGame()
        display();    
        }
    }        
}
function ArrowRight(){
    let gameArray2=[
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ],
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ],
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ],
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ]            
        ];
    move();
    move();
    move();

function move(){
    from_1to_2();
    for(let i = 0; i < gameArray2.length; i++){    
        for(let j= 0; j < gameArray2[i].length; j++){
            if(j!== gameArray[i].length-1){
                 let tileValue= gameArray2[i][j].value;
                 let nextTileValue= gameArray2[i][j+1].value

                 let tileMatching= gameArray2[i][j].ismatched;
                 let nextTileMatching= gameArray2[i][j+1].ismatched;
              
                 if(tileValue){
                    if(nextTileValue==0){
                        gameArray2[i][j+1].value= tileValue;
                        gameArray2[i][j+1].ismatched= tileMatching;

                        gameArray2[i][j].value=0;
                        gameArray2[i][j].ismatched=false;
                    }
                    if(tileValue==nextTileValue){
                        if(!nextTileMatching && !tileMatching){
                            gameArray2[i][j+1].value=(tileValue+nextTileValue);
                            gameArray2[i][j+1].ismatched=true;

                            gameArray2[i][j].value=0;
                            gameArray2[i][j].ismatched=false;
                            score += (tileValue+nextTileValue);   
                        }                    
                    }                    
                }
            }
        }
    }
    from_2to_1();
}
function from_1to_2(){
   for(let i1 = 0; i1 < gameArray.length; i1++){
        for(let j1 = 0; j1 < gameArray[i1].length; j1++){
            gameArray2[i1][j1].value=gameArray[i1][j1];

        }
    }
}
function from_2to_1(){
   for(let i1 = 0; i1 < gameArray.length; i1++){
        for(let j1 = 0; j1 < gameArray[i1].length; j1++){
            gameArray[i1][j1]=gameArray2[i1][j1].value;
        }
    }
}
}
function ArrowLeft(){
let gameArray2=[
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ],
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ],
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ],
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ]            
        ];
    move();
    move();
    move();

function move(){
    from_1to_2();
    for(let i = 0; i < gameArray2.length; i++){    
        for(let j = gameArray2[i].length-1; j >= 0; j--){
            if(j!== 0){
                 let tileValue= gameArray2[i][j].value;
                 let nextTileValue= gameArray2[i][j-1].value;

                 let tileMatching= gameArray2[i][j].ismatched;
                 let nextTileMatching= gameArray2[i][j-1].ismatched;
              
                 if(tileValue){
                    if(nextTileValue==0){
                        gameArray2[i][j-1].value= tileValue;
                        gameArray2[i][j-1].ismatched= tileMatching;

                        gameArray2[i][j].value=0;
                        gameArray2[i][j].ismatched=false;
                    }
                    if(tileValue==nextTileValue){
                        if(!nextTileMatching && !tileMatching){
                            gameArray2[i][j-1].value=(tileValue+nextTileValue);
                            gameArray2[i][j-1].ismatched=true;

                            gameArray2[i][j].value=0;
                            gameArray2[i][j].ismatched=false;
                            score += (tileValue+nextTileValue);
                        }                       
                    }                    
                }
            }
        }
    }
    from_2to_1();
}
function from_1to_2(){
   for(let i1 = 0; i1 < gameArray.length; i1++){
        for(let j1 = 0; j1 < gameArray[i1].length; j1++){
            gameArray2[i1][j1].value=gameArray[i1][j1];

        }
    }
}
function from_2to_1(){
   for(let i1 = 0; i1 < gameArray.length; i1++){
        for(let j1 = 0; j1 < gameArray[i1].length; j1++){
            gameArray[i1][j1]=gameArray2[i1][j1].value;
        }
    }
}
}
function ArrowUp(){
let gameArray2=[
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ],
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ],
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ],
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ]            
        ];
    move();
    move();
    move();

function move(){
    from_1to_2();
    for(let i = 0; i < gameArray2.length; i++){    
        for(let j = gameArray2[i].length-1; j >= 0; j--){
            if(j!== 0){
                 let tileValue= gameArray2[j][i].value;
                 let nextTileValue= gameArray2[j-1][i].value;

                 let tileMatching= gameArray2[j][i].ismatched;
                 let nextTileMatching= gameArray2[j-1][i].ismatched;
              
                 if(tileValue){
                    if(nextTileValue==0){
                        gameArray2[j-1][i].value= tileValue;
                        gameArray2[j-1][i].ismatched= tileMatching;

                        gameArray2[j][i].value=0;
                        gameArray2[j][i].ismatched=false;
                    }
                    if(tileValue==nextTileValue){
                        if(!nextTileMatching && !tileMatching){
                            gameArray2[j-1][i].value=(tileValue+nextTileValue);
                            gameArray2[j-1][i].ismatched=true;

                            gameArray2[j][i].value=0;
                            gameArray2[j][i].ismatched=false;
                            score += (tileValue+nextTileValue);
                        }                       
                    }                    
                }
            }
        }
    }
    from_2to_1();
}
function from_1to_2(){
   for(let i1 = 0; i1 < gameArray.length; i1++){
        for(let j1 = 0; j1 < gameArray[i1].length; j1++){
            gameArray2[i1][j1].value=gameArray[i1][j1];

        }
    }
}
function from_2to_1(){
   for(let i1 = 0; i1 < gameArray.length; i1++){
        for(let j1 = 0; j1 < gameArray[i1].length; j1++){
            gameArray[i1][j1]=gameArray2[i1][j1].value;
        }
    }
}
}
function ArrowDown(){
let gameArray2=[
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ],
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ],
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ],
            [
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false},
                {value:0,ismatched:false}
            ]            
        ];
    move();
    move();
    move();

function move(){
    from_1to_2();
    for(let i = 0; i < gameArray2.length; i++){    
        for(let j = 0; j < gameArray2[i].length ; j++){
            if(j!== gameArray2[i].length-1){
                 let tileValue= gameArray2[j][i].value;
                 let nextTileValue= gameArray2[j+1][i].value;

                 let tileMatching= gameArray2[j][i].ismatched;
                 let nextTileMatching= gameArray2[j+1][i].ismatched;
              
                 if(tileValue){
                    if(nextTileValue==0){
                        gameArray2[j+1][i].value= tileValue;
                        gameArray2[j+1][i].ismatched= tileMatching;

                        gameArray2[j][i].value=0;
                        gameArray2[j][i].ismatched=false;
                    }
                    if(tileValue==nextTileValue){
                        if(!nextTileMatching && !tileMatching){
                            gameArray2[j+1][i].value=(tileValue+nextTileValue);
                            gameArray2[j+1][i].ismatched=true;

                            gameArray2[j][i].value=0;
                            gameArray2[j][i].ismatched=false;
                            score += (tileValue+nextTileValue);
                        }                       
                    }                    
                }
            }
        }
    }
    from_2to_1();
}
function from_1to_2(){
   for(let i1 = 0; i1 < gameArray.length; i1++){
        for(let j1 = 0; j1 < gameArray[i1].length; j1++){
            gameArray2[i1][j1].value=gameArray[i1][j1];

        }
    }
}
function from_2to_1(){
   for(let i1 = 0; i1 < gameArray.length; i1++){
        for(let j1 = 0; j1 < gameArray[i1].length; j1++){
            gameArray[i1][j1]=gameArray2[i1][j1].value;
        }
    }
}
}
function addNewTile(){
    let emptyCells=0;
    for (let i = 0; i < gameArray.length; i++) {
        for (let j = 0; j < gameArray[i].length; j++) {
            if(gameArray[i][j]==0){
                emptyCells++;
            }
        }
        
    }
    if(emptyCells){    
        let newCoordinates= {x:undefined,y:undefined};
        newCoordinates.x= getRandomNumber(0,3);
        newCoordinates.y= getRandomNumber(0,3);

        if(gameArray[newCoordinates.x][newCoordinates.y]){
            addNewTile();
        }
        else if(gameArray[newCoordinates.x][newCoordinates.y]==0){
            gameArray[newCoordinates.x][newCoordinates.y]=2;
        }
    }
}
function isGameOver(){
    let isGameOver;
    let beforescore=score;
    let beforeGameArray2=[
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
            ];
    for(let i = 0; i < gameArray.length; i++){
        for(let j = 0; j < gameArray[i].length; j++){
            beforeGameArray2[i][j]=gameArray[i][j];
        }
    }

    ArrowDown();
    ArrowUp();
    ArrowLeft();
    ArrowRight();
     
    let similarity=0;
    for(let i = 0; i < gameArray.length; i++){
        for(let j = 0; j < gameArray[i].length; j++){
            if(beforeGameArray2[i][j]==gameArray[i][j]){
                similarity++;
            }
        }
    }

    if(similarity==16){
        isGameOver=true;
    }
    else{
        isGameOver=false;
    }

    for(let i = 0; i < gameArray.length; i++){// getting back gameArray the same
        for(let j = 0; j < gameArray[i].length; j++){
            gameArray[i][j]=beforeGameArray2[i][j];
        }
    }
    score=beforescore;// getting back score the same


    return isGameOver;

}
function endGame(){
    if(isGameOver()) {
        gameBox.appendChild(gameOverBox);
    }
}
function getRandomNumber(min, max){
   //this function returns a rounded random number between "min" and "max" (the number could be "min" or "max" )
    return (Math.round(Math.random() * (max - min)) + min);
}
initializeGame();