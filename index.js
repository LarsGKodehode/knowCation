import weatherWidget from "./components/weather-widget.js";
import { ExternalGrabber } from "./components/utility.js";

// Debug flags
const DEBUG_FLAGS = {
  "DEBUG_LOG": false,
};

// page targets
const target = {
  mainContainer: document.getElementById("main-container"),
  mainTitle: document.getElementById("main-title"),
  mainDescription: document.getElementById("main-description"),
};

// run site
initializePage(DEBUG_FLAGS);

// NOT IN USE AT THE MOMEMT
const weatherOutput = weatherWidget({
  "location": "Stavanger",
  "coordinates": {"latitude": 58.963333, "longitude": 5.718889},
});



// ===== MAIN =====
async function initializePage(options = false) {
  // Fetch location list
  const locations = await ExternalGrabber.fetchResource("/data/cargoManifest.json");
  if(options.DEBUG_LOG) {
    console.log(`Locations list:`);
    console.dir(locations);
  };

  // Fetch data for all the locations
  let locationData = await Promise.all(locations.map( async (location) => {
    return await ExternalGrabber.fetchResource(location.resources);
  }));
  if(options.DEBUG_LOG) {
    console.log(`Locations data:`);
    console.dir(locationData);
  };

  // TODO: skipping for now
  // append weather data to instances
  // for( const entry of locationData) {
  //   console.log(entry);
  // };
  // if(options.DEBUG_LOG) {
  //   console.log(`Locations data:`);
  //   console.dir(locationData);
  // };

  // render grabbed data
  const cardData = locationData[0].cards[1];

  // insert title
  target.mainTitle.textContent = locationData[0].name;

  // attach image
  /**
   * for some reasons inline styling overwrote background positioning,
   * could be necassary to load a default image to apply styling that stays
   * (browser optimization, discarding unused style attributes?)
   */
  setCSS(target.mainContainer, {
    "background-image": `url(${cardData.image})`,
    "background-position": "bottom",
    "background-size": "cover",
  });

  // attach short descriptive hook
  target.mainDescription.textContent = cardData.description;

};

// ===== HELPERS =====
function setCSS(element, style) {
  for (const property in style)
      element.style[property] = style[property];
};


// ===== DEVELOPMENT STUFF =====
const buttonRefreshWeather = document.getElementById("refresh-weather");
buttonRefreshWeather.addEventListener("click", (e) => {
  console.log(`this button is not working yet`);
});

const buttonDevLog = document.getElementById("dev-log");
buttonDevLog.addEventListener("click", async () => {
  const newCast = await weatherOutput.getForecast();
  console.log(newCast);
});
