const weatherWidget = (createInfo) => {
  // ===== Public Members =====
  let weatherForecast = []; // location to store gathered weather data

  
  // ===== Public Methods =====
  /**
   * Updates internal weather forecast
   */
  async function updateForecast() {
    weatherForecast = await getWeatherForecast();
  };

  /**
   * @returns internaly stored weatherforecast
   */
  function getForecast() {
    return weatherForecast;
  };


  // ===== Private Members =====
  const location = createInfo.location;
  const coordinates = createInfo.coordinates;
  requiredFields(); // extracted guard clauses into own function


  // ===== Private Methods =====
  // checks if all createInfo required fields are present
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
    // place to store retrived data
    let newForecast = [];

    // API endpoint
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
    // Header to send with external API request
    const header = new Headers({
      "User-Agent": navigator.userAgent,
      "cache": "force-cache",
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
    updateForecast,
  };
};

export default weatherWidget;