export class userLocation {
  async detectLocation() {
    let response = await fetch(
      'https://api.geoapify.com/v1/ipinfo?apiKey=5fa6232427344799b0bb39120fb5772d',
      { method: 'GET' }
    );
    let location = await response.json();
    return location.city.name;
  }
  async getCity() {
    const localCityName = await this.detectLocation();
    const cityName = localStorage.getItem('cityName') || localCityName;
    return cityName;
  }
}
