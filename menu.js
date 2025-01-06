const usernameInput = document.getElementById('username');
const level = document.getElementById('level');
const leaderboardBtn = document.querySelector('.leaderboardBtn');
const lbgo = document.getElementById('lbgo');
const leaderboard = document.getElementById("leaderboard");
const startBtn = document.getElementById('startBtn');
const gamemenu = document.getElementById("gamemenu");
const gamecontainer = document.getElementById("gamecontainer");
const scoreText = document.getElementById("scoreText");
const usernameText = document.getElementById("usernameText");
const Btnbacktomenu = document.getElementById("Btnbacktomenu");
const retryBtn = document.getElementById("retryBtn");
const scoreTable = document.getElementById("scoreTable");

let spawnInterval = 3000;
let speed = 2;

startBtn.addEventListener("click", () => {
    const selectedLevel = level.value;
    if (selectedLevel === "easy") {
        spawnInterval = 5000;
        speed = 2;
    } else if (selectedLevel == "medium") {
        spawnInterval = 3000;
        speed = 4;
    } else {
        spawnInterval = 2000;
        speed = 5;
    }
    gamemenu.style.display = "none";
    gamecontainer.style.display = "block";
    usernameText.innerHTML = `Username: ${usernameInput.value}`;
    // scoreText.innerHTML = `Score: 0`;
    gameStart();
});

leaderboardBtn.addEventListener("click", () => {
    console.log("leaderboard");
    gamemenu.style.display = "none";
    gameoverwindow.style.display = "none";
    // gamecontainer.style.display = "none";
    leaderboard.style.display = "block";
});
lbgo.addEventListener("click", () => {
    gameoverwindow.style.display = "none";
    // gamecontainer.style.display = "none";
    leaderboard.style.display = "block";
    
});

Btnbacktomenu.addEventListener("click", () => {
    gameoverwindow.style.display = "none";
    gamemenu.style.display = "flex";
    location.reload();
});

function resetGame() {
    ducks = [];
    health = 3;
    point = 0;
    isGameOver = false;
    canShoot = true;
    isPaused = false; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spawnDuck(); 
    animate(); 
}


retryBtn.addEventListener("click", () => {
    resetGame();
    gameoverwindow.style.display = "none";
    gamecontainer.style.display = "flex";
    gameStart();
});

let localScoreBoard = JSON.parse(localStorage.getItem('scoreBoard'));
localScoreBoard = localScoreBoard.sort((a, b) => {
    return b.score - a.score;
});

localScoreBoard.forEach((val, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${index + 1}</td><td>${val.name}</td><td>${val.score}</td>`;
    scoreTable.appendChild(row);
});