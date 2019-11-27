import { APP_MENU_SET_DATA, APP_MENU_SET_SELECT } from './constants';


const defaultState = {
  select: null,
  list: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_MENU_SET_DATA:
      return { ...state, ...action.data };
    case APP_MENU_SET_SELECT:
      return { ...state, select: action.selectid };
    case 'TEST':
      return { ...state, i: action.i };
    default:
      return state;
  }
}


export default reducer;
