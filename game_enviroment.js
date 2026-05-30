const canvas = document.getElementById("gamecanvas");


//sounds


const gunshot = new Audio("sounds/gunshot.mp3");
const playerdamaged = new Audio("sounds/playerdamaged.mp3");
const enemydamage = new Audio("sounds/enemydamage.mp3");
const enemydeath = new Audio("sounds/enemydeath.mp3");






const rooms = [];



function generateEnviroment(){
    //make rooms
    const gapX = window.innerWidth / 7;
    const gapY = (window.innerHeight -40) / 5;


    const startX = (window.innerWidth - 6*gapX)/2;
    const startY = ((window.innerHeight - 40) - 4*gapY)/2;
    for(let i=0; i<7; i++){
        
        for(let j=0; j<5; j++){
            const door_dir = Math.floor(Math.random()*4)+1;
            rooms.push({
            x : startX + i*gapX,
            y : startY + j*gapY,
            door_dir : door_dir,
            walls : []
        });
        }
    }
}

function drawEnviroment(){

    brush.fillStyle = "#0F172A";
    brush.fillRect(0,0,canvas.width,canvas.height);

    for(let room of rooms){

        rectangle(room);

    }
}

function rectangle(room){

    // 1 = top, 2 = right, 3 = bottom, 4 = left
    room.walls = [];
    const width = window.innerWidth / 14;
    const height = width;
    const gateSize = width/3;

    const x = room.x;
    const y = room.y;
    const door_dir = room.door_dir;

    brush.fillStyle = "#1E293B";
    brush.fillRect(x-width/2, y-height/2, width, height);

    
    

    if(door_dir == 1){

        brush.beginPath();
        brush.moveTo(x-width/2, y-height/2);
        brush.lineTo(x-gateSize/2, y-height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y-height/2,

            x2 : x-gateSize/2,
            y2 : y-height/2
        });

        brush.beginPath();
        brush.moveTo(x+gateSize/2, y-height/2);
        brush.lineTo(x+width/2, y-height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x+gateSize/2,
            y1 : y-height/2,

            x2 : x+width/2,
            y2 : y-height/2
        });

        brush.beginPath();
        brush.moveTo(x-width/2, y-height/2);
        brush.lineTo(x-width/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y-height/2,

            x2 : x-width/2,
            y2 : y+height/2
        });

        brush.beginPath();
        brush.moveTo(x+width/2, y-height/2);
        brush.lineTo(x+width/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x+width/2,
            y1 : y-height/2,

            x2 : x+width/2,
            y2 : y+height/2
        });

        brush.beginPath();
        brush.moveTo(x-width/2, y+height/2);
        brush.lineTo(x+width/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y+height/2,

            x2 : x+width/2,
            y2 : y+height/2
        });
    }

    else if(door_dir == 2){

        brush.beginPath();
        brush.moveTo(x-width/2, y-height/2);
        brush.lineTo(x+width/2, y-height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y-height/2,

            x2 : x+width/2,
            y2 : y-height/2
        });

        brush.beginPath();
        brush.moveTo(x-width/2, y-height/2);
        brush.lineTo(x-width/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y-height/2,

            x2 : x-width/2,
            y2 : y+height/2
        });

        brush.beginPath();
        brush.moveTo(x+width/2, y-height/2);
        brush.lineTo(x+width/2, y-gateSize/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x+width/2,
            y1 : y-height/2,

            x2 : x+width/2,
            y2 : y-gateSize/2
        });

        brush.beginPath();
        brush.moveTo(x+width/2, y+gateSize/2);
        brush.lineTo(x+width/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x+width/2,
            y1 : y+gateSize/2,

            x2 : x+width/2,
            y2 : y+height/2
        });

        brush.beginPath();
        brush.moveTo(x-width/2, y+height/2);
        brush.lineTo(x+width/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y+height/2,

            x2 : x+width/2,
            y2 : y+height/2
        });
    }

    else if(door_dir == 3){

        brush.beginPath();
        brush.moveTo(x-width/2, y-height/2);
        brush.lineTo(x+width/2, y-height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y-height/2,

            x2 : x+width/2,
            y2 : y-height/2
        });

        brush.beginPath();
        brush.moveTo(x-width/2, y-height/2);
        brush.lineTo(x-width/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y-height/2,

            x2 : x-width/2,
            y2 : y+height/2
        });

        brush.beginPath();
        brush.moveTo(x+width/2, y-height/2);
        brush.lineTo(x+width/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x+width/2,
            y1 : y-height/2,

            x2 : x+width/2,
            y2 : y+height/2
        });

        brush.beginPath();
        brush.moveTo(x-width/2, y+height/2);
        brush.lineTo(x-gateSize/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y+height/2,

            x2 : x-gateSize/2,
            y2 : y+height/2
        });

        brush.beginPath();
        brush.moveTo(x+gateSize/2, y+height/2);
        brush.lineTo(x+width/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 :x+gateSize/2,
            y1 : y+height/2,

            x2 : x+width/2,
            y2 : y+height/2
        });
    }

    else if(door_dir == 4){

        brush.beginPath();
        brush.moveTo(x-width/2, y-height/2);
        brush.lineTo(x+width/2, y-height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y-height/2,

            x2 : x+width/2,
            y2 : y-height/2
        });

        brush.beginPath();
        brush.moveTo(x-width/2, y-height/2);
        brush.lineTo(x-width/2, y-gateSize/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y-height/2,

            x2 : x-width/2,
            y2 : y-gateSize/2
        });

        brush.beginPath();
        brush.moveTo(x-width/2, y+gateSize/2);
        brush.lineTo(x-width/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y+gateSize/2,

            x2 : x-width/2,
            y2 : y+height/2
        });

        brush.beginPath();
        brush.moveTo(x+width/2, y-height/2);
        brush.lineTo(x+width/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x+width/2,
            y1 : y-height/2,

            x2 : x+width/2,
            y2 : y+height/2
        });

        brush.beginPath();
        brush.moveTo(x-width/2, y+height/2);
        brush.lineTo(x+width/2, y+height/2);
        brush.strokeStyle = "#475569";
        brush.stroke();
        room.walls.push({
            x1 : x-width/2,
            y1 : y+height/2,

            x2 : x+width/2,
            y2 : y+height/2
        });
    }
}




function reset(){
    rooms.length = 0;
    enemies.length = 0;
    playerBullets.length = 0;
    enemyBullets.length = 0;
    player.health = 100;
    player.x = 30;
    player.y = 30;
    playerScore = 0;
    generateEnviroment();
    generateEnemies();
}