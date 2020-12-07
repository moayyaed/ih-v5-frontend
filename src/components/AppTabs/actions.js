import { APP_TABS_SET_DATA, APP_TABS_ADD_ITEM, APP_TABS_ADD_ONE, APP_TABS_REMOVE_ITEM } from './constants';


export function data(data) {
  return {
    type: APP_TABS_SET_DATA,
    data,
  };
}

export function add(item) {
  return {
    type: APP_TABS_ADD_ITEM,
    item,
  };
}

export function oneTab(select, item) {
  return {
    type: APP_TABS_ADD_ONE,
    select,
    item,
  };
}

export function remove(item) {
  return {
    type: APP_TABS_REMOVE_ITEM,
    item,
  };
}


export default {
  data,
  add,
  remove,
  oneTab,
}