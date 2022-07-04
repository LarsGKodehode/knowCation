const weatherWidget = (options) => {
  
  nodeRaw = `
  <div>


  </div>
  `

  const domNode = new DOMParser().parseFromString(nodeRaw).body.firstChild;

  return {
    domNode,
  };
};

export default weatherWidget;