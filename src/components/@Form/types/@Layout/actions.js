import { 
  LAYOUT_SET_DATA,
  LAYOUT_CLEAR_DATA,
} from './constants';


export function data(data) {
  return {
    type: LAYOUT_SET_DATA,
    data,
  };
}

export function clear() {
  return {
    type: LAYOUT_CLEAR_DATA,
  };
}


export default {
  data,
  clear,
}