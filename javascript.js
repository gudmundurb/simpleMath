var playing = false;
let score;
let reset = "Byrja aftur";
let start = "Byrja leik";
let action;
let timeRemaining;
let correctAnswer;
document.getElementById("startReset").onclick = () => {
  if (playing == true) {
    location.reload(); //reload page
  } else {
    // game has started
    playing = true;
    hide("gameOver");
    // score starts at 0
    score = 0;
    // show score
    document.getElementById("scoreValue").innerHTML = score;
    // show time countDown
    show("timeRemaining");
    // change text of start button
    document.getElementById("startReset").innerHTML = reset;
    // countdown function called
    timeRemaining = 60;
    document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

    countdown();
    // generate question and answer
    generateQA();
  }
};

for (var i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function() {
    if (playing == true) {
      if (this.innerHTML == correctAnswer) {
        score++;
        document.getElementById("scoreValue").innerHTML = score;
        hide("wrong");
        show("correct");
        setTimeout(() => {
          hide("correct");
        }, 1000);
        generateQA();
      } else {
        hide("correct");
        show("wrong");
        setTimeout(() => {
          hide("wrong");
        }, 1000);
      }
    }
  };
}

function countdown() {
  action = setInterval(() => {
    timeRemaining -= 1;
    document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
    if (timeRemaining == 0) {
      stopCountdown();
      show("gameOver");
      document.getElementById("finalScore").innerHTML = score;
      hide("timeRemaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startReset").innerHTML = start;
    }
  }, 1000);
}
function stopCountdown() {
  clearInterval(action);
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}
function show(id) {
  document.getElementById(id).style.display = "block";
}

function generateQA() {
  let numb1 = 1 + Math.round(9 * Math.random());
  let numb2 = 1 + Math.round(9 * Math.random());
  correctAnswer = numb1 * numb2;

  document.getElementById("question").innerHTML = `${numb1} x ${numb2}`;
  var cPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + cPosition).innerHTML = correctAnswer;

  var answer = [correctAnswer];

  for (i = 1; i < 5; i++) {
    if (i !== cPosition) {
      var wrongAnswer;
      do {
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random()));
      } while (answer.indexOf(wrongAnswer) > -1);
      {
        answer.push(wrongAnswer);
        document.getElementById("box" + i).innerHTML = wrongAnswer;
      }
    }
  }
}
