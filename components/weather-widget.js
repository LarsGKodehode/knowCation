const weatherWidget = (createInfo) => {
  // ===== Public Methods =====

  /** [{time:, temperature:, cloudCoverage:}]
   * @return {Array} internaly stored weatherforecast for the next 80 hours
   */
  async function getForecast(options = false) {
    if(weatherForecast.length === 0) { // check if we have data
      weatherForecast = await getWeatherForecast();
    };

    // #DEV_LOGGING"
    if(options.DEV_LOG) {console.log(weatherForecast)};

    return weatherForecast;
  };

  // ===== Private Members =====
  // creation info
  const location = createInfo.location;
  const coordinates = createInfo.coordinates;
  requiredFields(); // extracted guard clauses into own function
  // updating fields
  let weatherForecast = []; // location to store gathered weather data


  // ===== Private Methods =====
  // checks if all createInfo required fields are up to scratch
  function requiredFields(createInfo) {
    if(location === undefined) {
      console.warn(`Need a name for location`)
      return false;
    };
    if(coordinates.latitude === undefined || coordinates.longitude === undefined) {
      console.warn(`Can't find weather for unspecified place.`);
      return false;
    };
    if(typeof(coordinates.latitude) !== "number" || typeof(coordinates.longitude) !== "number") {
      console.warn(`Can only find location with latitude(float) and longitude(float).`);
      return false;
    };
    return true;
  };
  
  // gets new weather data
  async function getWeatherForecast() {
    console.warn(`retriving new forecast from "Meteorologisk institutt" servers`);
    // place to store retrived data
    let newForecast = [];

    // API endpoint for Norways "Meteorologisk institutt"
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
    // Header to send with request
    const header = new Headers({
      "User-Agent": navigator.userAgent, 
    });
  
    // fetch and parse
    const dataRaw = await fetch(url, header);
    const dataParsed = await dataRaw.json();
    
    // unpack data
    const weatherSeries = dataParsed.properties.timeseries;
    weatherSeries.forEach((element) => {
      const timeStamp = element.time;
      const temperature = element.data.instant.details.air_temperature
      const cloudCoverage = element.data.instant.details.cloud_area_fraction;

      // store gathered data
      newForecast.push({
        "time": timeStamp,
        "temperature": temperature,
        "cloudCoverage": cloudCoverage,
      });
    });

    return newForecast;
  };
  


  // returned handles
  return {
    getForecast,
  };
};

export default weatherWidget;