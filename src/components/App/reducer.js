import { APP_SET_DATA } from './constants';


const defaultState = {
  auth: true,
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_SET_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}


export default reducer;
