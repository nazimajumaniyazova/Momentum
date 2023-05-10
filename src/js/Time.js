export class Time {
  constructor() {
    this.time = document.querySelector('.time');
  }
  displayTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString('ru');
    this.time.innerHTML = currentTime;
    setTimeout(() => {
      this.displayTime();
    }, 1000);
  }
  isDisplayTime(displayTime) {
    if (displayTime) {
      this.time.style.display = 'block';
      this.displayTime();
    } else {
      this.time.style.display = 'none';
    }
  }
}
