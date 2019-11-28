import { EXPLORER_CLEAR, EXPLORER_LOAD, EXPLORER_DATA } from './constants';

export function clear() {
  return {
    type: EXPLORER_CLEAR,
  };
}

export function load(data) {
  return {
    type: EXPLORER_LOAD,
    data,
  };
}

export function data(id, data) {
  return {
    id,
    type: EXPLORER_DATA,
    data,
  };
}


export default {
  clear,
  load,
  data,
}
