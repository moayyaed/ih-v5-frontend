import { 
  FORM_SET_ERRORS,
  FORM_SET_CACHE,
  FORM_SET_VALUE_BASIC,
  FORM_SET_VALUE_TABLE,
} from './constants';


export function errors(errors) {
  return {
    type: FORM_SET_ERRORS,
    errors,
  };
}

export function cache(id, prop, key, value) {
  return {
    type: FORM_SET_CACHE,
    id,
    prop,
    key,
    value,
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


export default {
  errors,
  cache,
  valueBasic,
  valueTable,
}