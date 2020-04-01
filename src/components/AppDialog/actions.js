import { APP_DIALOG_SET_DATA, APP_DIALOG_CLOSE, APP_DIALOG_SET_COMPONENT } from './constants';


export function data(data) {
  return {
    type: APP_DIALOG_SET_DATA,
    data,
  };
}

export function close() {
  return {
    type: APP_DIALOG_CLOSE,
  };
}

export function component(data) {
  return {
    type: APP_DIALOG_SET_COMPONENT,
    data,
  };
}


export default {
  data,
  close,
  component,
}