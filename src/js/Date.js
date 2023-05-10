export class MDate {
  constructor() {
    this.dateContainer = document.querySelector('.date');
  }
  displayDate(lang) {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = date.toLocaleDateString(lang, options);
    this.dateContainer.textContent =
      currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
  }
  isDisplayDate(displayDate) {
    if (displayDate) {
      this.dateContainer.style.display = 'block';
    } else {
      this.dateContainer.style.display = 'none';
    }
  }
  ResetDate() {
    let reset = new Date();
    reset.setHours(24, 0, 0, 0);
    let t = reset.getTime() - Date.now();
    setTimeout(function () {
      this.showDate();
      this.ResetDate();
    }, t);
  }
}
