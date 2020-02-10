import { APP_TABS_SET_DATA, APP_TABS_SET_SELECT, APP_TABS_ADD_ITEM, APP_TABS_UPDATE_ITEM, APP_TABS_REMOVE_ITEM } from './constants';


export function setData(data) {
  return {
    type: APP_TABS_SET_DATA,
    data,
  };
}

export function setSelect(selectid) {
  return {
    type: APP_TABS_SET_SELECT,
    selectid,
  };
}

export function addItem(item) {
  return {
    type: APP_TABS_ADD_ITEM,
    item,
  };
} 

export function updateItem(item) {
  return {
    type: APP_TABS_UPDATE_ITEM,
    item,
  };
} 

export function removeItem(item) {
  return {
    type: APP_TABS_REMOVE_ITEM,
    item,
  };
} 


export default {
  setData,
  setSelect,
  addItem,
  removeItem,
}
