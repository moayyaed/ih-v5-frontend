import { 
  GRAPH_SET_DATA, 
  GRAPH_FORCE_DATA, 
} from './constants';


const defaultState = {

};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case GRAPH_SET_DATA:
      return { ...state, ...defaultState, ...action.data };
    case GRAPH_FORCE_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}


export default reducer;
