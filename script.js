const canvas = document.getElementById("gamecanvas");
const brush = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

generateEnviroment();

function gameLoop(){

    drawEnviroment();

    movePlayer();

    drawPlayer();
    aim_to();
    renderBullets();
    
    requestAnimationFrame(gameLoop);
}

gameLoop();