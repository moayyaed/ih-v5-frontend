import { 
  CONTAINER_SET_DATA,
  CONTAINER_CLEAR_DATA,

  CONTAINER_SET_SETTINGS,

  CONTAINER_SET_SELECT,
  CONTAINER_SET_SELECT_SOME,
  CONTAINER_CLEAR_SELECTS,

  CONTAINER_GROUP_ELEMENTS,
  CONTAINER_UNGROUP_ELEMENTS,

  CONTAINER_ADD_ELEMENT,
  CONTAINER_EDIT_ELEMENT,
} from './constants';


function reducerContainer(state, action) {
  switch (action.type) {
    case CONTAINER_SET_DATA:
      return { ...state, ...action.data };
    case CONTAINER_SET_SELECT:
      return { 
        ...state,
        selectType: 'one',
        selects: {
          [action.elementId]: true,
        }
      };
    case CONTAINER_SET_SETTINGS:
      return { 
        ...state,
        settings: {
          ...state.settings,
          ...action.data 
        }
      };
    case CONTAINER_SET_SELECT_SOME:
      return { 
        ...state,
        selectType: 'some',
        selects: {
          ...state.selects,
          [action.elementId]: true,
        }
      };
    case CONTAINER_CLEAR_SELECTS:
      return { 
        ...state,
        selectType: null,
        selects: {}
      };
    case CONTAINER_GROUP_ELEMENTS:
      return { 
        ...state,
        selectType: 'one',
        selects: { [action.groupId]: true },
        list: state.list
          .filter(id => !action.groupData.elements.includes(id))
          .concat(action.groupId),
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            if (action.groupData.elements.includes(c)) {
              return { 
                ...p, 
                [c]: {
                  ...state.elements[c],
                  groupId: action.groupId,
                  x: state.elements[c].x - action.groupData.x,
                  y: state.elements[c].y - action.groupData.y,
                } 
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, { [action.groupId]: action.groupData })
      };
    case CONTAINER_UNGROUP_ELEMENTS:
      return {
        ...state,
        selectType: 'some',
        selects: Object.
          keys(state.selects)
          .reduce((p, c) => {
            if (action.list.includes(c)) {
              return {
                 ...p, 
                 ...state.elements[c].elements
                  .reduce((p, c) => {
                    return { ...p, [c]: true };
                  }, {})
                }
            }
            return { ...p, [c]: true }
          }, {}),
        list: state.list
          .filter(id => !action.list.includes(id))
          .concat(...action.list.map(id => state.elements[id].elements)),
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            if (action.list.includes(c)) {
              return p;
            }
            if (action.list.includes(state.elements[c].groupId)) {
              return { 
                ...p, 
                [c]: {
                  ...state.elements[c],
                  groupId: null,
                  x: state.elements[state.elements[c].groupId].x + state.elements[c].x,
                  y: state.elements[state.elements[c].groupId].y + state.elements[c].y,
                } 
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
      }
    case CONTAINER_ADD_ELEMENT:
      return { 
        ...state,
        list: state.list.concat(action.elementId),
        elements: {
          ...state.elements,
          [action.elementId]: action.data,
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
    case CONTAINER_SET_SETTINGS:
    case CONTAINER_SET_SELECT:
    case CONTAINER_SET_SELECT_SOME:
    case CONTAINER_CLEAR_SELECTS:
    case CONTAINER_GROUP_ELEMENTS:
    case CONTAINER_UNGROUP_ELEMENTS:
    case CONTAINER_ADD_ELEMENT:
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
