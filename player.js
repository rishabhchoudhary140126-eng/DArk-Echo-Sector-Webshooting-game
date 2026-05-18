const width = window.innerWidth / 14;
const gateSize = width/3;
function drawPlayer(){

    brush.beginPath();

    brush.arc(player.x, player.y, player.radius, 0, 2*Math.PI);
    brush.fillStyle = "#C0D600";
    brush.fill();
}


//movement
const player = { x: 30, 
    y: 30, 
    radius : gateSize/3,  
    speed :1.5};

let w_pressed = false;
let a_pressed = false;
let s_pressed = false;
let d_pressed = false;


document.addEventListener("keydown", function(event){

    if(event.key == "w"){
        w_pressed = true;
    }

    if(event.key == "a"){
        a_pressed = true;
    }

    if(event.key == "s"){
        s_pressed = true;
    }

    if(event.key == "d"){
        d_pressed = true;
    }

});

document.addEventListener("keyup", function(event){

    if(event.key == "w"){
        w_pressed = false;
    }

    if(event.key == "a"){
        a_pressed = false;
    }

    if(event.key == "s"){
        s_pressed = false;
    }

    if(event.key == "d"){
        d_pressed = false;
    }

});


function movePlayer(){
    
    let upWallHit = false;
    let downWallHit = false;
    let leftWallHit = false;
    let rightWallHit = false;


    for(let i =0 ; i<rooms.length; i++){
        for(let j =  0; j<rooms[i].walls.length; j++){
            let x2 = Math.max(rooms[i].walls[j].x2, rooms[i].walls[j].x1);
            let x1 = Math.min(rooms[i].walls[j].x2, rooms[i].walls[j].x1);
            
            let y1 = Math.min(rooms[i].walls[j].y2, rooms[i].walls[j].y1);
            let y2 = Math.max(rooms[i].walls[j].y2, rooms[i].walls[j].y1);
            
            if(player.x>=x1 && player.x<=x2 && player.radius>=Math.abs(y2 - player.y) && player.y>=y2){
                upWallHit = true;
            }
            if(player.x>=x1 && player.x<=x2 && player.radius>=Math.abs(y2 - player.y) && player.y<=y2){
                downWallHit = true;
            }
            if (player.y>=y1 && player.y<=y2 && player.radius>=Math.abs(x2 - player.x) && player.x<=x2){
                rightWallHit = true;
            }
            if (player.y>=y1 && player.y<=y2 && player.radius>=Math.abs(x2 - player.x) && player.x>=x2){
                leftWallHit = true;
            }
        }
    }


    if(w_pressed ){
        if(player.y>player.radius && upWallHit==false){
            player.y = player.y - player.speed;
        }
    }

    if(s_pressed){
        if(player.y<window.innerHeight-player.radius && downWallHit==false) player.y = player.y + player.speed;
    }

    if(a_pressed){
        if(player.x>player.radius && leftWallHit==false) player.x = player.x - player.speed;
    }

    if(d_pressed){
        if(player.x< window.innerWidth - player.radius && rightWallHit==false) player.x = player.x + player.speed;
    }

}