import weatherWidget from "./components/weather-widget.js";


async function catchWeather() {
  const url = "https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json";
  
  const newDataRaw = await fetch(url);
  const newDataParsed = await newDataRaw.json()

  console.log(newDataParsed);
};

async function catchImage() {
  const url = "https://api.unsplash.com/";

  const dataRaw = await fetch(url);
  console.log(dataRaw);
  const dataParsed = await dataRaw.json();
  
  console.log(dataParsed);
};


//catchWeather();
// catchImage();