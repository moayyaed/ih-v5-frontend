import { 
  CONTAINER_SET_DATA,
  CONTAINER_CLEAR_DATA,

  CONTAINER_SET_SETTINGS,
  CONTAINER_EDIT_ELEMENT,
} from './constants';


export function data(id, prop, data) {
  return {
    type: CONTAINER_SET_DATA,
    id,
    prop,
    data,
  };
}

export function clear() {
  return {
    type: CONTAINER_CLEAR_DATA,
  };
}

export function settings(id, prop, data) {
  return {
    type: CONTAINER_SET_SETTINGS,
    id,
    prop,
    data,
  };
}

export function editElement(id, prop, elementId, data) {
  return {
    type: CONTAINER_EDIT_ELEMENT,
    id,
    prop,
    elementId,
    data,
  };
}

export default {
  data,
  clear,
  settings,
  editElement,
}