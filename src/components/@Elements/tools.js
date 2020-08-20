import elements from ".";

export function transform({ flipH, flipV, rotate }) {
  if (!flipH.value && !flipV.value && rotate.value === 0) {
    return 'unset';
  }
  return `scale(${flipH.value ? -1 : 1}, ${flipV.value ? -1 : 1}) rotate(${rotate.value}deg)`;
}


export function getElementsLocalVars(data, item) {
  const checkValue = Number(item.setvalue)
  const value = checkValue !== NaN ? checkValue : item.setvalue;
  const layout = {}
  const containers = {}

  Object
    .keys(data.layout.elements)
    .forEach(elementId => {
      Object
        .keys(data.layout.elements[elementId])
        .forEach(propId => {
          if (data.layout.elements[elementId][propId].enabled) {
            const values = data.layout.elements[elementId][propId];
            if (values.did === item.did && item.prop === values.prop) {
              if (layout[elementId] === undefined) {
                layout[elementId] = {}
              }
              if (layout[elementId][item.did] === undefined) {
                layout[elementId][item.did] = {}
              }
              layout[elementId][item.did][item.prop] = value
            }
          }
        }); 
    })
    Object
    .keys(data.containers)
    .forEach(containerId => {
      containers[containerId] = {}
      Object
        .keys(data.containers[containerId].elements)
        .forEach(elementId => {
          if (data.containers[containerId].elements[elementId].type === 'template') {
            Object
            .keys(data.containers[containerId].elements[elementId].links)
            .forEach(stateId => {
              const link = data.containers[containerId].elements[elementId].links[stateId];

              if (link && link.value && link.value.did === item.did && item.prop === link.value.prop) {
                if (containers[containerId][elementId] === undefined) {
                  containers[containerId][elementId] = {}
                }
                containers[containerId][elementId][stateId] = value
              }
            })
          } else {
            Object
            .keys(data.containers[containerId].elements[elementId])
            .forEach(propId => {
              if (data.containers[containerId].elements[elementId][propId].enabled) {
                const values = data.containers[containerId].elements[elementId][propId]
                if (values.did === item.did && item.prop === values.prop) {
                  if (containers[containerId][elementId] === undefined) {
                    containers[containerId][elementId] = {}
                  }
                  if (containers[containerId][elementId][item.did] === undefined) {
                    containers[containerId][elementId][item.did] = {}
                  }
                  containers[containerId][elementId][item.did][item.prop] = value
                }
              }
            }); 
          }
        }); 
    })
  return { layout, containers };
}