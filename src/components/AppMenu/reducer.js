import { APP_MENU_SET_DATA } from './constants';


const defaultState = {
  selectid: null,
  list: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_MENU_SET_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}


export default reducer;
