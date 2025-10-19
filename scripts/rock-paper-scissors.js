let score={
            win:0 ,
            lose:0,
            tie:0
        };
let scoreElement= document.querySelector('.score');
let gameboxResultsElement= document.querySelector('.gamebox-results');
// initializing
showscore();
//-------------
function showscore(){
scoreElement.innerHTML = `You = ${score.win}      ,      ${score.lose} = Computer`;
}
function reset(){ 
score.win=0 ;
score.lose=0;
score.tie=0;
gameboxResultsElement.innerHTML="";
showscore();
}
function get_computer_move(){
    let computer_move='';
    let random_num= Math.random() ;

    if(random_num <= 1/3 && random_num >= 0 ){
        computer_move='rock';
    }
    else if(random_num > 1/3 && random_num <= 2/3){
        computer_move='paper';
    } 
    else if(random_num > 2/3 && random_num <= 1) {
        computer_move='sicissor';
    }

    return computer_move;
}
function check_winner(player_move1){
    let computer_move1 = get_computer_move();
    let result;

    if(player_move1 =='rock'){
        if( computer_move1 == 'rock'){ 
            result='tie';
        }
        else if( computer_move1 == 'paper'){
            result='lost';
        } 
        else if( computer_move1 == 'sicissor'){
            result='won';
        } 
    }
    else if(player_move1 =='sicissor'){
        if( computer_move1 == 'rock'){ 
            result='lost';
        }
        else if( computer_move1 == 'paper'){
            result='won';
        } 
        else if( computer_move1 == 'sicissor'){
            result='tie';
        } 
    }
    else if(player_move1 =='paper'){
        if( computer_move1 == 'rock'){ 
            result='won';
        }
        else if( computer_move1 == 'paper'){
            result='tie';
        } 
        else if( computer_move1 == 'sicissor'){
            result='lost';
        } 
    }


    if(result == 'tie'){
        gameboxResultsElement.innerHTML=`  
                                        <p class="result">${'Tie'}</p>  
                                        <div class="images-results">
                                            <p class="player-p">you</p>
                                            <img src="../rock-paper-scissor-images/${player_move1}-emoji.png"
                                                class="${player_move1} player-move"></img>
                                            <img src="../rock-paper-scissor-images/${computer_move1}-emoji.png"
                                                class="${computer_move1} computer-move"></img>
                                            <p class="computer-p">computer</p>
                                        </div>  
                                        `
        score.tie++;
        showscore();
    }
    else if(result == 'won'){
        gameboxResultsElement.innerHTML=`  
                                <p class="result">${'You Won'}</p>  
                                <div class="images-results">
                                    <p class="player-p">you</p>
                                    <img src="../rock-paper-scissor-images/${player_move1}-emoji.png"
                                        class="${player_move1} player-move"></img>
                                    <img src="../rock-paper-scissor-images/${computer_move1}-emoji.png"
                                        class="${computer_move1} computer-move"></img>
                                    <p class="computer-p">computer</p>
                                </div>  
                                `
                                
        score.win++;
        showscore();
    }
    else if(result == 'lost'){
        gameboxResultsElement.innerHTML=`  
                                <p class="result">${'You Lost'}</p>  
                                <div class="images-results">
                                    <p class="player-p">you</p>
                                    <img src="../rock-paper-scissor-images/${player_move1}-emoji.png"
                                        class="${player_move1} player-move"></img>
                                    <img src="../rock-paper-scissor-images/${computer_move1}-emoji.png"
                                        class="${computer_move1} computer-move"></img>
                                    <p class="computer-p">computer</p>
                                </div>  
                                `
        score.lose++;
        showscore();
    }
}