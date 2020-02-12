import { APP_SET_DATA, APP_SET_ROUTE } from './constants';


const defaultState = {
  route: {},
  auth: true,
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_SET_DATA:
      return { ...state, ...action.data };
    case APP_SET_ROUTE:
      return { ...state, route: action.params };
    default:
      return state;
  }
}


export default reducer;
