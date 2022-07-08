import weatherWidget from "./components/weather-widget.js";
import { ExternalGrabber } from "./components/utility.js";

// Debug flags
const DEBUG_FLAGS = {
  "DEBUG_LOG": false,
};

const APP_OPTIONS = {
  ...DEBUG_FLAGS,
  transitionDelay: 10000,
  PATH_MANIFEST: "/data/cargoManifest.json",
}

// page targets
const target = {
  mainContainer: document.getElementById("main-container"),
  mainTitle: document.getElementById("main-title"),
  mainTemperature: document.getElementById("temperature"),
  mainDescription: document.getElementById("main-description"),
};

// run site
initializePage(APP_OPTIONS);


// ===== MAIN =====
async function initializePage(OPTIONS = false) {
  // Fetch location manifest
  const locations = await ExternalGrabber.fetchResource(OPTIONS.PATH_MANIFEST);
  if(OPTIONS.DEBUG_LOG) {console.log(`Locations list:`);console.dir(locations)};


  // Fetch data for all the locations in manifest
  let locationData = await Promise.all(locations.map( async (location) => {
    return await ExternalGrabber.fetchResource(location.resources);
  }));
  if(OPTIONS.DEBUG_LOG) {console.log(`Locations data:`);console.dir(locationData)};


  // append weather data to instances
  locationData.forEach(async (entry) => {
    const locationWeather = weatherWidget({
      location: entry.name,
      coordinates: entry.coordinates,
    })
    const newCast = await locationWeather.getForecast();
    entry.weather = newCast[0];
  });
  if(OPTIONS.DEBUG_LOG) {console.log(`Locations weather appended:`);console.dir(locationData)};


  // render grabbed data
  const cardAlternatives = locationData[0].cards.length;
  let currentCard = 0;

  // draws a new location
  newLocation(locationData[0], 0); // this should be inside a loop
  setInterval(() => {
    newLocation(locationData[0], currentCard);
    if(currentCard < (cardAlternatives - 1)) {
      currentCard++;
    } else {
      currentCard = 0;
    };
  }, OPTIONS.transitionDelay);

  /* TODO: include more than first element in cargoManifest.json
  console.log(`new looping formula`);
  console.dir(locations);
  for(entry in locations) {
    console.log(entry);
    // set location name
    // set location temprature

    for(details of entry) {
      // update rest of info

      // wait for next execution
    };
  };
  */
};




// ===== HELPERS =====
function setCSS(element, style) {
  for (const property in style)
      element.style[property] = style[property];
};

function newLocation(location, cardNumber) {
  // render grabbed data
  const cardData = location.cards[cardNumber];

  // insert title
  target.mainTitle.textContent = location.name;

  // insert current temperature, don't do it before we actually have the data
  if(location.weather !== undefined) {
    target.mainTemperature.textContent = `${location.weather.temperature} ℃`;
  };

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



// ===== DEVELOPMENT STUFF =====


// CALL-TO-ARMS button
const buttonCallToArms = document.getElementById("call-to-arms");
buttonCallToArms.addEventListener("click", (e) => {
  console.log(`this button is not working yet`);
});
