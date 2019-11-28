import { EXPLORER_SET_DATA } from './constants';


const defaultState = {
  list: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case EXPLORER_SET_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}


export default reducer;