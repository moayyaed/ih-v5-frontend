import { APP_NAV_SET_DATA  } from './constants';


export function data(data) {
  return {
    type: APP_NAV_SET_DATA,
    data,
  };
}


export default {
  data,
}