import { TREE_SET_DATA, TREE_SET_SELECT } from './constants';


export function setData(data) {
  return {
    type: TREE_SET_DATA,
    data,
  };
}

export function setSelect(selectid) {
  return {
    type: TREE_SET_SELECT,
    selectid,
  };
}


export default {
  setData,
  setSelect,
}
