import { 
  TEMPLATE_SET_DATA,
  TEMPLATE_CLEAR_DATA,

  TEMPLATE_SET_SETTINGS,

  TEMPLATE_SET_SELECT,
  TEMPLATE_SET_SELECT_SOME,
  TEMPLATE_CLEAR_SELECTS,

  TEMPLATE_GROUP_ELEMENTS,
  TEMPLATE_UNGROUP_ELEMENTS,

  TEMPLATE_RESIZE_GROUP_ELEMENT,
  TEMPLATE_MOVE_SELECT_TEMPLATE,
  TEMPLATE_RESIZE_SELECT_TEMPLATE,

  TEMPLATE_ADD_ELEMENT,
  TEMPLATE_EDIT_ELEMENT,
} from './constants';


function reducerContainer(state, action) {
  switch (action.type) {
    case TEMPLATE_SET_DATA:
      return { ...state, ...action.data };
    case TEMPLATE_SET_SELECT:
      return { 
        ...state,
        selectType: 'one',
        selects: {
          [action.elementId]: true,
        }
      };
    case TEMPLATE_SET_SETTINGS:
      return { 
        ...state,
        settings: {
          ...state.settings,
          ...action.data 
        }
      };
    case TEMPLATE_SET_SELECT_SOME:
      return { 
        ...state,
        selectType: 'some',
        selectContainer: action.data,
        selects: {
          ...state.selects,
          [action.elementId]: true,
        },
      };
    case TEMPLATE_CLEAR_SELECTS:
      return { 
        ...state,
        selectType: null,
        selects: {}
      };
    case TEMPLATE_GROUP_ELEMENTS:
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
    case TEMPLATE_UNGROUP_ELEMENTS:
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
    case TEMPLATE_RESIZE_GROUP_ELEMENT:
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
    case TEMPLATE_MOVE_SELECT_TEMPLATE:
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
    case TEMPLATE_RESIZE_SELECT_TEMPLATE:
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
    case TEMPLATE_ADD_ELEMENT:
      return { 
        ...state,
        list: state.list.concat(action.elementId),
        elements: {
          ...state.elements,
          [action.elementId]: action.data,
        }
      };
    case TEMPLATE_EDIT_ELEMENT:
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
    case TEMPLATE_CLEAR_DATA:
      return { };
    case TEMPLATE_SET_DATA:
    case TEMPLATE_SET_SETTINGS:
    case TEMPLATE_SET_SELECT:
    case TEMPLATE_SET_SELECT_SOME:
    case TEMPLATE_CLEAR_SELECTS:
    case TEMPLATE_GROUP_ELEMENTS:
    case TEMPLATE_UNGROUP_ELEMENTS:
    case TEMPLATE_RESIZE_GROUP_ELEMENT:
    case TEMPLATE_MOVE_SELECT_TEMPLATE:
    case TEMPLATE_RESIZE_SELECT_TEMPLATE:
    case TEMPLATE_ADD_ELEMENT:
    case TEMPLATE_EDIT_ELEMENT:
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