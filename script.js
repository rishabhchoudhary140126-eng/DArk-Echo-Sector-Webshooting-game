const canvas = document.getElementById("gamecanvas");
const brush = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
        alert("Game Over");

        return;
    }
    else if(enemies.length <=0){
        alert("You won, ALL ENEMIES ARE DEAD");
        return;
    }
    else{
        
        requestAnimationFrame(gameLoop);

    }
}

gameLoop();

