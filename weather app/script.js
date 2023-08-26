let weather = {
  apiKey: "fbca48d08759a398f23cf40fe8c34893",

  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Air quality in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";

    // Fetch AQI data after displaying weather details
    this.fetchAQI(data.coord.lat, data.coord.lon);
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },

  // New function to fetch AQI data
  fetchAQI: function (lat, lon) {
    fetch(
      "https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      this.apiKey
    )
      .then(response => response.json())
      .then(data => this.displayAQI(data));
  },

  displayAQI: function (data) {
    const aqi = data.list[0].main.aqi;
    let aqiDescription = "";

    switch (aqi) {
      case 1:
        aqiDescription = "Good";
        break;
      case 2:
        aqiDescription = "Fair";
        break;
      case 3:
        aqiDescription = "Moderate";
        break;
      case 4:
        aqiDescription = "Poor";
        break;
      case 5:
        aqiDescription = "Very Poor";
        break;
    }

    document.querySelector(".air-quality").innerText = "AQI: " + aqi;
    document.querySelector(".aqi-description").innerText = aqiDescription;

    this.colorAQI(aqi);
  },

  colorAQI: function (aqi) {
    let aqiElement = document.querySelector(".air-quality");

    switch (aqi) {
      case 1:
        aqiElement.style.backgroundColor = "#90f08a";
        break;
      case 2:
        aqiElement.style.backgroundColor = "#e6c833";
        break;
      case 3:
        aqiElement.style.backgroundColor = "#de7a1b";
        break;
      case 4:
        aqiElement.style.backgroundColor = "#9f0e04";
        break;
      case 5:
        aqiElement.style.backgroundColor = "#ef86fd";
        break;
    }
  }
};

// Your event listeners
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Toronto");
