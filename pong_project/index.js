import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

let lastTime;
function Update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    //  UPDATE CODE
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);

    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) {
      HandleLose();
    }
  }

  lastTime = time;
  window.requestAnimationFrame(Update);

  function isLose() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
  }

  function HandleLose() {
    const rect = ball.rect();

    if (rect.right >= window.innerWidth) {
      playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    } else {
      computerScoreElem.textContent =
        parseInt(computerScoreElem.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset();
  }
}

window.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(Update);
