import { APP_TABS_SET_DATA, APP_TABS_SET_SELECT, APP_TABS_ADD_ITEM, APP_TABS_REMOVE_ITEM } from './constants';


const defaultState = {
  selectid: null,
  list: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_TABS_SET_DATA:
      return { ...state, ...action.data };
    case APP_TABS_SET_SELECT:
      return { ...state, selectid: action.selectid };
    case APP_TABS_ADD_ITEM:
      return { 
        ...state,
        selectid: action.item.id, 
        list: state.list
          .find(i => i.id === action.item.id) !== undefined ? state.list: state.list.concat(action.item),
      };
    case APP_TABS_REMOVE_ITEM:
      return { 
        ...state,
        selectid : state.selectid === action.item.id ? null : state.selectid, 
        list: state.list.filter(i => i.id !== action.item.id) 
      };
    default:
      return state;
  }
}


export default reducer;
