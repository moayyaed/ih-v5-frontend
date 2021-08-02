import core from 'core';
import { createValueFunc } from 'components/tools';


export function transform({ flipH, flipV, rotate }) {
  if (!flipH.value && !flipV.value && rotate.value === 0) {
    return 'unset';
  }
  return `scale(${flipH.value ? -1 : 1}, ${flipV.value ? -1 : 1}) rotate(${rotate.value}deg)`;
}

export function getElementsOtherVar(store, item) {
  if (store.layout.values[item.did] && store.layout.values[item.did][item.prop] !== undefined) {
    const checkValue = Number(store.layout.values[item.did][item.prop])
    let value = checkValue !== NaN ? checkValue : store.layout.values[item.did][item.prop];
    try {
      const func = createValueFunc(item.func).body;
      value = func.call(null, value)
    } catch {
      console.warn('Error: Action function wrong!')
    }
    return value
  } else {
    if (store.layoutDialog.static && store.layoutDialog.static[item.did] && store.layoutDialog.static[item.did][item.prop] !== undefined) {
      const checkValue = Number(store.layoutDialog.static[item.did][item.prop])
      let value = checkValue !== NaN ? checkValue : store.layoutDialog.static[item.did][item.prop];
      try {
        const func = createValueFunc(item.func).body;
        value = func.call(null, value)
      } catch {
        console.warn('Error: Action function wrong!')
      }
      return value
    }
  }
  return 0;
}

export function getElementsLocalVars(store, item) {
  if (store.values[item.did] && store.values[item.did][item.prop] !== undefined) {
    const checkValue = Number(store.values[item.did][item.prop])
    let value = checkValue !== NaN ? checkValue : store.values[item.prop];
  
    try {
      const func = createValueFunc(item.func).body;
      value = func.call(null, value)
      if (core.cache.vars[item.did] === undefined) {
        core.cache.vars[item.did] = {}
      }
      core.cache.vars[item.did][item.prop] = value;
      store.values[item.did][item.prop] = value;
      sessionStorage.setItem('local', JSON.stringify(core.cache.vars));
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

export function getVscriptParams(command, props) {
  const store = core.store.getState();
  
  const context = {
    username: store.app.auth.name,
    start_layoutid: store.app.auth.layout,
    layoutid: store.layout.layoutId,
  };
  const source = { 
    id: props.id,
    type: props.item.type,
    layoutid: props.layoutId || null, 
    containerid: props.containerId || null,
    templateid: props.templateId || null,
    dialogid: props.dialogId || null,
  };
  const elements = {};
  const local = core.cache.vars;
  
  return { id: command.id, context, source, elements, local };
}