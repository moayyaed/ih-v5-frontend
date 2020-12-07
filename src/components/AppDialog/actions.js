import { 
  APP_DIALOG_SET_DATA, 
  APP_DIALOG_CLOSE, 
  APP_DIALOG_SET_COMPONENT,
  APP_DIALOG_SET_FORM,
  APP_DIALOG_SET_SELECT,
  APP_DIALOG_FORM_SET_ERRORS,

  APP_DIALOG_FORM_SET_VALUE_BASIC,
  APP_DIALOG_FORM_SET_VALUE_TABLE,

  APP_DIALOG_FORM_ADD_ROW_TABLE,
  APP_DIALOG_FORM_REMOVE_ROW_TABLE,
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

export function select(data) {
  return {
    type: APP_DIALOG_SET_SELECT,
    data,
  };
}

export function formErrors(errors) {
  return {
    type: APP_DIALOG_FORM_SET_ERRORS,
    errors,
  };
}

export function formValueBasic(id, prop, value) {
  return {
    type: APP_DIALOG_FORM_SET_VALUE_BASIC,
    id,
    prop,
    value,
  };
}

export function formValueTable(id, prop, rowid, name, value) {
  return {
    type: APP_DIALOG_FORM_SET_VALUE_TABLE,
    id,
    prop,
    rowid,
    name,
    value,
  };
}


export function formAddRowTable(id, prop, row) {
  return {
    type: APP_DIALOG_FORM_ADD_ROW_TABLE,
    id,
    prop,
    row,
  };
}

export function formRemoveRowTable(id, prop, rowid, value) {
  return {
    type: APP_DIALOG_FORM_REMOVE_ROW_TABLE,
    id,
    prop,
    rowid,
    value,
  };
}


export default {
  data,
  close,
  component,
  form,
  select,
  formErrors,
  formValueBasic,
  formValueTable,
  formAddRowTable,
  formRemoveRowTable,
}