DArk : Echo Sector - A top-down combat game built entirely using HTML5 Canvas, Vanilla JavaScript and CSS

# How to play:
  . Use wsad keys to move player up, down, left and right
  . left button click on mouse causes player to fire
  . 

# Keyboard shortcuts:
  N - to toggle between night and day mode;
  esc button - to play or pause game


We also have two buttons, Pause/Resume and Reset buttons, which pause, resume and restart game.


# Game Rules:

1. Player and enemy both can resist 10 bullets.
2. Player can move faster than enemy bullets, and also iots bullet travels faster, so player has to dodge enemy bullets and kill all enemies.
3. Both enemy and player bullets obey REFLECTION and can bounce only 4 times before getting destroyed.


ALL enemies dead - WINNER
player health 0 - GAME OVER.


# FEATURES:
1. We have fixed no. of rooms but, each rooms gate direction is randomly generated.
2. Bullets collide with wall, and follows usual reflection rules.
3. Player has a rifle which aims at current mouse position.
4. Enemies also fire bullets at player, but is relatively slower, enemy has cooldown systems and health properies.
5. We have score counter at top right.
6. Health system for player and enemies.
7. Darkness / vision mode (using N key).
8. Sound effects (#NOTE: Sound for enemy shoot and bullet collision is intentionly not added to remove soo much noise).
9. Pause and resume functionality(Using button and esc key shortcut).
10. Restart without page reload.
11. Responsive canvas scaling.


# Rendering Flow
Game uses two canvas layer on top of each other. Lower one has all game mechanics like rooms, walls player bullets and everything, and top one has a completely black rectangle with a hole in shape of player and attached cone which was created by  " globalCompositeOperation = "destination-out"; " 

-> Rendering Order:
  we have seperate js files for dedicated jobs and are rendered in following order:
    . game_enviroment.js
    . player.js
    . enemy.js
    . shooting.js
    . light.js
    . script.js

  game_enviroment.js:
  
    this file loads all sound effects, create random rooms with random door directions and consists function to draw rooms.

  player.js:
  
    It consist of player object, and function to draw player, move player and have event listners for keydown and keyup of wsad keys. It also contain a function which finds current room of player.
  enemy.js:
  
    It consists of enemies array, in which each enemy is pushed as oblect containing its x, y coordinates, room no. health amd cooldown timmer. consists of function to draw enemy.
  shooting.js:
  
    It has an event listner which detects current mouse position and store it in an object named mouse.
    It has an aim_to() function, which first calculates unit vectors of player to current mouse position(dx and dy). Then it draws a small line aiming towards current mouse position.
    It has playerBullets array which has all players bullets inside as object containing its position , no. of collision data, speed, and its direction data(dx and dy).
    We have renderPlayeBullets function which renders or moves all the bullets fired by player. On each mouse click an oblect is pushed in playerBullets array containing all info like x, y, dx, dy, speed and no. of collision. and this function adds dx * speed and dy * speed to each players coordinates every frame to move them. It also detects horizontal and vertical collisions and reverse dx, dy sign accordingly. and also splice bullets if collision happened 4 times.
    It has renderEEnemyBullets function, which uses currentRoomFinder() function from player.js. and if current room is -1 i.e., player is not in any room, none of enemies fires, else player is in whichever room, that rooms enemy shoots, using same logic as aim_to function, using dx, dy. It pushes dx, dy, x, y, speed, currentRoom, and collision count to enemyBullets array. Then in a for loop we splice bullets after 4 collisionm, reverse direction on collisions and move bullets bu addinf dx * speed and dy * speed. We splice player bullets on hitting enemy and vice-versa.
  light.js:
  
    It has the second canvas, contains eventlistners to change to night mode (N key), clearcloud() function which creates the cloud. We used "destination-out" as globalCompositeOperation, first we created a large rectangle, and then holes for player, health bar and a second hole as flashlight to see inside lower canvas.
  script.js:
  
    we load this at last because this script uses all the functions created in before scripts, Since we have random gates, we cant generate them every frame, so generateEnviroment and generateEnemies are called seperately, them inside a gameloop function drawEnviroment, movePlayer, drawPlayer, aim_to, renderplayerBullets, drawEnemy,     renderEnemyBullets, clearcloud, gameover, winner decleration, score system, pause, resume, reset features are set along with "requestAnimationFrame" along with various if-else conditions. 
    It also have event listners for clicks on pause/resume/reset buttons.


