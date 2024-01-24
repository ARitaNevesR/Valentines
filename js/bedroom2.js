const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 800;

// ══════════════════ VARIAVEIS OBJETOS E SPRITES ══════════════════

var player = {
    x: 510,
    y: 330,
    width: 100,
    height: 100,
    speed: 4,
    state: "idle-down",
};

const sprite = new Image();
sprite.src = "../sprites/shawn.png";
  
// posição default da sprite
const spritePos = [0, 0];

const spriteMap = {
    "idle-down" : [ [1,0] ],
    "idle-right": [ [1,2] ],
    "idle-up"   : [ [1,3] ],
    "idle-left" : [ [1,1] ],
    "walk-down" : [ [0,0],[1,0],[2,0],[1,0], ],
    "walk-right": [ [0,2],[1,2],[2,2],[1,2], ],
    "walk-up"   : [ [0,3],[1,3],[1,3],[1,3], ],
    "walk-left" : [ [0,1],[1,1],[2,1],[1,1], ]
};

var door = {
    x: 620,
    y: 205,
    width: 50,
    height: 10
}

var drawer = {
    x: 520,
    y: 235,
    width: 50,
    height: 20
}

const background1 = new Image();
background1.src = "../scene/bedroom2.png";


// ══════════════════ FUNÇÃO DESENHAR ══════════════════

function draw() {
    //MAP
    ctx.drawImage(background1, 450, 200, 320, 300);
    //END MAP

    drawMaze();

    //DOOR
    //ctx.fillStyle = "green";
    //ctx.fillRect(door.x, door.y, door.width, door.height);
    //DOOREND

    //ctx.fillStyle = "green";
    //ctx.fillRect(drawer.x, drawer.y, drawer.width, drawer.height);

    //SHAWN
    const spriteCoords = spriteMap[player.state];
    const frameIndex = Math.floor(Date.now() / 200) % spriteCoords.length;
    
    spritePos[0] = spriteCoords[frameIndex][0] * 32;
    spritePos[1] = spriteCoords[frameIndex][1] * 32;
    
    ctx.drawImage(sprite, spritePos[0], spritePos[1], 32, 32, player.x, player.y, player.width, player.height);
    //END SHAWN
  
}

// ══════════════════ COLISION ══════════════════
var walls = [];
function drawMaze() {
    walls = []; 

    // PAREDES
    //ctx.fillStyle = "red";
    ctx.fillStyle = "transparent"

        // ESQUERDA
        ctx.fillRect(400, 200, 65, 300);
            walls.push({ x: 400, y: 200, width: 65, height: 300 });

        //TOP
        ctx.fillRect(460, 200, 240, 30);
            walls.push({ x: 460, y: 200, width: 240, height: 30 });
        //DIREITA
        ctx.fillRect(750, 200, 30, 290);
            walls.push({ x: 750, y: 200, width: 30, height: 290 });
        //BOTTOM
        ctx.fillRect(450, 460, 300, 30);
            walls.push({ x: 450, y: 460, width: 300, height: 30 });
        //INTERIOR
        ctx.fillRect(710, 200, 40, 130);
            walls.push({ x: 710, y: 200, width: 40, height: 130 });
        ctx.fillRect(680, 200, 40, 60);
            walls.push({ x: 680, y: 200, width: 40, height: 60 });
        ctx.fillRect(590, 200, 20, 60);
            walls.push({ x: 590, y: 200, width: 20, height: 60 });
        ctx.fillRect(460, 200, 30, 70);
            walls.push({ x: 460, y: 200, width: 30, height: 70 });
        ctx.fillRect(460, 340, 45, 120);
            walls.push({ x: 460, y: 340, width: 45, height: 120 });
}


// ══════════════════ COLISÕES ══════════════════

function movePlayer() {
    const buffer = 28; // increase this value to move closer to the walls
    const nextX = player.x + player.velocityX;
    const nextY = player.y + player.velocityY;

    // Proxima poxição dentro do canvas?
    if (
        nextX >= 0 &&
        nextX + player.width <= canvas.width &&
        nextY >= 0 &&
        nextY + player.height <= canvas.height
    ) {
        // Confirma se a proxima posição colide com uma parede
        for (const wall of walls) {
            if (
                nextX + player.width - buffer >= wall.x &&
                nextX + buffer <= wall.x + wall.width &&
                nextY + player.height - buffer >= wall.y &&
                nextY + buffer <= wall.y + wall.height
            ) {
                // Colide com uma parede -> impede o movimento
                return;
            }
        }

        // Update the player's position
        player.x = nextX;
        player.y = nextY;
    }
}

// ══════════════════ MOVIMENTAÇÃO PLAYER ══════════════════

var keyState = {};

document.addEventListener("keydown", function (event) {
    keyState[event.code] = true;
    isPlayerMoving = true;
});

document.addEventListener("keyup", function (event) {
    keyState[event.code] = false;
    isPlayerMoving = false;
});

function handleMovement() {
    player.velocityX = 0;
    player.velocityY = 0;

    if (keyState["ArrowUp"]) {
        player.velocityY = -player.speed;
        player.state = "walk-up";
    }
    if (keyState["ArrowDown"]) {
        player.velocityY = player.speed;
        player.state = "walk-down";
    }
    if (keyState["ArrowLeft"]) {
        player.velocityX = -player.speed;
        player.state = "walk-left";
    }
    if (keyState["ArrowRight"]) {
        player.velocityX = player.speed;
        player.state = "walk-right";
    }

    if (player.x + player.width >= door.x && player.x <= door.x + door.width && player.y + player.height >= door.y && player.y <= door.y + door.height) {
        window.location.href = "hall.html";
    }
    //TV
    function showDrawer() {
        var popupDiv = document.getElementById("drawer");
        popupDiv.style.display = 'block';
    }
    if (player.x + player.width >= drawer.x && player.x <= drawer.x + drawer.width && player.y + player.height >= drawer.y && player.y <= drawer.y + drawer.height) {
        showDrawer();
        player.x = 490;
        player.y = 280;
    }
}

function movePlayerSmooth() {
    handleMovement();
    movePlayer();
}

// IDLE
function checkIdle() {
    if (!isPlayerMoving) {
        if (player.state === "walk-up") {
            player.state = "idle-up";
        } else if (player.state === "walk-down") {
            player.state = "idle-down";
        } else if (player.state === "walk-left") {
            player.state = "idle-left";
        } else if (player.state === "walk-right") {
            player.state = "idle-right";
        }
    }
}

document.addEventListener("keyup", keyupHandler);

function keyupHandler(event) {
    if (event.key.startsWith("Arrow")) {
        isPlayerMoving = false;
    }
}

setInterval(movePlayerSmooth, 1000 / 60); // Call movePlayerSmooth every frame

setInterval(checkIdle, 100); // Call checkIdle every 100 milliseconds


// ══════════════════ Função Update ══════════════════  
  
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    requestAnimationFrame(update);
}
  
update();