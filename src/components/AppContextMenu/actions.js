import { APP_CONTEXTMENU_SET_DATA, APP_CONTEXTMENU_SET_CLOSE } from './constants';


export function setData(data) {
  return {
    type: APP_CONTEXTMENU_SET_DATA,
    data,
  };
}

export function setClose() {
  return {
    type: APP_CONTEXTMENU_SET_CLOSE,
  };
}


export default {
  setData,
  setClose,
}
