import { 
  APP_PAGE_SET_DATA,
  APP_PAGE_CLEAR_DATA,
} from './constants';


export function data(data) {
  return {
    type: APP_PAGE_SET_DATA,
    data,
  };
}

export function clear() {
  return {
    type: APP_PAGE_CLEAR_DATA,
  };
}


export default {
  data,
  clear,
}