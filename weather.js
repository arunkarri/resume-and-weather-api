let request = new XMLHttpRequest();
let apiKey = "e0e6f6d19e66031c7e355b8784f16dab";

request.open("GET", "http://restcountries.eu/rest/v2/all", true);
request.send();

request.onerror = function (err) {
  console.log(err);
};
request.onload = function () {
  try {
    let countries = JSON.parse(this.response);

    //weather data by latlong
    let lat = countries[104].latlng[0];
    let lon = countries[104].latlng[1];
    loadWeatherDataByLatLong(lat, lon);
    
    //weather data by city name
    let capital = countries[104].capital;
    loadWeatherDataByCityName(capital);

  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
  }
};

//weather data API by latlong
function loadWeatherDataByLatLong(lat, lon) {
  console.log(`lat: ${lat}, lon: ${lon}`);
  let weatherReq = new XMLHttpRequest();
  weatherReq.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    true
  );
  weatherReq.send();

  weatherReq.onerror = function (err) {
    console.log(err);
  };
  weatherReq.onload = function () {
    try {
      let weatherData = JSON.parse(this.response);
      console.log(weatherData);
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
      console.log(error.stack);
    }
  };
}

//weather data API by city name
function loadWeatherDataByCityName(capital) {
    console.log(`capital: ${capital}`);
    let weatherReq = new XMLHttpRequest();
    weatherReq.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/forecast?q=${capital}&appid=${apiKey}`,
      true
    );
    weatherReq.send();
  
    weatherReq.onerror = function (err) {
      console.log(err);
    };
    weatherReq.onload = function () {
      try {
        let weatherData = JSON.parse(this.response);
        console.log(weatherData);
      } catch (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
      }
    };
  }