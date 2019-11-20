import { EXAMPLE_CLEAR, EXAMPLE_LOAD, EXAMPLE_DATA } from './constants';


export function clear() {
  return {
    type: EXAMPLE_CLEAR,
  };
}

export function load() {
  return {
    type: EXAMPLE_LOAD,
  };
}

export function data(data) {
  return {
    type: EXAMPLE_DATA,
    data,
  };
}


export default {
  clear,
  load,
  data,
}
