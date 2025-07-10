const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 800;

// ══════════════════ VARIAVEIS OBJETOS E SPRITES ══════════════════

var player = {
    x: 540,
    y: 450,
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
    x: 510,
    y: 560,
    width: 130,
    height: 25
}

var TV = {
    x: 480,
    y: 260,
    width: 70,
    height: 25
}

const background1 = new Image();
background1.src = "../scene/bedroom1.png";


// ══════════════════ FUNÇÃO DESENHAR ══════════════════

function draw() {
    //MAP
    ctx.drawImage(background1, 460, 200, 300, 400);
    //END MAP

    drawMaze();

    //DOOR
    //ctx.fillStyle = "green";
    //ctx.fillRect(door.x, door.y, door.width, door.height);
    //DOOREND

    //TV
    //ctx.fillStyle = "green";
    //ctx.fillRect(TV.x, TV.y, TV.width, TV.height);
    //TV END

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
        ctx.fillRect(400, 0, 80, 675);
            walls.push({ x: 400, y: 0, width: 80, height: 675 });
        //TOP
        ctx.fillRect(480, 0, 200, 275);
            walls.push({ x: 400, y: 0, width: 200, height: 275 });
        //DIREITA
        ctx.fillRect(630, 0, 120, 590);
            walls.push({ x: 630, y: 0, width: 120, height: 590 });
        //BOTTOM
        ctx.fillRect(430, 530, 100, 590);
            walls.push({ x: 430, y: 530, width: 100, height: 590 });
        ctx.fillRect(530, 570, 100, 20);
            walls.push({ x: 530, y: 570, width: 100, height: 20 });
        //INTERIOR
        ctx.fillRect(550, 270, 100, 110);
            walls.push({ x: 550, y: 270, width: 100, height: 110 });
        ctx.fillRect(610, 330, 100, 110);
            walls.push({ x: 610, y: 330, width: 100, height: 110 });
        ctx.fillRect(420, 440, 100, 10);
            walls.push({ x: 420, y: 440, width: 100, height: 10 });
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
    function showTV() {
        var popupDiv = document.getElementById("television");
        popupDiv.style.display = 'block';
    }
    if (player.x + player.width >= TV.x && player.x <= TV.x + TV.width && player.y + player.height >= TV.y && player.y <= TV.y + TV.height) {
        showTV();
        player.x = 460;
        player.y = 340;
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