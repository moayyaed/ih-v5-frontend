import { TEST } from './constants';


const defaultState = 0;


function reducer(state = defaultState, action) {
  switch (action.type) {
    case TEST:
      return state + 1;
    default:
      return state;
  }
}


export default reducer;
