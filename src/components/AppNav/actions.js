import { APP_NAV_SET_DATA, APP_NAV_SET_PANEL_WIDTH  } from './constants';


export function data(data) {
  return {
    type: APP_NAV_SET_DATA,
    data,
  };
}

export function panelWidth(value) {
  return {
    type: APP_NAV_SET_PANEL_WIDTH,
    value,
  };
}



export default {
  data,
  panelWidth,
}