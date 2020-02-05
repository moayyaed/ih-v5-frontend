import { 
  TEMPLATE_SET_DATA, 
  TEMPLATE_FORCE_DATA, 
  TEMPLATE_SET_POSITION_LAYOUT, 
  TEMPLATE_SET_POSITION_CONTAINER,
  TEMPLATE_SET_POSITION_GROUP_CONTAINER,
  TEMPLATE_SET_PROPERTIES_CONTAINER,
  TEMPLATE_SET_RESIZE_GROUP_CONTAINER,
  TEMPLATE_SET_SETTINGS_CONTAINER,

  TEMPLATE_ADD_CONTAINER,
  TEMPLATE_SELECT_ONE_CONTAINER,
  TEMPLATE_SELECT_MULTI_CONTAINERS,
  TEMPLATE_SELECT_BLOCK,
  TEMPLATE_CLEAR_ALL_SELECTS,

  TEMPLATE_SET_GROUP,
  TEMPLATE_UNSET_GROUP,
} from './constants';


const defaultState = {
 loading: true,
 selects: {
   block: {
     layout: true,
     containers: false,
     shift: false,
     space: false,
   },
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
    case TEMPLATE_SET_DATA:
      return { ...state, ...defaultState, ...action.data };
    case TEMPLATE_FORCE_DATA:
      return { ...state, ...action.data };
    case TEMPLATE_SET_POSITION_LAYOUT:
      return { 
        ...state, 
        settings: {
          ...state.settings,
          x: action.x,
          y: action.y,
          scale: action.scale,
        }
      };
    case TEMPLATE_SET_POSITION_CONTAINER:
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
    case TEMPLATE_SET_PROPERTIES_CONTAINER:
      return { 
        ...state, 
        map: Object.keys(state.map).reduce((p, c) => {
          if (!state.map[c].settings.group && action.items[c]) {
            return { ...p, [c]: {
              ...state.map[c],
              settings: {
                ...state.map[c].settings,
                [action.name]: action.value,
              }
            } }
          }
          return { ...p, [c]: state.map[c] }
        }, {}),
      };
    case TEMPLATE_SET_POSITION_CONTAINER:
      return state;
    case TEMPLATE_SET_SETTINGS_CONTAINER:
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
    case TEMPLATE_ADD_CONTAINER:
      return { 
        ...state, 
        map: {
          ...state.map,
          ...action.data,
        },
        vars: {
          ...state.vars,
          default: {
            ...state.vars.default,
            state: {
              ...state.vars.default.state,
              ...action.data,
            }
          }
        }
      };
    case TEMPLATE_SELECT_ONE_CONTAINER:
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
    case TEMPLATE_SELECT_MULTI_CONTAINERS:
      return { 
        ...state, 
        selects: {
          ...state.selects,
          type: action.selecttype,
          data: {
            ...action.selects,
            [action.itemid]: true,
          },
          group: action.group,
        }
      };
    case TEMPLATE_SET_POSITION_GROUP_CONTAINER:
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
    case TEMPLATE_SET_RESIZE_GROUP_CONTAINER:
      return { 
        ...state, 
        map: action.map,
        selects: {
          ...state.selects,
          group: {
            ...state.selects.group,
            ...action.position,
          },
        }
      };
    case TEMPLATE_SELECT_BLOCK:
      return { 
        ...state, 
        selects: {
          ...state.selects,
          block: {
            ...state.selects.block,
            ...action.value,
          },
        }
      };
    case TEMPLATE_CLEAR_ALL_SELECTS:
      return { 
        ...state, 
        selects: {
          ...state.selects,
          type: null,
          data: {},
          group: defaultState.selects.group,
        },
      };
    case TEMPLATE_SET_GROUP:
      return { 
        ...state, 
        map: action.map,
        selects: {
          ...state.selects,
          data: action.selects,
        },
      };
    case TEMPLATE_UNSET_GROUP:
      return { 
        ...state, 
        map: Object.keys(state.map).reduce((p, c) => {
          if (c === action.groupid) {
            return p
          }
          if (state.map[c].settings.parent === action.groupid) {
            return { ...p, [c]: {
              ...state.map[c],
              settings: {
                ...state.map[c].settings,
                parent: null,
              }
            } }
          }
          return { ...p, [c]: state.map[c] }
        }, {}),
        selects: {
          ...state.selects,
          data: action.selects,
        },
      };
    default:
      return state;
  }
}


export default reducer;
