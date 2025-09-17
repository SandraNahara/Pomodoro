class PomodoroTimer {
  constructor() {
    this.timeLeft = 25 * 60;
    this.originalTime = 25 * 60;
    this.timerInterval = null;
    this.isRunning = false;

    this.timerElement = document.getElementById("timer");
    this.circleProgress = document.getElementById("circleProgress");

    this.updateDisplay();
  }

  formatTime(s) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  updateDisplay() {
    this.timerElement.textContent = this.formatTime(this.timeLeft);

    const progress = (this.originalTime - this.timeLeft) / this.originalTime;

    this.circleProgress.style.background = `conic-gradient(#e74c3c ${progress}deg, #f8f9fa ${progress}deg)`;
    document.title = `${this.formatTime(this.timeLeft)} - Pomodoro Timer`;
  }
}
