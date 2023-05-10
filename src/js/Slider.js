export class Slider {
  constructor() {
    this.slidersNum = 20;
    this.randomNum = null;
    this.body = document.querySelector('body');
    this.setBg();
  }
  getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 0 && hours <= 11.59) {
      return 'morning';
    } else if (hours >= 12 && hours <= 16.59) {
      return 'afternoon';
    } else if (hours >= 17 && hours <= 20.59) {
      return 'evening';
    } else {
      return 'night';
    }
  }
  getRandomNum() {
    return Math.floor(Math.random() * this.slidersNum + 1);
  }
  getSliderNext() {
    if (this.randomNum === this.slidersNum) {
      this.randomNum = 1;
      this.setBg();
    } else {
      this.randomNum++;
      this.setBg();
    }
  }
  getSliderPrev() {
    if (this.randomNum === 1) {
      this.randomNum = this.slidersNum;
      this.setBg();
    } else {
      this.randomNum--;
      this.setBg();
    }
  }
  setBg() {
    this.randomNum = this.getRandomNum();
    this.bgNum = this.randomNum;
    this.bgNum = this.bgNum.toString().padStart(2, '0');
    let timeOfDay = this.getTimeOfDay();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${this.bgNum}.jpg`;
    img.onload = () => {
      this.body.style.backgroundImage = `url("${img.src}")`;
    };
  }
}
