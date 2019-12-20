import { 
  GRAPH_SET_DATA, 
  GRAPH_SET_POSITION_LAYOUT, 
  GRAPH_SET_POSITION_CONTAINER,
  GRAPH_SET_POSITION_GROUP_CONTAINER,
  GRAPH_SET_SETTINGS_CONTAINER,

  GRAPH_ADD_CONTAINER,
  GRAPH_SELECT_ONE_CONTAINER,
  GRAPH_SELECT_MULTI_CONTAINERS,
  GRAPH_CLEAR_ALL_SELECTS,
} from './constants';


const defaultState = {
 selects: {
   type: null,
   data: {},
   group: {
     enabled: false,
     x: 0,
     y: 0,
     w: 0,
     h: 0,
   }
 }
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
    case GRAPH_SET_POSITION_CONTAINER:
      return state;
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
    case GRAPH_SELECT_ONE_CONTAINER:
      return { 
        ...state, 
        selects: {
          ...state.selects,
          type: action.selecttype,
          data: {
            [action.itemid]: true,
          },
          group: defaultState.selects.group,
        }
      };
    case GRAPH_SELECT_MULTI_CONTAINERS:
      return { 
        ...state, 
        selects: {
          ...state.selects,
          type: action.selecttype,
          data: {
            ...state.selects.data,
            [action.itemid]: true,
          },
          group: action.group,
        }
      };
    case GRAPH_SET_POSITION_GROUP_CONTAINER:
        return { 
          ...state, 
          map: action.map,
          selects: {
            ...state.selects,
            group: {
              ...state.selects.group,
              x: action.x,
              y: action.y,
            },
          }
        };
    case GRAPH_CLEAR_ALL_SELECTS:
      return { 
        ...state, 
        selects: defaultState.selects,
      };
    default:
      return state;
  }
}


export default reducer;
