import { APP_PAGE_SET_DATA, APP_PAGE_SET_VALUE_FORM  } from './constants';


export function data(data) {
  return {
    type: APP_PAGE_SET_DATA,
    data,
  };
}

export function valueForm(id, prop, value) {
  return {
    type: APP_PAGE_SET_VALUE_FORM,
    id,
    prop,
    value,
  };
}


export default {
  data,
  valueForm,
}