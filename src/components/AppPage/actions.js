import { APP_PAGE_SET_DATA  } from './constants';


export function data(data) {
  return {
    type: APP_PAGE_SET_DATA,
    data,
  };
}


export default {
  data,
}