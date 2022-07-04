import weatherWidget from "./components/weather-widget.js";


const weatherOutput = weatherWidget({
  "location": "Stavanger",
  "coordinates": {"latitude": 58.963333, "longitude": 5.718889},
});

console.log(weatherWidget.weatherForecast);

const buttonRefreshWeather = document.getElementById("refresh-weather");
buttonRefreshWeather.addEventListener("click", (e) => {
  weatherOutput.updateForecast();
});

const buttonDevLog = document.getElementById("dev-log");
buttonDevLog.addEventListener("click", () => {
  console.log(weatherOutput.getForecast());
});