import { APP_SET_DATA, APP_SET_ROUTE } from './constants';


export function data(data) {
  return {
    type: APP_SET_DATA,
    data,
  };
}

export function route(params) {
  return {
    type: APP_SET_ROUTE,
    params,
  };
}


export default {
  data,
  route,
}