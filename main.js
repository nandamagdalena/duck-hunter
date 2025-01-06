const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const gameoverwindow = document.getElementById('gameoverwindow')
const pausewindow = document.getElementById('pausewindow');
const continueBtn = document.getElementById('continueBtn');
const restartBtn = document.getElementById('restartBtn');
const backToMenuBtn = document.getElementById('backToMenuBtn');

canvas.width = window.innerWidth
canvas.height = window.innerHeight
let isPaused = false;

const BgImage = new Image()
BgImage.src = "Background.png"

const duckImage = new Image()
duckImage.src = "duck.png"

const aimImage = new Image()
aimImage.src = "aim.png"


const hitSound =  new Audio("hit.m4a")


function pauseGame() {
    isPaused = true;
    clearInterval(duckInterval); 
    pausewindow.style.display = 'block';
}

function resumeGame() {
    isPaused = false;
    pausewindow.style.display = 'none';
    duckInterval = setInterval(spawnDuck, spawnInterval); 
    animate(); 
}

function restartGame() {
    resetGame();
    pausewindow.style.display = 'none';
    gameStart(); 
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !isGameOver) {
        if (!isPaused) {
            pauseGame();
        } else {
            resumeGame();
        }
    }
});


continueBtn.addEventListener('click', resumeGame);

restartBtn.addEventListener('click', restartGame);

backToMenuBtn.addEventListener('click', () => {
    console.log("back to menu");
    pausewindow.style.display = 'none';
    gamecontainer.style.display = 'none';
    gamemenu.style.display = 'flex';
    location.reload(); 
});


function drawBackground(){
    ctx.drawImage(BgImage,0,0,canvas.width,canvas.height)
}

let ducks = []
let health = 3
let point = 0
let isGameOver = false
const cursor = {
    x:0,
    y:0,
    width:100

}

    
canvas.addEventListener("mousemove", function(e){
    cursor.x = e.offsetX - cursor.width /2
    cursor.y = e.offsetY - cursor.width/2
})

function drawDuck(duck){
    ctx.drawImage(duckImage,duck.x,duck.y,duck.width,duck.height)
}

function drawAim(){
    ctx.drawImage(aimImage,cursor.x,cursor.y,100,100)
}

function drawHealth() {
   
   
    const startX = canvas.width / 2 
    const posY = canvas.height - 50

    for (let i = 0; i < health; i++) {
        ctx.beginPath();
        ctx.arc(startX + i * 40, posY, 15, 0, Math.PI * 2);
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.stroke();
    }
}

function animate() {
    if (isGameOver || isPaused) return; 
    console.log("animating");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    ducks.forEach((duck, index) => {
        if (!duck.falling) {
            duck.x += speed;
        } else {
            duck.y += duck.fallSpeed;
        }
        drawDuck(duck);
    });

    drawAim();
    drawHealth();

    requestAnimationFrame(animate);
}


function spawnDuck(){
   const newDuck = {
        x: -10,
        y: Math.random() * canvas.height / 2,
        width: 100,
        height: 100,
        falling: false,
        fallSpeed: 5
    };
    ducks.push(newDuck);
}

let canShoot = true
function isHit(x,y){
    if(!canShoot){
        console.log("cant")
         return}
    let hit = false
    ducks.forEach((duck,index)=>{
    const leftSide = duck.x
    const rightSide = duck.x + 100
    const topSide = duck.y
    const bottomSide = duck.y + 100

    if(x > leftSide && x < rightSide && y > topSide && y < bottomSide){
        console.log("kena")
        point += 10
        console.log(point)
        duck.falling = true
        hit = true
        scoreText.innerHTML = `Score: ${point}`
    }
})
if(!hit){
    if(canShoot){
        health -= 1
    }
    console.log(health)
    if(health ==0 ){
        gameOver()
    }
}
canShoot = false
setTimeout(() => {
    canShoot = true
}, 1000);
}




function gameOver(){
    isGameOver = true
    // alert("gameoberrrrrrrrrrrrrrrr")
    ctx.clearRect(0,0,canvas.width,canvas.height)
    clearInterval(duckInterval)
    // canvas.style.pointerEvents = 'none';
    scoreBoard()
    // location.reload();
    gamecontainer.style.display = "none"
    gameoverwindow.style.display = "block"
}


function scoreBoard(){
        let scoreBoard = JSON.parse(localStorage.getItem('scoreBoard'));
       
        if(scoreBoard){
            let userHighScore = scoreBoard.find(function (val,index){
            return val.name == username.value
        })
            if(!userHighScore){
                scoreBoard.push({
                    name: username.value,
                    score: point
                })
            }else{
                userHighScore.score = Math.max(point,userHighScore.score)
            }
        }else{
            localStorage.setItem('scoreBoard',JSON.stringify([{name: username.value, score: point}]))
            return;
        }
        localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
    }

canvas.addEventListener("click",(e)=>{
   if(canShoot){
     hitSound.play()
   }
    isHit(e.offsetX,e.offsetY)
})


 
let duckInterval

function gameStart(){
    console.log("s")
    // BgImage.onload = function (){
        console.log("p")
        animate()
         duckInterval = setInterval(spawnDuck, spawnInterval);
    // }
}


