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
    if(player.health <=0) return;
    dx = mouse.x - player.x;
    dy = mouse.y - player.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    dx = dx / distance;
    dy = dy / distance;

    brush.beginPath();
    brush.strokeStyle = "#CBD5E1";
    brush.moveTo(player.x, player.y);
    brush.lineTo(player.x+ dx*20 , player.y+ dy*20);
    brush.lineWidth = 4;
    brush.stroke();
}




// bullets

const playerBullets = [];

canvas.addEventListener("click", function(){

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


    if(player.health <= 0) return;
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



        brush.fillStyle = "#ffffff";
        brush.fillRect(playerBullets[i].x , playerBullets[i].y , 8, 3);
        
    
    }
}





// --------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------



const enemyBullets = [];

function renderEnemyBullets(){
    
    
    
    let currentRoom = currentRoomFinder();
    if(currentRoom == -1) return;
    if(player.health <= 0) return;
    for(let i=0; i<enemies.length; i++){
        enemies[i].cooldown--;
        if(enemies[i].room != currentRoom) continue;

        //now enemy has to shoot
        if(enemies[i].cooldown >0) continue;
        if(enemies[i].health<=0) continue;
        let dx = player.x - enemies[i].x;
        let dy = player.y - enemies[i].y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        dx = dx / distance;
        dy = dy / distance;

        enemyBullets.push({
            x : enemies[i].x,
            y : enemies[i].y,
            dx : dx,
            dy : dy,
            speed : 2,
            currentRoom : currentRoom,
            collisionCount: 4
        });
        enemies[i].cooldown = 60;
        
    }

    
    
    for(let i=0; i<enemyBullets.length; i++){
        // if(enemies[i].health<=0) continue;
        if(enemyBullets[i].collisionCount <= 0) {
            enemyBullets.splice(i,1);
            i--;
            continue;
        }
        console.log(enemyBullets.length);
        
        brush.beginPath();
        brush.fillStyle = "#FF8FAB";
        brush.fillRect(enemyBullets[i].x , enemyBullets[i].y , 8, 3);
        //enemies[i].cooldown--;
        enemyBullets[i].x = enemyBullets[i].x + enemyBullets[i].dx * enemyBullets[i].speed;
        enemyBullets[i].y = enemyBullets[i].y + enemyBullets[i].dy * enemyBullets[i].speed;

        if(enemyBullets[i].x < 0 || enemyBullets[i].x > canvas.width || enemyBullets[i].y < 0 || enemyBullets[i].y > canvas.height){
            enemyBullets.splice(i,1);
            i--;
            continue;
        }



        else if(Math.abs(player.x - enemyBullets[i].x) <= 10 && Math.abs(player.y - enemyBullets[i].y) <=10) {
            enemyBullets.splice(i,1);
            i--;
            player.health -= 10;
            continue;
        }

        const width = window.innerWidth / 14;
        const gap = window.innerWidth / 7;
        
             
        
    }

    //collision of enemybullet with wall:
    for(let i=0; i<enemyBullets.length; i++){
        if(enemyBullets[i].collisionCount <= 0) {
            enemyBullets.splice(i,1);
            i--;
            continue;
        }
        for(let j=0; j<rooms[enemyBullets[i].currentRoom].walls.length; j++){
            let x1 = Math.min(rooms[enemyBullets[i].currentRoom].walls[j].x1, rooms[enemyBullets[i].currentRoom].walls[j].x2);
            let x2 = Math.max(rooms[enemyBullets[i].currentRoom].walls[j].x1, rooms[enemyBullets[i].currentRoom].walls[j].x2);
            let y1 = Math.min(rooms[enemyBullets[i].currentRoom].walls[j].y1, rooms[enemyBullets[i].currentRoom].walls[j].y2);
            let y2 = Math.max(rooms[enemyBullets[i].currentRoom].walls[j].y1, rooms[enemyBullets[i].currentRoom].walls[j].y2);

            if(x1==x2){
                //vertical wall collision
                if(Math.abs(enemyBullets[i].x - x1) <= 5 && enemyBullets[i].y > y1 && enemyBullets[i].y<y2){
                    enemyBullets[i].dx = enemyBullets[i].dx * (-1);
                    enemyBullets[i].collisionCount--;
                    break;
                }
            }
            else if(y1==y2){
                if(Math.abs(enemyBullets[i].y - y1) <= 5 && enemyBullets[i].x > x1 && enemyBullets[i].x<x2){
                    enemyBullets[i].dy = enemyBullets[i].dy * (-1);
                    enemyBullets[i].collisionCount--;
                    break;
                }
            }
        }

    }

}