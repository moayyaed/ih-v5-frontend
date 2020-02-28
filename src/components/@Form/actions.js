import { 
  FORM_SET_ERRORS,

  FORM_SET_VALUE_BASIC,
  FORM_SET_VALUE_TABLE,

  FORM_REMOVE_ROW_TABLE,
} from './constants';


export function errors(errors) {
  return {
    type: FORM_SET_ERRORS,
    errors,
  };
}

export function valueBasic(id, prop, value) {
  return {
    type: FORM_SET_VALUE_BASIC,
    id,
    prop,
    value,
  };
}

export function valueTable(id, prop, rowid, name, value) {
  return {
    type: FORM_SET_VALUE_TABLE,
    id,
    prop,
    rowid,
    name,
    value,
  };
}

export function removeRowTable(id, prop, rowid, value) {
  return {
    type: FORM_REMOVE_ROW_TABLE,
    id,
    prop,
    rowid,
    value,
  };
}


export default {
  errors,
  valueBasic,
  valueTable,
  removeRowTable,
}