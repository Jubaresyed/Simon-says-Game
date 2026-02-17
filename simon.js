let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "blue", "yellow"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2")

let h3 = document.querySelector("#highScore");
let highestScore = 0;

let reloadBtn = document.querySelector("#reload-btn");
reloadBtn.addEventListener("click", function () {
    location.reload();
});

reloadBtn.onclick = () => location.reload();

document.addEventListener("keypress", function() {
    if(started == false) {
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 4);
    let ranClr = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranClr}`)
    gameSeq.push(ranClr);
    // console.log(gameSeq);
    gameFlash(ranBtn);
}

function checkAns (idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }else {
        let currentScore = (level - 1) * 5;
        if(currentScore > highestScore) {
            highestScore = currentScore;
            h3.innerText = `High Score: ${highestScore}`;
        } 
        h2.innerHTML = `Game over..! <b>Your score was ${(level-1) * 5}</b>  <br>Press any key to restart`;
        h2.style.color = "red";
        setTimeout(function () {
            h2.style.color = "black";
        }, 1000);
    
        reset();
    }
}

function btnPress () {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
