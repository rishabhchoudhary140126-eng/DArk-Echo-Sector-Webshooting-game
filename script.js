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
    console.log(rooms[0].walls.length);
    drawEnemy();
    requestAnimationFrame(gameLoop);
}

gameLoop();