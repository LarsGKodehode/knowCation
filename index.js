import weatherWidget from "./components/weather-widget.js";

// create instance for Stavanger
const weatherOutput = weatherWidget({
  "location": "Stavanger",
  "coordinates": {"latitude": 58.963333, "longitude": 5.718889},
});




// ===== DEVELOPMENT STUFF =====
const buttonRefreshWeather = document.getElementById("refresh-weather");
buttonRefreshWeather.addEventListener("click", (e) => {
  weatherOutput.updateForecast();
});

const buttonDevLog = document.getElementById("dev-log");
buttonDevLog.addEventListener("click", () => {
  console.log(weatherOutput.getForecast());
});
