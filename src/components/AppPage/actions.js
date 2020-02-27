import { 
  APP_PAGE_SET_DATA, 
  APP_PAGE_SET_ERRORS_FORM,
  APP_PAGE_SET_VALUE_FORM_BASIC,
  APP_PAGE_SET_VALUE_FORM_TABLE,
} from './constants';


export function data(data) {
  return {
    type: APP_PAGE_SET_DATA,
    data,
  };
}

export function errorsForm(errors) {
  return {
    type: APP_PAGE_SET_ERRORS_FORM,
    errors,
  };
}

export function valueFormBasic(id, prop, value) {
  return {
    type: APP_PAGE_SET_VALUE_FORM_BASIC,
    id,
    prop,
    value,
  };
}

export function valueFormTable(id, prop, rowid, name, value) {
  return {
    type: APP_PAGE_SET_VALUE_FORM_TABLE,
    id,
    prop,
    rowid,
    name,
    value,
  };
}


export default {
  data,
  errorsForm,
  valueFormBasic,
  valueFormTable,
}