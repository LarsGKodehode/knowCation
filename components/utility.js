const externalGrabber = () => {
  // ===== PUBLIC METHODS =====
  /**
   * Fetches externaly stored data
   */
  async function fetchResource(path) {
    const newDataRaw = await fetch(path);
    const newDataParsed = await newDataRaw.json();
    return newDataParsed;
  };


  
  return {
    fetchResource,
  };
};

export const ExternalGrabber = externalGrabber();