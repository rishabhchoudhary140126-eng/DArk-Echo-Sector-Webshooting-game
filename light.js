const lightcanvas = document.getElementById("lightcanvas");

const lightctx = lightcanvas.getContext("2d");

lightcanvas.width = window.innerWidth;
lightcanvas.height = window.innerHeight - 40;

// 
// 



// console.log(gamecanvas.width, gamecanvas.height);
// console.log(lightcanvas.width, lightcanvas.height);




let darkMode = true;
document.addEventListener("keydown", function(event){
    console.log(event.key);

    if(event.key === "n" || event.key === "N"){
        darkMode = !darkMode;
        console.log(darkMode);
    }
});


function clearcloud(){

    lightctx.clearRect(0,0,lightcanvas.width,lightcanvas.height);
    lightctx.fillStyle = "rgba(0,0,0,1)";
    lightctx.fillRect(0,0,lightcanvas.width,lightcanvas.height);

    if(player.health <=0) return;


    dx = mouse.x - player.x;
    dy = mouse.y - player.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    dx = dx / distance;
    dy = dy / distance;

    let angle = Math.atan2(dy, dx);


    lightctx.globalCompositeOperation = "destination-out";

    lightctx.beginPath();
    lightctx.moveTo(player.x, player.y);
    lightctx.arc(player.x, player.y, player.radius, 0, 2*Math.PI);
    lightctx.fill();


    lightctx.beginPath();
    lightctx.moveTo(player.x, player.y);
    lightctx.arc(player.x, player.y, 130, angle - Math.PI/6, angle + Math.PI/6);
    lightctx.fillStyle = "rgba(196, 193, 193, 1)";
    lightctx.closePath();
    lightctx.fill();

    lightctx.fillStyle = "#22C55E";
    lightctx.fillRect(player.x - 15, player.y + 20, (player.health/100)*30, 5);



    lightctx.globalCompositeOperation = "source-over";





    // lightctx.clearRect(player.x - 100, player.y - 100, 200, 200);
    // lightctx.clearRect(0,0,lightcanvas.width,lightcanvas.height);

    // lightctx.beginPath();

    // lightctx.arc(player.x, player.y, player.radius, 0, 2*Math.PI);
    // lightctx.fillStyle = "#EAB308";
    // lightctx.fill();

    // lightctx.fillStyle = "#334155";
    // lightctx.fillRect(player.x-15, player.y + 20 , 30, 5);


    // //health level
    // lightctx.fillStyle = "#22C55E";
    // lightctx.fillRect(player.x - 15, player.y + 20, (player.health/100)*30, 5);



    // if(player.health <=0) return;
    // dx = mouse.x - player.x;
    // dy = mouse.y - player.y;
    // let distance = Math.sqrt(dx*dx + dy*dy);
    // dx = dx / distance;
    // dy = dy / distance;

    // let angle = Math.atan2(dy, dx);
    // lightctx.beginPath();
    // lightctx.moveTo(player.x, player.y);
    // lightctx.arc(player.x, player.y, 130, angle - Math.PI/6, angle + Math.PI/6);
    // lightctx.fillStyle = "rgba(196, 193, 193, 1)";
    // // lightctx.closePath();
    // lightctx.fill();
    // // lightcanvas.fillStyle = "rgba(179, 134, 0, 0.8)";



    // lightctx.globalCompositeOperation = "source-out";
    // lightctx.fillStyle = "rgba(196, 193, 193, 1)";
    // lightctx.fillRect(0,0,lightcanvas.width,lightcanvas.height);

}

