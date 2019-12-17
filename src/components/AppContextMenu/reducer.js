import { APP_CONTEXTMENU_SET_DATA, APP_CONTEXTMENU_SET_CLOSE } from './constants';


const defaultState = {
  open: false,
  target: null,
  list: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_CONTEXTMENU_SET_DATA:
      return { ...state, ...action.data };
    case APP_CONTEXTMENU_SET_CLOSE:
      return { ...state, ...defaultState };
    default:
      return state;
  }
}


export default reducer;
