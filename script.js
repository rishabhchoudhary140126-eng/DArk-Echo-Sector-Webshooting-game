const canvas = document.getElementById("gamecanvas");
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
        
        requestAnimationFrame(gameLoop);

    }
}

gameLoop();

