let timeInput = document.getElementById("timeInput");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");
let cancelBtn = document.getElementById("cancelBtn");
let progressBar = document.getElementById("progressBar");
let progressText = document.getElementById("progressText");

let timer;
let totalTime = 0;
let timeLeft = 0;
let isPaused = false;

function parseTime(str) {
  const regex = /^(\d+):([0-5]\d):([0-5]\d)$/;
  const match = str.match(regex);
  if (!match) return NaN;

  let hours = Number(match[1]);
  let mins = Number(match[2]);
  let secs = Number(match[3]);

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

function updateProgress(percent) {
  progressBar.style.width = percent + "%";
  progressText.textContent = Math.floor(percent) + "%";
}

function enableStartState() {
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  cancelBtn.disabled = true;
  pauseBtn.innerText = "Pause";
  progressBar.style.width = "0%";
  progressText.textContent = "0%";
}

startBtn.addEventListener("click", function () {
  totalTime = parseTime(timeInput.value);
  if (isNaN(totalTime) || totalTime <= 0) {
    alert("Please enter time in HH:MM:SS format");
    return;
  }
  timeLeft = totalTime;

  isPaused = false;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  cancelBtn.disabled = false;

  clearInterval(timer);

  timer = setInterval(function () {
    if (!isPaused) {
      if (timeLeft <= 0) {
        clearInterval(timer);
        timeInput.value = "00:00:00";
        updateProgress(100);

        setTimeout(() => {
          alert("Time's up!");
          enableStartState();
        }, 200);

        return;
      }
      timeLeft--;
      timeInput.value = formatTime(timeLeft);

      let percent = ((totalTime - timeLeft) / totalTime) * 100;
      updateProgress(percent);
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
  updateProgress(0);
  enableStartState();
});

cancelBtn.addEventListener("click", function () {
  clearInterval(timer);
  timeLeft = 0;
  totalTime = 0;
  timeInput.value = "";
  updateProgress(0);
  enableStartState();
});
