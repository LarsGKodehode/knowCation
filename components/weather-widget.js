const weatherWidget = (options) => {
  /**
   * Header to send with external API request
   */
   const header = new Headers({
    "User-Agent"   : navigator.userAgent
  });

  const nodeRaw = `
  <div>


  </div>
  `;

  const domNode = new DOMParser().parseFromString(nodeRaw, "text/html").body.firstChild;

  /**
   * 
   * @param {*} latitude {float}
   * @param {*} longditude {float}
   * @returns 
   */
  async function getWeather(latitude, longditude) {
    if(latitude === undefined || longditude === undefined) {
      console.warn(`Can't find weather for unspecified place`);
      return;
    }
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longditude}`;
  
    const dataRaw = await fetch(url, header);
    const dataParsed = await dataRaw.json();
    console.log(dataParsed);
  };

  getWeather(options.coordinates.latitude, options.coordinates.longditude);

  // returned handles
  return {
    domNode,
  };
};

export default weatherWidget;