let timerInterval; //intervalo del temporizador
let timeLeft = 25 * 60; // 25 minutos en segundos
let sessionCount = 1;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}
function updateDisplay() {
  document.getElementById("timer").textContent = formatTime(timeLeft);
  document.getElementById("session-count").textContent =
    `Sesión ${sessionCount} de 4`;
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert("¡Tiempo terminado! Pausa y recarga.");
      }
    }, 1000);
  }
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document
  .getElementById("pauseBtn")
  .addEventListener("click", () => clearInterval(timerInterval));
document.getElementById("resetBtn").addEventListener("click", () => {
  timeLeft = 25 * 60;
  sessionCount = 1;
  updateDisplay();
});
