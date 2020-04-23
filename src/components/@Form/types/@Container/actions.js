import { 
  CONTAINER_SET_DATA,
  CONTAINER_CLEAR_DATA,

  CONTAINER_SET_SETTINGS,
} from './constants';


export function data(id, prop, data) {
  return {
    type: CONTAINER_SET_DATA,
    id,
    prop,
    data,
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

export function clear() {
  return {
    type: CONTAINER_CLEAR_DATA,
  };
}


export default {
  data,
  clear,
  settings,
}