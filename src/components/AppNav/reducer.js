import { APP_NAV_SET_DATA, APP_NAV_SET_PANEL_WIDTH } from './constants';


const defaultState = {
  width: 200,
  options: {},
  list: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_NAV_SET_DATA:
      return { ...state, ...action.data };
    case APP_NAV_SET_PANEL_WIDTH:
      return { ...state, width: action.value };
    default:
      return state;
  }
}


export default reducer;
