import { APP_BODY_SET_DATA } from './constants';


const defaultState = {
  options: {},
  tabs: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_BODY_SET_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}


export default reducer;
