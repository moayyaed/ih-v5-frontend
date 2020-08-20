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
  const temp = {}
  Object
    .keys(data.layout.elements)
    .forEach(elementId => {
      Object
        .keys(data.layout.elements[elementId])
        .forEach(propId => {
          if (data.layout.elements[elementId][propId].enabled) {
            const values = data.layout.elements[elementId][propId];
            if (values.did === item.did && item.prop === values.prop) {
              if (temp[elementId] === undefined) {
                temp[elementId] = {}
              }
              if (temp[elementId][item.did] === undefined) {
                temp[elementId][item.did] = {}
              }
              temp[elementId][item.did][item.prop] = value
            }
          }
        }); 
    })
  return temp;
}