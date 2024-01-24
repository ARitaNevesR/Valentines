const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 800;

// ══════════════════ VARIAVEIS OBJETOS E SPRITES ══════════════════

var player = {
    x: 490,
    y: 380,
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
    x: 490,
    y: 490,
    width: 55,
    height: 25
}

var poop = {
    x: 670,
    y: 325,
    width: 25,
    height: 25
}

const background1 = new Image();
background1.src = "../scene/bathroom.png";

const poopy = new Image();
poopy.src = "../sprites/poop.png";

// ══════════════════ FUNÇÃO DESENHAR ══════════════════

function draw() {
    //MAP
    ctx.drawImage(background1, 480, 200, 250, 320);
    //END MAP

    drawMaze();

    ctx.drawImage(poopy, 630, 355, 30, 30);

    //DOOR
    //ctx.fillStyle = "green";
    //ctx.fillRect(door.x, door.y, door.width, door.height);
    //DOOREND

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
        ctx.fillRect(670, 200, 875, 300);
            walls.push({ x: 670, y: 200, width: 875, height: 300 });
        //BOTTOM
        ctx.fillRect(490, 490, 100, 50);
            walls.push({ x: 490, y: 490, width: 100, height: 50 });
        ctx.fillRect(590, 470, 100, 50);
            walls.push({ x: 590, y: 470, width: 100, height: 50 });
        //DIREITA
        ctx.fillRect(270, 200, 225, 320);
            walls.push({ x: 270, y: 200, width: 225, height: 320 });
        //TOP
        ctx.fillRect(0, 0, 875, 300);
            walls.push({ x: 0, y: 0, width: 875, height: 300 });
}   


// ══════════════════ COLISÕES ══════════════════

function movePlayer() {
    const buffer = 28;
    const nextX = player.x + player.velocityX;
    const nextY = player.y + player.velocityY;

    if (
        nextX >= 0 &&
        nextX + player.width <= canvas.width &&
        nextY >= 0 &&
        nextY + player.height <= canvas.height
    ) {
        for (const wall of walls) {
            if (
                nextX + player.width - buffer >= wall.x &&
                nextX + buffer <= wall.x + wall.width &&
                nextY + player.height - buffer >= wall.y &&
                nextY + buffer <= wall.y + wall.height
            ) {
                return;
            }
        }
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

    //DOOR
    if (player.x + player.width >= door.x && player.x <= door.x + door.width && player.y + player.height >= door.y && player.y <= door.y + door.height) {
        window.location.href = "hall.html";
      }
    //POOP
    function showPoop() {
        var popupDiv = document.getElementById("poop");
        popupDiv.style.display = 'block';
    }
    if (player.x + player.width >= poop.x && player.x <= poop.x + poop.width && player.y + player.height >= poop.y && player.y <= poop.y + poop.height) {
        showPoop();
        player.x = 550;
        player.y = 325;
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