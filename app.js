class PomodoroTimer {
  constructor() {
    this.timeLeft = 25 * 60;
    this.originalTime = 25 * 60;
    this.timerInterval = null;
    this.isRunning = false;

    this.timerElement = document.getElementById("timer");
    this.circleProgress = document.getElementById("circleProgress");

    this.startBtn = document.getElementById("startBtn");
    this.pauseBtn = document.getElementById("pauseBtn");
    this.resetBtn = document.getElementById("resetBtn");
    this.sessionCountElement = document.getElementById("sessionCount");
    this.sessionTypeElement = document.getElementById("sessionType");

    this.sessionCount = 1;
    this.isWorking = true;

    this.attachEvents();
    this.updateDisplay();
  }

  attachEvents() {
    this.startBtn.addEventListener("click", () => this.startTimer());
    this.pauseBtn.addEventListener("click", () => this.pauseTimer());
    this.resetBtn.addEventListener("click", () => this.resetTimer());
  }

  formatTime(s) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  updateDisplay() {
    this.timerElement.textContent = this.formatTime(this.timeLeft);
    this.sessionCountElement.textContent = `Sesión ${this.sessionCount} de 4`;
    this.sessionTypeElement.textContent = this.isWorking
      ? "Trabajo"
      : "Descanso";
    this.sessionTypeElement.className = `session-type ${this.isWorking ? "" : "break"}`;

    const progress =
      ((this.originalTime - this.timeLeft) / this.originalTime) * 360;
    const color = this.isWorking ? "#e74c3c" : "#27ae60";
    this.circleProgress.style.background = `conic-gradient(${color} ${progress}deg, #f8f9fa ${progress}deg)`;

    document.title = `${this.formatTime(this.timeLeft)} - Pomodoro ${this.isWorking ? "🍅" : "☕"}`;
  }
  startTimer() {
    if (this.timerInterval) return;
    this.isRunning = true;
    this.startBtn.textContent = "⏸ Pausar";
    this.startBtn.className = "btn-secondary";

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateDisplay();
      if (this.timeLeft <= 0) this.completeSession();
    }, 1000);
  }

  pauseTimer() {
    if (!this.timerInterval) return;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.isRunning = false;
    this.startBtn.textContent = "▶ Continuar";
    this.startBtn.className = "btn-primary";
  }

  resetTimer() {
    this.pauseTimer();
    this.timeLeft = this.originalTime;
    this.updateDisplay();
    this.startBtn.textContent = "▶ Iniciar";
    this.startBtn.className = "btn-primary";
  }

  completeSession() {
    // lo implementamos en el próximo sprint
    this.pauseTimer();
  }
}

new PomodoroTimer();
