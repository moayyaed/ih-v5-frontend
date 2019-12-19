import { 
  GRAPH_SET_DATA, 
  GRAPH_SET_POSITION_LAYOUT, 
  GRAPH_SET_POSITION_CONTAINER,
  GRAPH_SET_SETTINGS_CONTAINER,
  GRAPH_ADD_CONTAINER,
} from './constants';


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
    case GRAPH_SET_POSITION_CONTAINER:
      return { 
        ...state, 
        map: {
          ...state.map,
          [action.itemid]: {
            ...state.map[action.itemid],
            settings: {
              ...state.map[action.itemid].settings,
              x: action.x,
              y: action.y,
            }
          }
        } 
      };
    case GRAPH_SET_SETTINGS_CONTAINER:
      return { 
        ...state, 
        map: {
          ...state.map,
          [action.itemid]: {
            ...state.map[action.itemid],
            settings: {
              ...state.map[action.itemid].settings,
              ...action.settings,
            }
          }
        } 
      };
    case GRAPH_ADD_CONTAINER:
      return { 
        ...state, 
        map: {
          ...state.map,
          [action.data.settings.id]: action.data,
        }
      };
    default:
      return state;
  }
}


export default reducer;
