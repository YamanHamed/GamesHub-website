let gameboxContainer= document.querySelector('.gamebox');
const gamebox= document.querySelector('canvas');
const context= gamebox.getContext("2d");
const box_width= 360;
const box_height= 640*(3/4)//480;
const x_unit= box_width/18; //x_unit = 20px (for width) 
const y_unit= box_height/32;//y_unit = 20px (for height)
const timespeed= 30;
const gravity= 1/50;
let intervalId;
let isGameRunning=false;
let score=0;
let scoreElement= document.querySelector('.score');


//--- gameover box ---// 
let gameOverBox=document.createElement('div');
    gameOverBox.classList.add('game-over-box')
let gameOverBox_h1=document.createElement('h1');
    gameOverBox_h1.innerHTML='Game Over';
    gameOverBox.appendChild(gameOverBox_h1);
let gameOverBox_p=document.createElement('p');
    gameOverBox_p.innerHTML='Thanks for playing';
    gameOverBox.appendChild(gameOverBox_p);
let restartBtn=document.createElement('button');
    restartBtn.innerHTML='restart';
    gameOverBox.appendChild(restartBtn);    
//----------

//--- startgame box ---// 
let startGameBox=document.createElement('div');
    startGameBox.classList.add('start-game-box');
let startGameBox_h1=document.createElement('h1');
    startGameBox_h1.innerHTML='Welcome!'
    startGameBox.appendChild(startGameBox_h1);
let startBtn=document.createElement('button');
    startBtn.innerHTML='Start';
    startGameBox.appendChild(startBtn);    
//----------

// initial values
gamebox.width=box_width;
gamebox.height=box_height;
isGameRunning=true;
//----------

//pipes
let bariers=[];
const pipe_width=64;
const pipe_hight=512*(3/4)//384;

let topPipeImage = new Image();
topPipeImage.src="../flappy-bird-images/toppipe.png";

let bottomPipeImage = new Image();
bottomPipeImage.src="../flappy-bird-images/bottompipe.png";

//----------

//bird
let bird ={
    x: 3,
    y:6,
    y_velocity: 0
}
const bird_width=1.5*x_unit;
const bird_hight=1.5*x_unit;

let birdimage = new Image();
birdimage.src="../flappy-bird-images/flappybird.png"
birdimage.onload = ()=>{
    context.drawImage(birdimage, bird.x*x_unit, bird.y*y_unit, bird_width, bird_hight)
}

//-----------
gameboxContainer.appendChild(startGameBox);
startBtn.addEventListener('click',initilizeGame)


function initilizeGame(){
    startGameBox.remove();
    score=0
    bird ={
        x: 3,
        y:6,
        y_velocity: 0
    }
    bariers=[];

    animationId=requestAnimationFrame(update);
    intervalId=setInterval(create_pipes,1500);

}
document.addEventListener('keydown', addliteners);
gamebox.addEventListener('click', ()=>{bird.y_velocity = -6/20;})
restartBtn.addEventListener('click', restartGame);

function addliteners(event){
    if(event.key == 'ArrowUp' ||event.key == 'w' || event.key == 'W' || event.key == ' '){
        bird.y_velocity = -6/20;   
    }
}
function update(){        
 requestAnimationFrame(update);
if(isGameRunning){

// bird move
    bird.y_velocity += gravity; 
    bird.y += bird.y_velocity;
//pipes move    
    for(let i = 0; i < bariers.length; i++) {
    bariers[i].x += -2;//-2 pixels
    }
//checking 
    doChecks(bariers,bird),
    
// display
    context.clearRect(0,0,box_width,box_height)
    context.drawImage(birdimage, bird.x*x_unit, bird.y*y_unit,bird_width,bird_hight)
    scoreElement.innerHTML=` Score: ${score}`;   
    for(let i = 0; i < bariers.length; i++){     
        let barier= bariers[i];
        context.drawImage(topPipeImage, (barier.x), (barier.y), pipe_width, pipe_hight)
        context.drawImage(bottomPipeImage, (barier.x), (barier.topPipeHight + barier.freespace), pipe_width, pipe_hight)       

    } 
     
       
}
else{
    return;
}
}
function create_pipes(){
    let random_y = getRandomNumber(-300,-150);

    let barier={
        x: box_width,
        y: random_y,
        freespace:box_height/4,
        topPipeHight:(pipe_hight+random_y),
        ispassed: false
    }
    bariers.push(barier)
}
function getRandomNumber(min, max){
    return (Math.round(Math.random() * (max - min)) + min);
}
function doChecks(bariers_p,bird_p){
    for(let i=0; i < bariers_p.length; i++){
        
    let bird1={
        xmin: bird_p.x* x_unit,//we multiplied by x_unit in order to stay in pixels unit
        xmax: bird_p.x* x_unit+bird_width,
        ymin: bird_p.y*y_unit,
        ymax: bird_p.y*y_unit+bird_hight
    }
    let barier1={
        xmin: bariers_p[i].x,
        xmax: bariers_p[i].x+pipe_width,
        ymin: bariers_p[i].topPipeHight,
        ymax: bariers_p[i].topPipeHight+bariers_p[i].freespace
    }

    let x_condition1= bird1.xmin >= barier1.xmin && bird1.xmin <= barier1.xmax;
    let x_condition2= bird1.xmax >= barier1.xmin && bird1.xmax <= barier1.xmax;// the bird is inside the barier
    let y_condition= bird1.ymin > barier1.ymin && bird1.ymax < barier1.ymax // the bird is inside the free space

    if(x_condition1 || x_condition2){ 
        if(y_condition){
            return;
        }
        else{
            clearInterval(intervalId);
            isGameRunning=false;
            gameboxContainer.appendChild(gameOverBox);
        }
    }    
    if((bird_p.y*y_unit) > box_height){
        clearInterval(intervalId);
        isGameRunning=false;
        gameboxContainer.appendChild(gameOverBox);
    }
    }   
    score=0;
    for(let i=0; i < bariers_p.length; i++){
        if (bariers_p[i].x < bird_p.x) {
            score++;
        }
    }
}
function restartGame() {
    gameOverBox.remove();
    clearInterval(intervalId);
    score = 0;
    bird = {
        x: 3,
        y: 6,
        y_velocity: 0
    };
    bariers = [];

    isGameRunning = true;
    intervalId = setInterval(create_pipes, 1500);
   if(isGameRunning){

// bird move
    bird.y_velocity += gravity; 
    bird.y += bird.y_velocity;
//pipes move    
    for(let i = 0; i < bariers.length; i++) {
    bariers[i].x += -2;//-2 pixels
    }
//checking 
    doChecks(bariers,bird),
    
// display
    context.clearRect(0,0,box_width,box_height)
    context.drawImage(birdimage, bird.x*x_unit, bird.y*y_unit,bird_width,bird_hight)
    scoreElement.innerHTML=` Score: ${score}`;   
    for(let i = 0; i < bariers.length; i++){     
        let barier= bariers[i];
        context.drawImage(topPipeImage, (barier.x), (barier.y), pipe_width, pipe_hight)
        context.drawImage(bottomPipeImage, (barier.x), (barier.topPipeHight + barier.freespace), pipe_width, pipe_hight)       

    } 
     
       
    }
}


