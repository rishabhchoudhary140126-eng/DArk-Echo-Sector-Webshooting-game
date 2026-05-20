const enemies = [];
function generateEnemies(){
    for(let i=0; i<rooms.length; i++){
        let enemyX = 0;
        let enemyY = 0;
        if(rooms[i].door_dir==1){
            enemyX = rooms[i].x + (window.innerWidth / 14)/3;
            enemyY = rooms[i].y + (window.innerHeight / 14)/3;
        }
        else if(rooms[i].door_dir==2){
            enemyX = rooms[i].x - (window.innerWidth / 14)/3;
            enemyY = rooms[i].y + (window.innerHeight / 14)/3;
        }
        else if(rooms[i].door_dir==3){
            enemyX = rooms[i].x - (window.innerWidth / 14)/3;
            enemyY = rooms[i].y - (window.innerHeight / 14)/3;
        }
        else if(rooms[i].door_dir==4){
            enemyX = rooms[i].x + (window.innerWidth / 14)/3;
            enemyY = rooms[i].y - (window.innerHeight / 14)/3;
        }

        enemies.push ({
            x: enemyX,
            y:enemyY,
            health: 100

        })
    }
}
function drawEnemy(){
    for(let i=0; i<enemies.length; i++){
        if(enemies[i].health<=0) continue;
        brush.beginPath();
        brush.arc(enemies[i].x, enemies[i].y, 10, 0,  2*Math.PI);
        brush.fillStyle = "#ff0000";
        brush.fill();


        for(let j=0; j<playerBullets.length; j++){
            if(Math.abs(playerBullets[j].x - enemies[i].x) <= 10 && Math.abs(playerBullets[j].y - enemies[i].y) <=10) {
                enemies[i].health = enemies[i].health - 10;
                playerBullets.splice(j,1);
                j--;
            }
        }
    }
}