import { APP_BODY_SET_DATA, APP_BODY_SET_NAV, APP_BODY_SET_PAGE } from './constants';


const defaultState = {
  nav: {
    open: false,
    id: null,
  },
  page: {
    open: false,
    id: null,
    component: null,
  }
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_BODY_SET_DATA:
      return { ...state, ...action.data };
    case APP_BODY_SET_NAV:
      return { ...state, nav: action.data };
    case APP_BODY_SET_PAGE:
      return { ...state, page: action.data };
    default:
      return state;
  }
}


export default reducer;
