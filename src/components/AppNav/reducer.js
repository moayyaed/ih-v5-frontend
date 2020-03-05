import { 
  APP_NAV_SET_DATA, 
  
  APP_NAV_SELECT_NODE,
  APP_NAV_SELECT_NODES,
  APP_NAV_SELECT_NODE_CONTEXT_MENU,
  APP_NAV_CLEAR_SELECTED,

  APP_NAV_ADD_NODE,
  APP_NAV_SET_SCROLL,
  APP_NAV_SET_PANEL_WIDTH 
} from './constants';


const defaultState = {
  width: 250,
  scrollTop: 0,
  options: {},
  list: [],
  selects: {
    lastItem: null,
    contextMenu: null,
    data: {},
  },
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_NAV_SET_DATA:
      return { ...state, ...action.data };
    case APP_NAV_SELECT_NODE:
      return { 
        ...state, 
        selects: { 
          ...state.selects, 
          lastItem: action.item,
          data: {
            ...state.selects.data,
            [action.item.id]: state.selects.data[action.item.id] ? null : action.item 
          }
        } 
      };
    case APP_NAV_SELECT_NODES:
      return { 
        ...state, 
        selects: { 
          ...state.selects, 
          lastItem: action.lastItem,
          data: {
            ...state.selects.data,
            ...action.items,
          }
        } 
      };
    case APP_NAV_SELECT_NODE_CONTEXT_MENU:
      return { 
        ...state, 
        selects: { 
          ...state.selects, 
          contextMenu: action.item,
        } 
      };
    case APP_NAV_CLEAR_SELECTED:
      return { 
        ...state, 
        selects: { 
          lastItem: null,
          contextMenu: null,
          data: {}
        } 
      };
    case APP_NAV_ADD_NODE:
      return { ...state };
    case APP_NAV_SET_SCROLL:
      return { ...state, scrollTop: action.scrollTop };
    case APP_NAV_SET_PANEL_WIDTH:
      return { ...state, width: action.value };
    default:
      return state;
  }
}


export default reducer;
