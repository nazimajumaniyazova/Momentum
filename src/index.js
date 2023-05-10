import { Slider } from './js/Slider';
import { Quote } from './js/Quote';
import { Weather } from './js/Weather';
import { userLocation } from './js/userLocation';
import { TodoList } from './js/Todo';
import './css/style.css';
import './css/owfont-regular.css';
import { Greeting } from './js/Greeting';
import { SimplePlayer } from './js/SimplePlayer';
import { AdvancedPlayer } from './js/AdvancedPlayer';
import { Settings } from './js/Settings';
import { Time } from './js/Time';
import { STATE } from './js/Settings';
import { MDate } from './js/Date';
// Slider
const slider = new Slider();
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', () => {
  slider.getSliderNext();
});
slidePrev.addEventListener('click', () => {
  slider.getSliderPrev();
});
//Quotes
const quote = new Quote();
const changeQuoteButton = document.querySelector('.change-quote');
changeQuoteButton.addEventListener('click', () => quote.getQuote());
//Weather
const inputCity = document.querySelector('.city');
const userLoc = new userLocation();
let userCityName = await userLoc.getCity();
inputCity.value = userCityName;
const weather = new Weather();
weather.getWeather(userCityName);
inputCity.addEventListener('change', (event) => weather.changeWeather(event));
//Todo
const todoL = new TodoList();
const todoListOpen = document.querySelector('.todo-title');
const todoContainer = document.querySelector('.todo-container');

const todoInput = document.querySelector('.todo-input');
const todoAddBtn = document.querySelector('.btn-add-todo');
const todoItemsList = document.querySelector('.todo-items');

todoListOpen.addEventListener('click', () => {
  todoContainer.classList.toggle('todo-container_active');
});

todoAddBtn.addEventListener('click', (event) => todoL.addTodoListItem(event));
todoInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    todoL.addTodoListItem(event);
  }
});
todoItemsList.addEventListener('change', (e) => {
  const eventTarget = e.target.closest('.todo-item');
  if (eventTarget.classList.contains('todo-item-inactive')) {
    eventTarget.classList.remove('todo-item-inactive');
  } else {
    eventTarget.classList.add('todo-item-inactive');
  }
});
todoItemsList.addEventListener('click', (e) => {
  if (e.target.closest('.todo-remove')) {
    e.target.closest('.todo-items__column').remove();
    todoL.saveTodoList();
  }
});
// Greeting
const greeting = new Greeting();
window.addEventListener('beforeunload', () => {
  todoL.saveTodoList();
  greeting.saveUserName();
});

//Audio
//SimplePlayer
const simpleAudio = new SimplePlayer();
const playListContainer = document.querySelector('.play-list');
const playerControls = document.querySelector('.player-controls');
playerControls.addEventListener('click', (event) => {
  let eventTarget = event.target;
  if (eventTarget.classList.contains('play')) {
    eventTarget.classList.toggle('pause');
    simpleAudio.playAudio();
  }
  if (eventTarget.classList.contains('play-prev')) {
    simpleAudio.playPrev();
  }
  if (eventTarget.classList.contains('play-next')) {
    simpleAudio.playNext();
  }
});

//CustomPlayer
const customPlayer = new AdvancedPlayer();

//Time
const time = new Time();
time.displayTime();

//Date
const date = new MDate();
date.displayDate(STATE.lang);
//Settings
const setting = new Settings(
  simpleAudio,
  customPlayer,
  weather,
  quote,
  greeting,
  time,
  date,
  todoL
);
