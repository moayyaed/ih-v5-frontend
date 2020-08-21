import { createValueFunc } from 'components/tools';


export function transform({ flipH, flipV, rotate }) {
  if (!flipH.value && !flipV.value && rotate.value === 0) {
    return 'unset';
  }
  return `scale(${flipH.value ? -1 : 1}, ${flipV.value ? -1 : 1}) rotate(${rotate.value}deg)`;
}

export function getElementsOtherVar(store, item) {
  if (store.states[item.did] && store.states[item.did][item.prop] !== undefined) {
    const checkValue = Number(store.states[item.did][item.prop])
    let value = checkValue !== NaN ? checkValue : store.states[item.prop];
  
    try {
      const func = createValueFunc(item.func).body;
      value = func.call(null, value)
    } catch {
      console.warn('Error: Action function wrong!')
    }
    return value
  }
  return 0;
}

export function getElementsLocalVars(store, item) {
  if (store.states[item.did] && store.states[item.did][item.prop] !== undefined) {
    const checkValue = Number(store.states[item.did][item.prop])
    let value = checkValue !== NaN ? checkValue : store.states[item.prop];
  
    try {
      const func = createValueFunc(item.func).body;
      value = func.call(null, value)
      store.states[item.did][item.prop] = value;
    } catch {
      console.warn('Error: Action function wrong!')
    }
  
   return {
     [item.did]: {
       [item.prop]: value,
     }
   };
  }
  return {}
}