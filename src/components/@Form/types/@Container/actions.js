import { 
  CONTAINER_SET_DATA,
  CONTAINER_CLEAR_DATA,

  CONTAINER_SET_SELECT,
  CONTAINER_SET_SELECT_SOME,
  CONTAINER_CLEAR_SELECTS,

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

export function select(id, prop, elementId) {
  return {
    type: CONTAINER_SET_SELECT,
    id,
    prop,
    elementId,
  };
}

export function selectSome(id, prop, elementId) {
  return {
    type: CONTAINER_SET_SELECT_SOME,
    id,
    prop,
    elementId,
  };
}

export function clearSelects(id, prop) {
  return {
    type: CONTAINER_CLEAR_SELECTS,
    id,
    prop,
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
  select,
  selectSome,
  clearSelects, 
  settings,
  editElement,
}