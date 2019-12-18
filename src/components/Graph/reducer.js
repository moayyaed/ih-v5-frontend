import { GRAPH_SET_DATA, GRAPH_SET_POSITION_LAYOUT, GRAPH_SET_POSITION_ITEM } from './constants';


const defaultState = {
  list: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case GRAPH_SET_DATA:
      return { ...state, ...action.data };
    case GRAPH_SET_POSITION_LAYOUT:
      return { 
        ...state, 
        options: {
          ...state.options,
          position: {
            x: action.x,
            y: action.y,
          }
        }
      };
    case GRAPH_SET_POSITION_ITEM:
      return { 
        ...state, 
        map: {
          ...state.map,
          [action.itemid]: {
            ...state.map[action.itemid],
            x: action.x,
            y: action.y,
          }
        } 
      };
    default:
      return state;
  }
}


export default reducer;
