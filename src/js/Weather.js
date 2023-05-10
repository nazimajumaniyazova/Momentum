import { defaultUserLang, weatherTranslation } from './utils';
import { userLocation } from './userLocation';
export class Weather {
  constructor() {
    this.defaultUserLang = defaultUserLang;

    this.weatherIcon = document.querySelector('.weather-icon');
    this.weatherTemperature = document.querySelector('.temperature');
    this.weatherDescription = document.querySelector('.weather-description');
    this.weatherFeelsLike = document.querySelector('.feels-like');
    this.weatherWind = document.querySelector('.wind');
    this.weatherHumidity = document.querySelector('.humidity');

    this.weatherError = document.querySelector('.weather-error');

    this.inputCity = document.querySelector('.weather .city');
  }
  async fetchWeather(cityName) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${this.defaultUserLang}&appid=d206e968eb0bd9f3c52c7fb132340ca8&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  async getWeather(cityName) {
    if (!cityName) {
      cityName = this.inputCity.value;
    }
    const response = await this.fetchWeather(cityName);
    if (response.cod === 200) {
      this.displayWeather(response);
    } else {
      this.displayError();
    }
  }
  displayWeather(data) {
    this.weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    this.weatherTemperature.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    this.weatherDescription.textContent = data.weather[0].description;
    this.weatherFeelsLike.innerHTML = `${
      weatherTranslation[this.defaultUserLang].feelsLiks
    }: ${Math.round(data.main.feels_like)}&deg;C`;
    this.weatherWind.textContent = `${
      weatherTranslation[this.defaultUserLang].windSpeed
    }: ${Math.round(data.wind.speed)} m/s`;
    this.weatherHumidity.textContent = `${
      weatherTranslation[this.defaultUserLang].humidity
    }: ${data.main.humidity}%`;
  }
  displayError() {
    this.weatherError.innerHTML = `Error! city not found `;
    return;
  }
  changeWeather(event) {
    const cityName = event.target.value;
    this.resetWeather();
    this.getWeather(cityName);
  }
  resetWeather() {
    this.weatherError.innerHTML = '';
    this.weatherIcon.className = 'weather-icon owf';
    this.weatherTemperature.innerHTML = '';
    this.weatherDescription.textContent = '';
    this.weatherFeelsLike.innerHTML = '';
    this.weatherWind.textContent = '';
    this.weatherHumidity.textContent = '';
  }
  static isDisplayWeather(displayWeather) {
    this.weatherContainer = document.querySelector('.weather');
    if (displayWeather) {
      this.weatherContainer.style.display = 'flex';
    } else {
      this.weatherContainer.style.display = 'none';
    }
  }
  changeWeatherLang(lang) {
    this.defaultUserLang = lang;
    this.getWeather();
  }
}
