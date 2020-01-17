import { 
  GRAPH_SET_DATA, 
  GRAPH_FORCE_DATA, 
} from './constants';


const defaultState = {
  list: [
    { id: '1', active: false, focus: false },
    { id: '2', active: false, focus: false },
    { id: '3', active: false, focus: false },
  ]
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
