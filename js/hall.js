const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 800;

// ══════════════════ VARIAVEIS OBJETOS E SPRITES ══════════════════

var player = {
    x: 510,
    y: 310,
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

var doorMain = {
    x: 820,
    y: 340,
    width: 25,
    height: 70
}

var doorBedroom1 = {
    x: 410,
    y: 220,
    width: 70,
    height: 20
}

var doorBedroom2 = {
    x: 500,
    y: 455,
    width: 115,
    height: 30
}

var doorBathroom = {
    x: 635,
    y: 220,
    width: 75,
    height: 20
}

var gallery = {
    x: 520,
    y: 220,
    width: 75,
    height: 45
}

const background1 = new Image();
background1.src = "../scene/hall.png";


// ══════════════════ FUNÇÃO DESENHAR ══════════════════

function draw() {
    //MAP
    ctx.drawImage(background1, 350, 200, 530, 300);
    //END MAP

    drawMaze();

    //GALLERY
    //ctx.fillStyle = "green";
    //ctx.fillRect(gallery.x, gallery.y, gallery.width, gallery.height);
    
    /*DOOR
    ctx.fillStyle = "green";
    ctx.fillRect(doorMain.x, doorMain.y, doorMain.width, doorMain.height);
    
    ctx.fillStyle = "green";
    ctx.fillRect(doorBedroom1.x, doorBedroom1.y, doorBedroom1.width, doorBedroom1.height);

    ctx.fillStyle = "green";
    ctx.fillRect(doorBedroom2.x, doorBedroom2.y, doorBedroom2.width, doorBedroom2.height);

    ctx.fillStyle = "green";
    ctx.fillRect(doorBathroom.x, doorBathroom.y, doorBathroom.width, doorBathroom.height);
    DOOREND*/

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
        ctx.fillRect(0, 0, 360, 675);
            walls.push({ x: 0, y: 0, width: 360, height: 675 });
        //BOTTOM
        ctx.fillRect(350, 430, 150, 60);
            walls.push({ x: 350, y: 430, width: 150, height: 60 });
        ctx.fillRect(350, 460, 300, 60);
            walls.push({ x: 350, y: 460, width: 300, height: 60 });
        ctx.fillRect(610, 430, 270, 60);
            walls.push({ x: 610, y: 430, width: 270, height: 60 });
        ctx.fillRect(210, 240, 200, 40);
            walls.push({ x: 210, y: 240, width: 200, height: 40 });

        //DIREITA
        ctx.fillRect(720, 240, 200, 30);
            walls.push({ x: 720, y: 240, width: 200, height: 30 });
        ctx.fillRect(800, 270, 75, 160);
            walls.push({ x: 800, y: 270, width: 75, height: 160 });
        //TOP
        ctx.fillRect(210, 180, 670, 60);
        walls.push({ x: 210, y: 180, width: 670, height: 60 });
        
        //INTERIOR
        ctx.fillRect(700, 360, 55, 80);
            walls.push({ x: 700, y: 360, width: 55, height: 80 });
        ctx.fillRect(480, 240, 15, 40);
            walls.push({ x: 480, y: 240, width: 15, height: 40 });
        ctx.fillRect(616, 240, 15, 40);
            walls.push({ x: 616, y: 240, width: 15, height: 40 });
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

    if (player.x + player.width >= doorMain.x && player.x <= doorMain.x + doorMain.width && player.y + player.height >= doorMain.y && player.y <= doorMain.y + doorMain.height) {
        window.location.href = "../entrance.html";
    }

    if (player.x + player.width >= doorBedroom1.x && player.x <= doorBedroom1.x + doorBedroom1.width && player.y + player.height >= doorBedroom1.y && player.y <= doorBedroom1.y + doorBedroom1.height) {
        window.location.href = "bedroom1.html";
    }

    if (player.x + player.width >= doorBedroom2.x && player.x <= doorBedroom2.x + doorBedroom2.width && player.y + player.height >= doorBedroom2.y && player.y <= doorBedroom2.y + doorBedroom2.height) {
        window.location.href = "bedroom2.html";
    }

    if (player.x + player.width >= doorBathroom.x && player.x <= doorBathroom.x + doorBathroom.width && player.y + player.height >= doorBathroom.y && player.y <= doorBathroom.y + doorBathroom.height) {
        window.location.href = "bathroom.html";
    }

    function showGallery() {
        var popupDiv = document.getElementById("gallery");
        popupDiv.style.display = 'block';
    }
    if (player.x + player.width >= gallery.x && player.x <= gallery.x + gallery.width && player.y + player.height >= gallery.y && player.y <= gallery.y + gallery.height) {
        showGallery();
        player.x = 510;
        player.y = 270;
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