let mouse = {
    x:0,
    y:0
}


let dx=0;
let dy=0;
document.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y
})
// normalise (read more)
function aim_to(){
    dx = mouse.x - player.x;
    dy = mouse.y - player.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    dx = dx / distance;
    dy = dy / distance;

    brush.beginPath();
    brush.moveTo(player.x, player.y);
    brush.lineTo(player.x+ dx*20 , player.y+ dy*20);
    brush.lineWidth = 5;
    brush.stroke();
}




// bullets

const playerBullets = [];

document.addEventListener("click", function(){

    playerBullets.push({

        x : player.x,
        y : player.y,

        dx : dx,
        dy : dy,

        speed : 4,
        no_of_colision : 4

    });

});


function renderplayerBullets(){
    //console.log(playerBullets.length);
    for(let i=0; i<playerBullets.length; i++){
        
        if(playerBullets[i].no_of_colision <= 0 || playerBullets[i].x < 0 || playerBullets[i].x > canvas.width || playerBullets[i].y < 0 || playerBullets[i].y > canvas.height){
            playerBullets.splice(i,1);
            i--;
            continue;
}
        for(let j = 0; j< rooms.length; j++){
            
            for(let k=0; k<rooms[j].walls.length; k++){
                let x2 = Math.max(rooms[j].walls[k].x2, rooms[j].walls[k].x1);
                let x1 = Math.min(rooms[j].walls[k].x2, rooms[j].walls[k].x1);
                
                let y1 = Math.min(rooms[j].walls[k].y2, rooms[j].walls[k].y1);
                let y2 = Math.max(rooms[j].walls[k].y2, rooms[j].walls[k].y1);



                

                if(playerBullets[i].x>=x1 && playerBullets[i].x<=x2 && Math.abs(playerBullets[i].y-y2) <=playerBullets[i].speed){
                    playerBullets[i].dy = playerBullets[i].dy*(-1);
                    playerBullets[i].no_of_colision--;
                    break;
                }
                else if(playerBullets[i].y>=y1 && playerBullets[i].y<=y2 && Math.abs(playerBullets[i].x-x2)<=playerBullets[i].speed){
                    playerBullets[i].dx = playerBullets[i].dx*(-1);
                    playerBullets[i].no_of_colision--;
                    break;




                }
                
            }
        }
        playerBullets[i].x = playerBullets[i].x + playerBullets[i].dx * playerBullets[i].speed;
        playerBullets[i].y = playerBullets[i].y + playerBullets[i].dy * playerBullets[i].speed;



        brush.fillStyle = "white";
        brush.fillRect(playerBullets[i].x , playerBullets[i].y , 8, 3);
        
    
    }
}