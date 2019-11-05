import { TEST } from './constants';


const defaultState = {
  count: 0
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case TEST:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}


export default reducer;
