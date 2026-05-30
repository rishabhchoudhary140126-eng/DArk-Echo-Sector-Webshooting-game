const pause = document.getElementById("pausebtn");
let paused = false;
const score = document.getElementById("score");
let playerScore = 0;
pause.addEventListener("click" , function(){
    buttonsound.currentTime = 0;
    buttonsound.play();
    paused = !paused;
    if(paused){
        pause.innerText = "Resume";
    }
    else{
        pause.innerText = "Pause";
        gameLoop();
    }
});
document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

        paused = !paused;

        if(paused){
            pause.innerText = "Resume";
        }
        else{
            pause.innerText = "Pause";
            gameLoop();
        }
        buttonsound.currentTime = 0;
        buttonsound.play();

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
    if(darkMode == true) clearcloud();
    else lightctx.clearRect(0,0,lightcanvas.width,lightcanvas.height);
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
    buttonsound.currentTime = 0;
    buttonsound.play();
    gameLoop();
});







console.log(gamecanvas.width, gamecanvas.height, lightcanvas.width, lightcanvas.height);