import { GRAPH_SET_DATA } from './constants';


const defaultState = {
  list: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case GRAPH_SET_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}


export default reducer;
