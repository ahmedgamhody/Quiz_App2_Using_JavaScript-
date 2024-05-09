let numQes = document.querySelector(".count span");
let conBull = document.querySelector(".bulletes .spans");
let question = document.querySelector(".question");
let answers = document.querySelector(".answers");
let btn = document.getElementById("btn_submit");
let bulletes = document.querySelector(".bulletes");
let resVontainer = document.querySelector(".results");
let time = document.querySelector(".container .time");
let current = 0;
let numRightAns = 0;
let counDownEle;
fetch("questions.json")
  .then((e) => e.json())
  .then((data) => {
    numQes.innerHTML = data.length;
    createBullets(data.length);
    addData(data[current], data.length);
    counDown(5, data.length);
    btn.onclick = function () {
      clearInterval(counter);
      counDown(5, data.length);
      let rightAns = data[current]["correct_answer"];
      current++;
      check(rightAns, data.length);
      question.innerHTML = "";
      answers.innerHTML = "";
      addData(data[current], data.length);
      changBulls();
      resFun(data.length);
    };
  });

function createBullets(n) {
  for (let i = 0; i < n; i++) {
    let bullet = document.createElement("span");
    if (i == 0) {
      bullet.className = "active";
    }
    conBull.appendChild(bullet);
  }
}
createBullets();

function addData(data, num) {
  if (current < num) {
    let questionHeader = document.createElement("h2");
    questionHeader.textContent = `${data.question}`;
    question.appendChild(questionHeader);
    for (let i = 1; i <= 4; i++) {
      let answer = document.createElement("div");
      answer.className = "answer";
      let inp = document.createElement("input");
      inp.type = "radio";
      inp.name = "questions";
      inp.id = `answer_${i}`;
      inp.dataset.answer = `${data.answers[i - 1]}`;
      if (i == 1) {
        inp.checked = true;
      }
      let label = document.createElement("label");
      label.htmlFor = `answer_${i}`;
      label.textContent = `${data.answers[i - 1]}`;
      answer.appendChild(inp);
      answer.appendChild(label);
      answers.appendChild(answer);
    }
  }
}

function check(rAnser, num) {
  let allAnswers = document.getElementsByName("questions");
  let chossenAnser;
  for (let i = 0; i < allAnswers.length; i++) {
    if (allAnswers[i].checked) {
      chossenAnser = allAnswers[i].dataset.answer;
    }
  }
  if (rAnser == chossenAnser) {
    numRightAns++;
  }
}
function changBulls() {
  let bullets = Array.from(document.querySelectorAll(".bulletes .spans span"));
  bullets.forEach(function (span, index) {
    if (index == current) {
      span.className = "active";
    }
  });
}
function resFun(num) {
  if (current == num) {
    question.remove();
    answers.remove();
    btn.remove();
    bulletes.remove();
    let res;
    if (numRightAns > num / 2 && num > numRightAns) {
      res = `<span class="good">GOOD</span> ${numRightAns} From ${num}`;
    } else if (num == numRightAns) {
      res = `<span class="perfect">PERFECT</span> ${numRightAns} From ${num}`;
    } else {
      res = `<span class="bad">BAD</span> ${numRightAns} From ${num}`;
    }
    resVontainer.innerHTML = res;
    resVontainer.style.padding = "10px";
    resVontainer.style.backgroundColor = "white";
    resVontainer.style.marginTop = "10px";
    resVontainer.style.textAlign = "center";
  }
}

function counDown(dur, num) {
  if (current < num) {
    counter = setInterval(() => {
      let m = parseInt(dur / 60);
      let s = parseInt(dur % 60);
      m = m < 10 ? `0${m}` : m;
      s = s < 10 ? `0${s}` : s;
      time.innerHTML = `${m}:${s}`;
      if (--dur < 0) {
        clearInterval(counter);
        btn.click();
      }
    }, 1000);
  }
}
