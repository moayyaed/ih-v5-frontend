import { APP_BODY_SET_DATA, APP_BODY_SET_NAV, APP_BODY_SET_PAGE } from './constants';


export function setData(data) {
  return {
    type: APP_BODY_SET_DATA,
    data,
  };
}

export function setNav(data) {
  return {
    type: APP_BODY_SET_NAV,
    data,
  };
}

export function setPage(data) {
  return {
    type: APP_BODY_SET_PAGE,
    data,
  };
}


export default {
  setData,
  setNav,
  setPage,
}
