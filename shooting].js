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

const bullets = [];

document.addEventListener("click", function(){

    bullets.push({

        x : player.x,
        y : player.y,

        dx : dx,
        dy : dy,

        speed : 4,
        no_of_colision : 4

    });

});


function renderBullets(){
    console.log(bullets.length);
    for(let i=0; i<bullets.length; i++){
        if(bullets[i].no_of_colision <= 0 || bullets[i].x < 0 || bullets[i].x > canvas.width || bullets[i].y < 0 || bullets[i].y > canvas.height){
            bullets.splice(i,1);
            i--;
            continue;
}
        for(let j = 0; j< rooms.length; j++){
            
            for(let k=0; k<rooms[j].walls.length; k++){
                let x2 = Math.max(rooms[j].walls[k].x2, rooms[j].walls[k].x1);
                let x1 = Math.min(rooms[j].walls[k].x2, rooms[j].walls[k].x1);
                
                let y1 = Math.min(rooms[j].walls[k].y2, rooms[j].walls[k].y1);
                let y2 = Math.max(rooms[j].walls[k].y2, rooms[j].walls[k].y1);



//

                if(bullets[i].x>=x1 && bullets[i].x<=x2 && Math.abs(bullets[i].y-y2) <=bullets[i].speed){
                    bullets[i].dy = bullets[i].dy*(-1);
                    bullets[i].no_of_colision--;
                    break;
                }
                else if(bullets[i].y>=y1 && bullets[i].y<=y2 && Math.abs(bullets[i].x-x2)<=bullets[i].speed){
                    bullets[i].dx = bullets[i].dx*(-1);
                    bullets[i].no_of_colision--;
                    break;




                }
                
            }
        }
        bullets[i].x = bullets[i].x + bullets[i].dx * bullets[i].speed;
        bullets[i].y = bullets[i].y + bullets[i].dy * bullets[i].speed;



        brush.fillStyle = "white";
        brush.fillRect(bullets[i].x , bullets[i].y , 8, 3);
        
    
    }
}