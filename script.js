const pause = document.getElementById("pausebtn");
let paused = false;
const score = document.getElementById("score");
let playerScore = 0;
pause.addEventListener("click" , function(){
    paused = !paused;
    if(paused){
        pause.innerText = "Resume";
    }
    else{
        pause.innerText = "Pause";
        gameLoop();
    }
});




const brush = canvas.getContext("2d");


const header = document.getElementById("header");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 40;


generateEnviroment();
generateEnemies();
function gameLoop(){

    drawEnviroment();

    movePlayer();

    drawPlayer();
    aim_to();
    renderplayerBullets();
    drawEnemy();
    renderEnemyBullets();
    score.innerText = "Score: " + playerScore;

    if(player.health <= 0) {
        reset();
        alert("Game Over");

        requestAnimationFrame(gameLoop);
    }
    else if(enemies.length <=0){
        reset();
        alert("You won, ALL ENEMIES ARE DEAD");
        requestAnimationFrame(gameLoop); 
    }

    else{
        if(paused) return;
        else requestAnimationFrame(gameLoop);

    }
}

gameLoop();





const resetbtn = document.getElementById("resetbtn");
resetbtn.addEventListener("click", function(){
    reset();
    paused = false;
    pause.innerText = "Pause";
    gameLoop();
});




