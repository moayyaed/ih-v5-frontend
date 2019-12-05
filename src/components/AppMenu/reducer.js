import { APP_MENU_SET_DATA, APP_MENU_SET_SELECT } from './constants';


const defaultState = {
  selectid: null,
  list: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_MENU_SET_DATA:
      return { ...state, ...action.data };
    case APP_MENU_SET_SELECT:
      return { ...state, selectid: action.selectid };
    default:
      return state;
  }
}


export default reducer;
