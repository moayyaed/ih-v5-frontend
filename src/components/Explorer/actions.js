import { EXPLORER_SET_DATA, EXPLORER_SET_SELECT } from './constants';


export function setData(data) {
  return {
    type: EXPLORER_SET_DATA,
    data,
  };
}

export function setSelect(selectid) {
  return {
    type: EXPLORER_SET_SELECT,
    selectid,
  };
}


export default {
  setData,
  setSelect,
}
