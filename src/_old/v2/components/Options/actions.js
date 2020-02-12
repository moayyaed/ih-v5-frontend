import { OPTIONS_SET_DATA, OPTIONS_SET_SELECT } from './constants';


export function data(data) {
  return {
    type: OPTIONS_SET_DATA,
    data,
  };
}

export function select(selectid) {
  return {
    type: OPTIONS_SET_SELECT,
    selectid,
  };
}


export default {
  data,
  select,
}
