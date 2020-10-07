import { APP_LAYOUT_DIALOG_SET_DATA, APP_LAYOUT_DIALOG_UPDATE_ELEMENTS } from './constants';


export function data(data) {
  return {
    type: APP_LAYOUT_DIALOG_SET_DATA,
    data,
  };
}

export function updateElements(data) {
  return {
    type: APP_LAYOUT_DIALOG_UPDATE_ELEMENTS,
    data,
  };
}

export default {
  data,
  updateElements,
}