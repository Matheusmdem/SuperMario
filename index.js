const mario = document.querySelector(".super-mario");
const pipe = document.querySelector(".pipe-game");
const audioEnd = document.querySelector("#end");
const audioStart = document.querySelector("#start");
const jumpSound = document.querySelector("#jumpSound");
const Start = document.querySelector(".play");
let count = 0;
let largerPoint = new Array();
let points = [];

largerPoint[0] = 0;
largerPoint[1] = 0;
largerPoint[2] = 0;

function largest() {

  for (i = 0; i < points.length; i++) {
    if (points[i] > largerPoint[0]) {
      largerPoint[0] = points[i];
    }
  }

  for (i = 0; i < points.length; i++) {
    if (points[i] > largerPoint[1] && points[i] < largerPoint[0]) {
      largerPoint[1] = points[i];
    }
  }

  for (i = 0; i < points.length; i++) {
    if (points[i] > largerPoint[2] && points[i] < largerPoint[1]) {
      largerPoint[2] = points[i];
    }
  }
}

function begin() {
  audioStart.play()
  audioEnd.pause()
  audioEnd.currentTime = 0;
  Start.classList.add("display")
  pipe.style.left = "";
  pipe.style.animation = "";
  mario.src = "./images/super-mario.gif";
  mario.style.width = "";
  mario.style.animation = "";
  mario.style.bottom = "";
  count = 0;
  
  const jump = (e) => {
    if (e.code === 'ArrowUp' || e.code === 'Space' || e.code === 'Enter') {
      if (marioPosition === 0) {
        jumpSound.play()
        mario.classList.add("jump-mario");
        
        setTimeout(() => {
          mario.classList.remove("jump-mario");
        }, 500)
      }
    }  
  };
  

  const score = setInterval(() => {
    count++;
  }, 400);

  const loopGame = setInterval(() => {
    pipePosition = pipe.offsetLeft;
    marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
  
      pipe.style.animation="none";
      pipe.style.left = `${pipePosition}px`;
      
      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;
      
      Start.classList.remove("display")
      audioStart.pause()
      audioStart.currentTime = 0;
      audioEnd.play()
      mario.src = "./images/mario-game-over.png";
      mario.style.width = "75px";
      mario.style.marginLeft = "45px";
      
      clearInterval(loopGame)
      clearInterval(score)
      
      points.push(count);
      largest()
    
      document.getElementById("record1").innerHTML = largerPoint[0];
      document.getElementById("record2").innerHTML = largerPoint[1];
      document.getElementById("record3").innerHTML = largerPoint[2];

    }
    
    document.getElementById("score").innerHTML = count;

  }, 10);

  document.addEventListener("keydown", jump)
}