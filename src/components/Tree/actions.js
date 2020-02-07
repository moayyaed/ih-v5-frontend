import { TREE_SET_DATA, TREE_SET_SELECT, TREE_SET_RENAME } from './constants';


export function data(data) {
  return {
    type: TREE_SET_DATA,
    data,
  };
}

export function select(selectid) {
  return {
    type: TREE_SET_SELECT,
    selectid,
  };
}

export function rename(renameid) {
  return {
    type: TREE_SET_RENAME,
    renameid,
  };
}


export default {
  data,
  select,
  rename,
}
