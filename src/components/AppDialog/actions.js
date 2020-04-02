import { 
  APP_DIALOG_SET_DATA, 
  APP_DIALOG_CLOSE, 
  APP_DIALOG_SET_COMPONENT,
  APP_DIALOG_SET_FORM, 
} from './constants';


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

export function form(data) {
  return {
    type: APP_DIALOG_SET_FORM,
    data,
  };
}


export default {
  data,
  close,
  component,
  form,
}