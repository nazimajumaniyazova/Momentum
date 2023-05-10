import { AdvancedPlayer } from './AdvancedPlayer';
import { Greeting } from './Greeting';
import { Quote } from './Quote';
import { SimplePlayer } from './SimplePlayer';
import { TodoList } from './Todo';
import { defaultUserLang } from './utils';
import { Weather } from './Weather';
export let STATE = {
  lang: defaultUserLang,
  displayTime: true,
  displayWeather: true,
  displayPlayer: 'default',
  displayQuote: true,
  displayDate: true,
  displayGreeting: true,
  timeFormat: 'ru',
  displayTodo: true,
};
export class Settings {
  constructor(
    simplePlayer,
    advacedPlayer,
    weather,
    quote,
    greeting,
    time,
    date,
    todo
  ) {
    this.simplePlayer = simplePlayer;
    this.advacedPlayer = advacedPlayer;
    this.weather = weather;
    this.quote = quote;
    this.greeting = greeting;
    this.time = time;
    this.date = date;
    this.todo = todo;
    this.settingsBtn = document.querySelector('.settings-icon');
    this.settingsBtn.addEventListener('click', () =>
      this.handleSettingBtnClick()
    );
    this.settingsList = document.querySelector('.settings-list');
    this.settingsList.addEventListener('change', () => {
      this.saveSettings();
    });
    this.langList = document.querySelector('.lang-list');
    this.langListInputs = document.querySelectorAll('.lang-list input');
    this.langList.addEventListener('click', (event) =>
      this.handleLangListClick(event)
    );

    this.timeDisplay = document.querySelector('.settings-time input');
    this.timeDisplay.addEventListener('change', () => this.handleTimeDisplay());

    this.weatherDisplay = document.querySelector('.settings-weather input');
    this.weatherDisplay.addEventListener('change', () =>
      this.handleWeatherDisplay()
    );

    this.playerDisplay = document.querySelector(
      '.settings-player .settings-options'
    );
    this.playerDisplayInputs = document.querySelectorAll(
      '.settings-player input'
    );
    this.playerDisplay.addEventListener('change', (event) =>
      this.handlePlayerDisplay(event)
    );

    this.quoteDisplay = document.querySelector('.settings-quote input');

    this.quoteDisplay.addEventListener('change', () =>
      this.handleQuoteDisplay()
    );

    this.dateDisplay = document.querySelector('.settings-date input');
    this.dateDisplay.addEventListener('change', () => this.handleDateDisplay());

    this.greetingDisplay = document.querySelector('.greet');
    this.greetingDisplay.addEventListener('change', () =>
      this.handleGreetingDisplay()
    );

    // this.timeFormat = document.querySelector(
    //   '.settings-time-format .settings-options'
    // );
    // this.timeFormatInputs = document.querySelectorAll(
    //   '.settings-time-format input'
    // );
    // this.timeFormat.addEventListener('change', (event) =>
    //   this.handleTimeFormat(event)
    // );

    this.todoDisplay = document.querySelector('.settings-todo input');
    this.todoDisplay.addEventListener('change', () => this.handleTodoDisplay());
    this.setSavedSettings();
  }
  handleSettingBtnClick() {
    this.settingsList.classList.toggle('active');
  }
  handleLangListClick(event) {
    let eventTarget = event.target.closest('.lang-radio');
    STATE.lang = eventTarget.value;
    changeWeatherLang(STATE.lang);
    changeDateLang(STATE.lang);
    changeGreetingLang(STATE.lang);
    changeQuoteLang(STATE.lang);
  }
  handleTimeDisplay() {
    STATE.displayTime = this.timeDisplay.checked;
    this.time.isDisplayTime(STATE.displayTime);
  }
  handleWeatherDisplay() {
    STATE.displayWeather = this.weatherDisplay.checked;
    this.weather.isDisplayWeather(STATE.displayWeather);
  }
  handlePlayerDisplay(event) {
    let eventTarget = e.target.closest('.radio-player');
    STATE.displayPlayer = eventTarget.value;
    this.displayPlayer(STATE.displayPlayer);
  }
  handleQuoteDisplay() {
    STATE.displayQuote = this.quoteDisplay.checked;
    this.quote.isDisplayQuote(STATE.displayQuote);
  }
  handleDateDisplay() {
    STATE.displayDate = this.dateDisplay.checked;
    this.date.isDisplayDate(STATE.displayDate);
  }
  handleGreetingDisplay() {
    STATE.displayGreeting = this.greetingDisplay.checked;
    this.greeting.isDisplayGreeting(STATE.displayGreeting);
  }
  handleTimeFormat(event) {
    let eventTarget = event.target
      .closest('.checkbox-container')
      .querySelector('.time-format-radio');
    STATE.timeFormat = eventTarget.value;
    this.time.displayTime(STATE.timeFormat);
  }
  handleTodoDisplay() {
    STATE.displayTodo = this.todoDisplay.checked;
    this.todoDisplay.isDisplayTodo(STATE.displayTodo);
  }
  saveSettings() {
    localStorage.setItem('MomentumSettingsState', JSON.stringify(STATE));
  }
  getSavedSettings() {
    STATE = JSON.parse(localStorage.getItem('MomentumSettingsState'));
  }
  setSavedSettings() {
    this.getSavedSettings();
    console.log(this.greetingDisplay);
    this.greetingDisplay.checked = STATE.displayGreeting;
    this.greeting.isDisplayGreeting(STATE.displayGreeting);

    this.weatherDisplay.checked = STATE.displayWeather;
    Weather.isDisplayWeather(STATE.displayWeather);

    this.quoteDisplay.checked = STATE.displayQuote;
    Quote.isDisplayQuote(STATE.displayQuote);

    this.todoDisplay.checked = STATE.displayTodo;
    TodoList.isDisplayTodo(STATE.displayTodo);

    this.playerDisplayInputs.forEach((input) => {
      input.checked = input.value === STATE.displayPlayer;
    });
    this.displayPlayer(STATE.displayPlayer);

    this.langListInputs.forEach((input) => {
      input.checked = input.value === STATE.lang;
    });
    this.changeLang(STATE.lang);
  }
  handleWeatherDisplay() {
    STATE.displayWeather = this.weatherDisplay.checked;
    Weather.isDisplayWeather(STATE.displayWeather);
    this.saveSettings();
  }
  handleGreetingDisplay() {
    STATE.displayGreeting = this.greetingDisplay.checked;
    this.greeting.isDisplayGreeting(STATE.displayGreeting);
    this.saveSettings();
  }
  handleQuoteDisplay() {
    STATE.displayQuote = this.quoteDisplay.checked;
    Quote.isDisplayQuote(STATE.displayQuote);
  }
  handleTodoDisplay() {
    STATE.displayTodo = this.todoDisplay.checked;
    TodoList.isDisplayTodo(STATE.displayTodo);
  }
  handlePlayerDisplay(e) {
    let eventTarget = e.target.closest('.radio-player');
    STATE.displayPlayer = eventTarget.value;
    this.displayPlayer(STATE.displayPlayer);
  }
  displayPlayer(state) {
    if (state === 'default') {
      this.simplePlayer.defaultPlayerContainer.style.visibility = 'visible';
      this.simplePlayer.defaultPlayerContainer.style.display = 'block';
      this.advacedPlayer.playerContainer.style.display = 'none';

      this.advacedPlayer.isPlay = false;
      this.advacedPlayer.activePlayBtn();
    } else if (state === 'off') {
      this.simplePlayer.defaultPlayerContainer.style.visibility = 'hidden';
      this.simplePlayer.defaultPlayerContainer.style.display = 'block';
      this.advacedPlayer.playerContainer.style.display = 'none';

      this.advacedPlayer.isPlay = false;
      this.advacedPlayer.activePlayBtn();

      this.simplePlayer.isPlay = false;
      this.simplePlayer.playerIcon.classList.remove('pause');
      this.simplePlayer.audio.pause();
    } else {
      this.simplePlayer.defaultPlayerContainer.style.display = 'none';
      this.advacedPlayer.playerContainer.style.display = 'flex';

      this.simplePlayer.isPlay = false;
      this.simplePlayer.playerIcon.classList.remove('pause');
      this.simplePlayer.audio.pause();
    }
  }
  handleLangListClick(e) {
    let eventTarget = e.target
      .closest('.checkbox-container')
      .querySelector('.lang-radio');
    if (STATE.lang === eventTarget.value) {
      return;
    }
    STATE.lang = eventTarget.value;
    this.changeLang(STATE.lang);
  }
  changeLang(lang) {
    this.weather.changeWeatherLang(lang);
    this.quote.changeQuoteLang(lang);
    this.greeting.changeGreetingLang(lang);
    this.date.displayDate(lang);
  }
}
