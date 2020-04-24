import { 
  CONTAINER_SET_DATA,
  CONTAINER_CLEAR_DATA,

  CONTAINER_SET_SELECT,
  CONTAINER_CLEAR_SELECTS,

  CONTAINER_SET_SETTINGS,
  CONTAINER_EDIT_ELEMENT,
} from './constants';


function reducerContainer(state, action) {
  switch (action.type) {
    case CONTAINER_SET_DATA:
      return { ...state, ...action.data };
    case CONTAINER_SET_SELECT:
      return { ...state,
        selects: {
          [action.elementId]: true,
        }
      };
    case CONTAINER_CLEAR_SELECTS:
      return { ...state,
        selects: {}
      };
    case CONTAINER_SET_SETTINGS:
      return { 
        ...state,
        settings: {
          ...state.settings,
          ...action.data 
        }
      };
    case CONTAINER_EDIT_ELEMENT:
      return { 
        ...state,
        elements: {
          ...state.elements,
          [action.elementId]: {
            ...state.elements[action.elementId],
            ...action.data,
          },
        }
      };
    default:
      return state;
  }
}


function reducer(state, action) {
  switch (action.type) {
    case CONTAINER_CLEAR_DATA:
      return { };
    case CONTAINER_SET_DATA:
    case CONTAINER_SET_SELECT:
    case CONTAINER_CLEAR_SELECTS:
    case CONTAINER_SET_SETTINGS:
    case CONTAINER_EDIT_ELEMENT:
      return { 
        ...state, 
        data: {
          ...state.data,
          [action.id]: {
            ...state.data[action.id],
            [action.prop]: reducerContainer(state.data[action.id][action.prop], action),
          }
        }
      };
    default:
      return state;
  }
}


export default reducer;
