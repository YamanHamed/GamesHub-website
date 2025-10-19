// constants
const boxlength=500;
const rowsNum=20; const columnsNum=20;
const unit=25;
const gamespeed=100;
const gamebox = document.querySelector('canvas');
const ctx = gamebox.getContext("2d");

//gamebox which contains the canvas
let gameBox= document.querySelector('.gamebox');

//game over box 
let gameOverBox=document.createElement('div');
    gameOverBox.classList.add('game-over-box')
let gameOverBox_h1=document.createElement('h1');
    gameOverBox_h1.innerHTML='Game Over';
    gameOverBox.appendChild(gameOverBox_h1);
let gameOverBox_p=document.createElement('p');
    gameOverBox_p.innerHTML='Thanks for playing';
    gameOverBox.appendChild(gameOverBox_p);

// score and button
let scoreElement= document.querySelector('.score');
let restartBtn= document.querySelector('.restart-btn');

// variables
let score=0;
let id=undefined; 
let food_x; let food_y;
let snake=[
            {
                x:undefined,
                y:undefined, 
                xvelocity:0,
                yvelocity:0,
                pre_xvelocity:0,
                pre_yvelocity:0 
            },
];

initializeGame(); 


function initializeGame(){
// initial values
score=0;
id=undefined; 

snake=[
            {
                x:undefined,
                y:undefined, 
                xvelocity:0,
                yvelocity:0,
                pre_xvelocity:0,
                pre_yvelocity:0 
            },
];
snake[0].x=Math.round(Math.random()*(columnsNum-1)); 
snake[0].y=Math.round(Math.random()*(rowsNum-1));

food_x= Math.round(Math.random()*(columnsNum-1));
food_y= Math.round(Math.random()*(rowsNum-1));   
//----------------
// starting game
gameOverBox.remove();
display();
changeDirection(); 
//--------------------
}
function display() {
    ctx.fillStyle="black";
    ctx.fillRect(0,0,boxlength,boxlength)

    ctx.fillStyle="#ff0000f0";
    ctx.fillRect(food_x*unit,food_y*unit,unit,unit)

    for (let i = 0; i<snake.length; i++) {
        if(!i){
            ctx.fillStyle="#00ff00f0"    
        }
        else if(i){
            ctx.fillStyle="#00ff00d0" 
        }
        ctx.fillRect(snake[i].x*unit,snake[i].y*unit,unit,unit);         
    }
    scoreElement.innerHTML=`Score: ${score}`

}
function update(){
// checking if game is over  
if(isGameConiuable()){   
    // changing the head's coordinates
    snake[0].x += snake[0].xvelocity;
    snake[0].y += snake[0].yvelocity;

    if(snake[0].x==food_x && snake[0].y==food_y){
        snake.push(
            {   x:food_x , 
                y:food_y ,
                xvelocity:0,
                yvelocity:0,
                pre_xvelocity:0,
                pre_yvelocity:0 
            });

        food_x= Math.round(Math.random()*(columnsNum-1));//usually,rowsNum=columnsNum
        food_y= Math.round(Math.random()*(rowsNum-1));  
        score++;
    }

    for(let i=0; i<snake.length; i++){
        if (i!==0) {
            snake[i].x=(snake[i-1].x)-snake[i-1].xvelocity;
            snake[i].y=(snake[i-1].y)-snake[i-1].yvelocity;
            snake[i].pre_xvelocity= snake[i].xvelocity;
            snake[i].pre_yvelocity= snake[i].yvelocity;
            snake[i].xvelocity= snake[i-1].pre_xvelocity;
            snake[i].yvelocity= snake[i-1].pre_yvelocity;

        }
    }
        
    display();
}
else{
     clearInterval(id);
     gameBox.appendChild(gameOverBox);
}    
}
function changeDirection(){
    window.addEventListener('keydown',
    (event)=>{  
        if(event.key=='ArrowUp'){
            ArrowUp();
        }
        if(event.key=='ArrowDown' ){
            ArrowDown();
        }
        if(event.key=='ArrowRight'){
            ArrowRight();
        }
        if(event.key=='ArrowLeft'){
            ArrowLeft();
        }
        if(event.key==' '){
            clearInterval(id);
        } 
      }
    )
    restartBtn.addEventListener('click',
        ()=>{
            clearInterval(id);
            initializeGame();
        }
    )
}
function isGameConiuable(){
    if(snake[0].x<0 || snake[0].x>(columnsNum-1) ||snake[0].y<0 || snake[0].y>(rowsNum-1)){
        return false;
    }

    for (let i = 0; i < snake.length; i++) {
         if(i!==0 && snake[0].x==snake[i].x && snake[0].y==snake[i].y){
            return false; 
         }
    }
    return true;
}
function ArrowUp(){
    if (snake[0].yvelocity!==1){ 
        clearInterval(id);
        id=setInterval(()=>{    
        snake[0].pre_xvelocity=snake[0].xvelocity;
        snake[0].pre_yvelocity=snake[0].yvelocity;
        snake[0].xvelocity=0;
        snake[0].yvelocity=-1; 
        update();
        },gamespeed) 
    }
}
function ArrowDown(){
    if(snake[0].yvelocity!==-1){
        clearInterval(id);
        id=setInterval(()=>{
        snake[0].pre_xvelocity=snake[0].xvelocity;
        snake[0].pre_yvelocity=snake[0].yvelocity;            
        snake[0].xvelocity=0;
        snake[0].yvelocity=1;
        update();
        },gamespeed);

    }    
}
function ArrowRight(){
    if(snake[0].xvelocity!==-1){
        clearInterval(id);
        id=setInterval(()=>{
        snake[0].pre_xvelocity=snake[0].xvelocity;
        snake[0].pre_yvelocity=snake[0].yvelocity;         
        snake[0].xvelocity=1;
        snake[0].yvelocity=0;
        update();   
            },gamespeed);
    }
}
function ArrowLeft(){
    if(snake[0].xvelocity!==1){
        clearInterval(id);
        id=setInterval(()=>{
        snake[0].pre_xvelocity=snake[0].xvelocity;
        snake[0].pre_yvelocity=snake[0].yvelocity;          
        snake[0].xvelocity=-1;
        snake[0].yvelocity=0;
        update();
            },gamespeed);
    }
}

