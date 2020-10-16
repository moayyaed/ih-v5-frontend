import core from 'core';
import { APP_TABS_SET_DATA, APP_TABS_ADD_ITEM, APP_TABS_ADD_ONE, APP_TABS_REMOVE_ITEM } from './constants';


const defaultState = {
  selectid: null,
  list: [],
};

function checkTabs(state, action) {
  const found2 = state.list.find(i => i.id === action.item.id);
  if (found2) {
    return state;
  }
  if (state.list.length > 1) {
    const found = state.list.find(i => i.id === action.select);
    if (found) {
      return { ...state, list: state.list.map(i => {
        if (i.id === action.select) {
          if (core.cache.tab[i.id] !== undefined) {
            delete core.cache.tab[i.id];
          }
          return action.item;
        } else {
          return i;
        }
      }) };
    } else {
      return { ...state, list: state.list.concat(action.item) };
    }
  }
  return { ...state, list: [action.item] };
}

function checkTabs2(state, action) {
  const found2 = state.list.find(i => i.id === action.item.id);
  if (found2) {
    return state;
  }
  return { ...state, list: state.list.concat(action.item) };
}


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_TABS_SET_DATA:
      return { ...state, ...action.data };
    case APP_TABS_ADD_ITEM:
      return checkTabs2(state, action)
    case APP_TABS_ADD_ONE:
      return checkTabs(state, action)
    case APP_TABS_REMOVE_ITEM:
      return { ...state, list: state.list.filter(i => i.id !== action.item.id)  };
    default:
      return state;
  }
}


export default reducer;
