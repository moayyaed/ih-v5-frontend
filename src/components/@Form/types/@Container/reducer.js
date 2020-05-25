import { 
  CONTAINER_SET_DATA,
  CONTAINER_CLEAR_DATA,

  CONTAINER_SET_SETTINGS,

  CONTAINER_SET_SELECT,
  CONTAINER_SET_SELECT_SOME,
  CONTAINER_CLEAR_SELECTS,

  CONTAINER_GROUP_ELEMENTS,
  CONTAINER_UNGROUP_ELEMENTS,

  CONTAINER_RESIZE_GROUP_ELEMENT,
  CONTAINER_MOVE_SELECT_CONTAINER,
  CONTAINER_RESIZE_SELECT_CONTAINER,

  CONTAINER_ADD_ELEMENT,
  CONTAINER_EDIT_ELEMENT,
  CONTAINER_DELETE_ELEMENT,
} from './constants';

function getParentGroupId(id, elements) {
  if (elements[id] && elements[id].groupId) {
    if (elements[elements[id].groupId]) {
      if (elements[elements[id].groupId].groupId) {
        return getParentGroupId(elements[elements[id].groupId].groupId, elements)
      } else {
        return elements[id].groupId;
      }
    } 
  }
  return id;
}

function reducerContainer(state, action) {
  switch (action.type) {
    case CONTAINER_SET_DATA:
      return { ...state, ...action.data };
    case CONTAINER_SET_SELECT:
      return { 
        ...state,
        selectType: 'one',
        selectOne: action.elementId,
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
        selectOne: null,
        selectContainer: action.data,
        selects: {
          ...state.selects,
          [action.elementId]: true,
        },
      };
    case CONTAINER_CLEAR_SELECTS:
      return { 
        ...state,
        selectType: null,
        selectOne: null,
        selects: {}
      };
    case CONTAINER_GROUP_ELEMENTS:
      return { 
        ...state,
        selectType: 'one',
        selectOne: action.elementId,
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
        selectContainer: action.data,
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
    case CONTAINER_RESIZE_GROUP_ELEMENT:
      return { 
        ...state,
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            if (c === action.groupId) {
              return { 
                ...p, 
                [c]: { 
                  ...state.elements[c],
                  ...action.groupPosition,  
                } 
              }
            }
            if (action.groupChilds[c]) {
              const nextPos = action.groupPosition;
              const oldPos = state.elements[action.groupId];
              const elem = state.elements[c];
              return { 
                ...p, 
                [c]: {
                  ...state.elements[c],
                 x: Math.round((elem.x * (nextPos.w / oldPos.w)) * 1e2 ) / 1e2,
                 y: Math.round((elem.y * (nextPos.h / oldPos.h)) * 1e2 ) / 1e2,
                 w: Math.round((elem.w * (nextPos.w / oldPos.w)) * 1e2 ) / 1e2,
                 h: Math.round((elem.h * (nextPos.h / oldPos.h)) * 1e2 ) / 1e2,
                } 
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
      };
    case CONTAINER_MOVE_SELECT_CONTAINER:
      return { 
        ...state,
        selectContainer: {
          ...state.selectContainer,
          x: action.x,
          y: action.y,
        },
        elements: Object.
          keys(state.elements)
          .reduce((p, c) => {
            if (state.selects[c]) {
              return { 
                ...p, 
                [c]: { 
                  ...state.elements[c],
                  x: state.elements[c].x + (action.x - state.selectContainer.x),
                  y: state.elements[c].y + (action.y - state.selectContainer.y),
                } 
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
      };
    case CONTAINER_RESIZE_SELECT_CONTAINER:
      return {
        ...state,
        selectContainer: {
          ...state.selectContainer,
          ...action.position,
        },
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            if (action.childs[c]) {
              const nextPos = action.position;
              const oldPos = state.selectContainer;
              const elem = state.elements[c];
              const h = nextPos.w / oldPos.w;
              const v = nextPos.h / oldPos.h; 

              if (elem.groupId) {
                return { 
                  ...p, 
                  [c]: {
                    ...state.elements[c],
                    x: Math.round((elem.x * (nextPos.w / oldPos.w)) * 1e2 ) / 1e2,
                    y: Math.round((elem.y * (nextPos.h / oldPos.h)) * 1e2 ) / 1e2,
                    w: Math.round((elem.w * (nextPos.w / oldPos.w)) * 1e2 ) / 1e2,
                    h: Math.round((elem.h * (nextPos.h / oldPos.h)) * 1e2 ) / 1e2,
                  } 
                }
              }
              return { 
                ...p, 
                [c]: {
                  ...state.elements[c],
                x: nextPos.x + ((elem.x - oldPos.x) * h),
                y: nextPos.y + ((elem.y - oldPos.y) * v),
                w: (elem.x + elem.w) * h - (elem.x * h),
                h: (elem.y + elem.h) * v - (elem.y * v),
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
    case CONTAINER_DELETE_ELEMENT:
      return { 
        ...state,
        selectType: null,
        selectOne: null,
        selectContainer: null,
        selects: {},
        list: state.list.filter(i => !state.selects[i]),
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            if (state.selects[c] || state.selects[state.elements[c].groupId]) {
              return p;
            }
            if (state.elements[c].groupId) {
              const parentGroupId = getParentGroupId(c, state.elements);
              if (state.selects[parentGroupId]) {
                return p;
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
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
    case CONTAINER_RESIZE_GROUP_ELEMENT:
    case CONTAINER_MOVE_SELECT_CONTAINER:
    case CONTAINER_RESIZE_SELECT_CONTAINER:
    case CONTAINER_ADD_ELEMENT:
    case CONTAINER_EDIT_ELEMENT:
    case CONTAINER_DELETE_ELEMENT:
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
