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
  TEMPLATE_MOVE_SELECT_CONTAINER,
  TEMPLATE_RESIZE_SELECT_CONTAINER,

  TEMPLATE_ADD_ELEMENT,
  TEMPLATE_EDIT_ELEMENT,
  TEMPLATE_DELETE_ELEMENT,

  TEMPLATE_CHANGE_STATE,
  TEMPLATE_CHANGE_VALUE_STATE,

  TEMPLATE_EDIT_STATE,
} from './constants';


function getNewDataState(state, action) {
  if (state[action.stateValue] === undefined) {
    return {
      ...state,
      [action.stateValue]: {
        [action.elementId]: action.data
      }
    }
  }
  if (state[action.stateValue][action.elementId] === undefined) {
    return {
      ...state,
      [action.stateValue]: {
        ...state[action.stateValue],
        [action.elementId]: action.data
      }
    }
  }
  return {
    ...state,
    [action.stateValue]: {
      ...state[action.stateValue],
      [action.elementId]: {
        ...state[action.stateValue][action.elementId],
        ...action.data
      }
    }
  }
}

function getStateElements(elements, state, values, slist) {
  const list = ['Master', 'State', 'Error'];
  return Object
    .keys(elements)
    .reduce((p, c) => {
      const temp = list.reduce((p2, c2) => { 
        if (state[c2] && state[c2][values[c2]] && state[c2][values[c2]][c]) {
          return { ...p2, ...state[c2][values[c2]][c] } 
        }
        return { ...p2 };
      }, elements[c]);

      temp.x = elements[c].x;
      temp.y = elements[c].y;
      temp.w = elements[c].w;
      temp.h = elements[c].h;

      return { ...p, [c]: temp }
    }, {});
}

function getOrder(list, stateId) {
 if (stateId === undefined || stateId === 'Master') {
  return list;
 }
 return list
  .filter(i => i !== stateId)
  .concat(stateId);
}

function reducerTemplate(state, action) {
  switch (action.type) {
    case TEMPLATE_SET_DATA:
      return { ...state, ...action.data };
    case TEMPLATE_SET_SELECT:
      return { 
        ...state,
        selectType: 'one',
        selectOne: action.elementId,
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
        selectOne: null,
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
        selectOne: null,
        selectContainer: null,
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
    case TEMPLATE_MOVE_SELECT_CONTAINER:
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
    case TEMPLATE_RESIZE_SELECT_CONTAINER:
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
        },
        state: {
          ...state.state,
          Master: {
            ...state.state.Master,
            [0]: {
              ...state.state.Master[0],
              [action.elementId]: action.data, 
            }
          }
        }
      }
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
    case TEMPLATE_DELETE_ELEMENT:
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
            return { ...p, [c]: state.elements[c] }
          }, {}),
        state: Object
          .keys(state.state)
          .reduce((p, c) => {
            return { 
              ...p, 
              [c]: Object
                .keys(state.state[c])
                .reduce((p2, c2) => {
                  return { 
                    ...p2,
                    [c2]: Object
                      .keys(state.state[c][c2])
                      .reduce((p3, c3) => {
                        if (state.selects[c3] || state.selects[state.elements[c3].groupId]) {
                          return p3;
                        }
                        return { ...p3, [c3]: state.state[c][c2][c3] }
                      }, {}),  
                  }
                }, {}),  
            }
          }, {})
      }
    case TEMPLATE_CHANGE_STATE:
      return {
        ...state,
        selectState: action.stateId,
        /*
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            if (
              state.state[action.stateId] && 
              state.state[action.stateId][state.valueState[action.stateId]] &&
              state.state[action.stateId][state.valueState[action.stateId]][c]
            ) {
              return { 
                ...p, 
                [c]: {
                  ...state.elements[c],
                  // ...state.state['Master'][0][c],
                  ...state.state[action.stateId][state.valueState[action.stateId]][c],
                  x: state.elements[c].x,
                  y: state.elements[c].y,
                  w: state.elements[c].w,
                  h: state.elements[c].h,
                }
              };
            }
            return { 
              ...p, [c]: { 
                ...state.elements[c],
                //...state.state['Master'][0][c],
                x: state.elements[c].x,
                y: state.elements[c].y,
                w: state.elements[c].w,
                h: state.elements[c].h,
              }
            };
          }, {})
          */
      };
    case TEMPLATE_CHANGE_VALUE_STATE:
      return {
        ...state,
        selectState: action.stateId,
        valueState: {
          ...state.valueState,
          [action.stateId]: action.value,
        },
        elements: getStateElements(
          state.elements, 
          state.state, 
          { ...state.valueState, [action.stateId]: action.value }, 
          state.listState
        ),
      }
    case TEMPLATE_EDIT_STATE:
      return { 
        ...state,
        elements: {
          ...state.elements,
          [action.elementId]: {
            ...state.elements[action.elementId],
            ...action.data,
          },
        },
        orderState: getOrder(state.orderState, state.selectState),
        state: {
          ...state.state,
          [action.stateId]: {
            ...state.state[action.stateId],
            ...getNewDataState(state.state[action.stateId], action)
          }
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
    case TEMPLATE_MOVE_SELECT_CONTAINER:
    case TEMPLATE_RESIZE_SELECT_CONTAINER:
    case TEMPLATE_ADD_ELEMENT:
    case TEMPLATE_EDIT_ELEMENT:
    case TEMPLATE_DELETE_ELEMENT:
    case TEMPLATE_CHANGE_STATE:
    case TEMPLATE_CHANGE_VALUE_STATE:
    case TEMPLATE_EDIT_STATE:
      return { 
        ...state, 
        data: {
          ...state.data,
          [action.id]: {
            ...state.data[action.id],
            [action.prop]: reducerTemplate(state.data[action.id][action.prop], action),
          }
        }
      };
    default:
      return state;
  }
}


export default reducer;
