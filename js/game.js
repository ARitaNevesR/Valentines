
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 800;

// ══════════════════ VARIAVEIS OBJETOS E SPRITES ══════════════════

var player = {
    x: 800,
    y: 500,
    width: 100,
    height: 100,
    speed: 4,
    state: "idle-down",
};

const sprite = new Image();
sprite.src = "sprites/shawn.png";

var rita = {
    x: 380,
    y: 200,
    width: 100,
    height: 100,
    state: "idle-right"
}

var ritaBox = {
    x: 380,
    y: 240,
    width: 50,
    height: 50
}

const sprite1 = new Image();
sprite1.src = "sprites/rita.png";
  
// posição default da sprite
const spritePos = [0, 0];
const spritePos1 = [1, 2];

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
    x: 810,
    y: 400,
    width: 80,
    height: 5
}

var TV = {
    x: 310,
    y: 700,
    width: 60,
    height: 45
}

var help = {
    x: 840,
    y: 700,
    width: 30,
    height: 35
}

const mark = new Image();
mark.src = "sprites/mark.png";

var laptop = {
    x: 750,
    y: 185,
    width: 15,
    height: 10
}

const laptopSprite = new Image();
laptopSprite.src = "../sprites/laptop.png";

const background1 = new Image();
background1.src = "scene/room.png";


// ══════════════════ FUNÇÃO DESENHAR ══════════════════

function draw() {
    //MAP
    ctx.drawImage(background1, 250, 0, 700, 800);
    //END MAP

    drawMaze();

    ctx.drawImage(laptopSprite, 720, 175, 75, 70);
    //LAPTOP
    //ctx.fillStyle = "blue";
    //ctx.fillRect(laptop.x, laptop.y, laptop.width, laptop.height);
    //LAPTOP END

    //DOOR
    //ctx.fillStyle = "green";
    //ctx.fillRect(door.x, door.y, door.width, door.height);
    //DOOREND

    //TV
    //ctx.fillStyle = "blue";
    //ctx.fillRect(TV.x, TV.y, TV.width, TV.height);
    //TV END

    //RITA
    //ctx.fillStyle = "blue";
    //ctx.fillRect(ritaBox.x, ritaBox.y, ritaBox.width, ritaBox.height);
    //TV END

    //HELP
    ctx.drawImage(mark, 840, 700, 30, 35);
    //ctx.fillStyle = "white";
    //ctx.fillRect(help.x, TV.y, help.width, help.height);
    //HELP END

    //RITA
    ctx.drawImage(sprite1, spritePos1[0], spritePos1[1], 32, 32, rita.x, rita.y, rita.width, rita.height);
    const spriteCoords1 = spriteMap[rita.state];
    const frameIndex1 = Math.floor(Date.now() / 200) % spriteCoords1.length;
        
    spritePos1[0] = spriteCoords1[frameIndex1][0] * 32;
    spritePos1[1] = spriteCoords1[frameIndex1][1] * 32;
    //END RITA

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
        ctx.fillRect(0, 0, 375, 375);
            walls.push({ x: 0, y: 0, width: 375, height: 375 });
        ctx.fillRect(0, 345, 535, 170);
            walls.push({ x: 0, y: 345, width: 535, height: 170 });
        ctx.fillRect(0, 550, 430, 60);
            walls.push({ x: 0, y: 550, width: 440, height: 60 });
        ctx.fillRect(0, 560, 315, 100);
            walls.push({ x: 0, y: 560, width: 315, height: 100 });
        ctx.fillRect(0, 670, 315, 75);
            walls.push({ x: 0, y: 670, width: 315, height: 100 });
        
        //FUNDO
        ctx.fillRect(0, 720, 670, 75);
            walls.push({ x: 0, y: 720, width: 670, height: 75 });
        ctx.fillRect(600, 745, 670, 75);
            walls.push({ x: 600, y: 745, width: 670, height: 75 });
        ctx.fillRect(790, 720, 670, 75);
            walls.push({ x: 790, y: 720, width: 670, height: 75 });

        //DIREITA
        ctx.fillRect(890, 0, 375, 730);
            walls.push({ x: 890, y: 0, width: 375, height: 730 });

        //TOPO
        ctx.fillRect(370, 0, 520, 130);
            walls.push({ x: 370, y: 0, width: 520, height: 130 });
        ctx.fillRect(640, 100, 260, 110);
            walls.push({ x: 640, y: 100, width: 260, height: 110 });

        //INTERIOR
        //telefone
        ctx.fillRect(505, 600, 115, 130);
            walls.push({ x: 505, y: 600, width: 115, height: 130 });
        //escadas
        ctx.fillRect(665, 300, 145, 210);
            walls.push({ x: 665, y: 300, width: 145, height: 210 });
        ctx.fillRect(765, 300, 145, 110);
            walls.push({ x: 765, y: 300, width: 145, height: 110 });
        //rita
        ctx.fillRect(300, 200, 130, 45);
            walls.push({ x: 300, y: 200, width: 130, height: 45 });
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
        window.location.href = "rooms/hall.html";
    }
    //RITA
    function showRita() {
        var popupDiv = document.getElementById("rita");
        popupDiv.style.display = 'block';
    }
    if (player.x + player.width >= ritaBox.x && player.x <= ritaBox.x + ritaBox.width && player.y + player.height >= ritaBox.y && player.y <= ritaBox.y + ritaBox.height) {
        showRita();
        player.x = 460;
        player.y = 200;
    }
    //TV
    function showTV() {
        var popupDiv = document.getElementById("television");
        popupDiv.style.display = 'block';
    }
    if (player.x + player.width >= TV.x && player.x <= TV.x + TV.width && player.y + player.height >= TV.y && player.y <= TV.y + TV.height) {
        showTV();
        player.x = 400;
        player.y = 600;
    }
    //HELP
    function showHelpPopup() {
        var popupDiv = document.getElementById("show");
        popupDiv.style.display = 'block';
    }
    if (player.x + player.width >= help.x && player.x <= help.x + help.width && player.y + player.height >= help.y && player.y <= help.y + help.height) {
        showHelpPopup();
        player.x = 800;
        player.y = 580;
    }
    //TELEVISION
    function showLaptop() {
        var popupDiv = document.getElementById("laptop1");
        popupDiv.style.display = 'block';
    }
    if (player.x + player.width >= laptop.x && player.x <= laptop.x + laptop.width && player.y + player.height >= laptop.y && player.y <= laptop.y + laptop.height) {
        showLaptop();
        player.x = 707;
        player.y = 220;
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