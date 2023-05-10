import { defaultUserLang, greetingTranslation } from './utils';
export class Greeting {
  constructor() {
    this.defaultUserLang = defaultUserLang;

    this.greetingText = document.querySelector('.greeting-container .greeting');
    this.userName = document.querySelector('.name');
    this.displayTimeOfDay();
    this.displayUserName();
  }
  getTimeOfDay(hours) {
    if (hours >= 0 && hours <= 11.59) {
      return greetingTranslation[this.defaultUserLang].morning;
    } else if (hours >= 12 && hours <= 16.59) {
      return greetingTranslation[this.defaultUserLang].afternoon;
    } else if (hours >= 17 && hours <= 20.59) {
      return greetingTranslation[this.defaultUserLang].evening;
    } else {
      return greetingTranslation[this.defaultUserLang].night;
    }
  }
  displayTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();

    const timeOfDay = this.getTimeOfDay(hours);
    this.greetingText.textContent = timeOfDay + ',';
  }
  saveUserName() {
    localStorage.setItem('name', this.userName.value);
  }
  displayUserName() {
    if (localStorage.getItem('name')) {
      this.userName.value = localStorage.getItem('name');
    }
  }
  isDisplayGreeting(displayGreeting) {
    const greetingContainer = document.querySelector('.greeting-container');
    if (displayGreeting) {
      greetingContainer.style.display = 'flex';
    } else {
      greetingContainer.style.display = 'none';
    }
  }
  changeGreetingLang(lang) {
    this.defaultUserLang = lang;
    this.userName.placeholder =
      greetingTranslation[this.defaultUserLang].inputPlaceholder;
    this.displayTimeOfDay();
  }
}
