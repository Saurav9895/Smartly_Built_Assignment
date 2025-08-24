let timeInput = document.getElementById("timeInput");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");
let cancelBtn = document.getElementById("cancelBtn");
let progressBar = document.getElementById("progressBar");

let timer;
let totalTime = 0;
let timeLeft = 0;
let isPaused = false;

function parseTime(str) {
  let split = str.split(":");

  if (split.length !== 3) return NaN;

  let hours = Number(split[0]);
  let mins = Number(split[1]);
  let secs = Number(split[2]);

  if (isNaN(hours) || isNaN(mins) || isNaN(secs)) return NaN;

  return hours * 3600 + mins * 60 + secs;
}

function formatTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  let h = String(hours).padStart(2, "0");
  let m = String(mins).padStart(2, "0");
  let s = String(secs).padStart(2, "0");

  return h + ":" + m + ":" + s;
}

startBtn.addEventListener("click", function () {
  if (!timeLeft || timeInput.value.includes(":")) {
    totalTime = parseTime(timeInput.value);
    if (isNaN(totalTime) || totalTime <= 0) {
      alert("Please enter time in HH:MM:SS format");
      return;
    }
    timeLeft = totalTime;
  }

  isPaused = false;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  cancelBtn.disabled = false;

  clearInterval(timer);

  timer = setInterval(function () {
    if (!isPaused) {
      if (timeLeft <= 0) {
        clearInterval(timer);
        timeInput.value = "00:00:00";
        progressBar.style.width = "100%";
        alert("Time's up!");
        return;
      }
      timeLeft--;
      timeInput.value = formatTime(timeLeft);

      let percent = ((totalTime - timeLeft) / totalTime) * 100;
      progressBar.style.width = percent + "%";
    }
  }, 1000);
});

pauseBtn.addEventListener("click", function () {
  isPaused = !isPaused;
  pauseBtn.innerText = isPaused ? "Resume" : "Pause";
});

resetBtn.addEventListener("click", function () {
  clearInterval(timer);
  timeLeft = totalTime;
  timeInput.value = formatTime(timeLeft);
  progressBar.style.width = "0%";
  pauseBtn.innerText = "Pause";
});

cancelBtn.addEventListener("click", function () {
  clearInterval(timer);
  timeLeft = 0;
  totalTime = 0;
  timeInput.value = "";
  progressBar.style.width = "0%";
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  cancelBtn.disabled = true;
  pauseBtn.innerText = "Pause";
});
