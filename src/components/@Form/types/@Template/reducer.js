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
  TEMPLATE_PASTE_ELEMENT,

  TEMPLATE_SORT_LIST_STATE,
  TEMPLATE_CHANGE_STATE,
  TEMPLATE_CHANGE_VALUE_STATE,
  TEMPLATE_CHANGE_VISIBILITY_STATE,

  TEMPLATE_ADD_STATE,
  TEMPLATE_EDIT_STATE,
  TEMPLATE_EDIT_STATE_MASTER,
  TEMPLATE_DELETE_STATE,

  TEMPLATE_EDIT_ID_STATE,
  TEMPLATE_CHANGE_TITLE_STATE,

  TEMPLATE_SET_MODE_MASTER,
  TEMPLATE_SET_MODE_VARS,
  TEMPLATE_SET_MODE_EVENTS,
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

function editState(state, action) {

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
  const list = ['master', 'State', 'Error'];
  return Object
    .keys(elements)
    .reduce((p, c) => {
      const temp = list.reduce((p2, c2) => { 
        if (state[c2] && state[c2][values[c2]] && state[c2][values[c2]][c]) {
          return { ...p2, ...state[c2][values[c2]][c] } 
        }
        return p2;
      }, elements[c]);

      temp.x = elements[c].x;
      temp.y = elements[c].y;
      temp.w = elements[c].w;
      temp.h = elements[c].h;

      return { ...p, [c]: temp }
    }, {});
}

function getOrder(list, stateId) {
 if (stateId === undefined || stateId === 'master') {
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
        selectOne: action.groupId,
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
          }, { [action.groupId]: action.groupData }),
          state: {
            ...state.state,
            master: {
              ...state.state.master,
              values: {
                ...state.state.master.values,
                [0]: {
                  ...state.state.master.values[0],
                  [action.groupId]: action.masterData, 
                }
              }
            }
          }
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
        state: Object
          .keys(state.state)
          .reduce((p, c) => {
            return { 
              ...p, 
              [c]: {
                ...state.state[c],
                values: Object
                  .keys(state.state[c].values)
                  .reduce((p2, c2) => {
                    return { 
                      ...p2,
                      [c2]: Object
                        .keys(state.state[c].values[c2])
                        .reduce((p3, c3) => {
                          if (action.list.includes(c3)) {
                            return p3
                          }
                          return { ...p3, [c3]: state.state[c].values[c2][c3] }
                        }, {}),  
                    }
                  }, {}), 
              },
            };
          }, {})
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
          master: {
            ...state.state.master,
            values: {
              ...state.state.master.values,
              [0]: {
                ...state.state.master.values[0],
                [action.elementId]: action.masterData, 
              }
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
            if (state.elements[c].groupId) {
              const parentGroupId = getParentGroupId(c, state.elements);
              if (state.selects[parentGroupId]) {
                return p;
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
        state: Object
          .keys(state.state)
          .reduce((p, c) => {
            return { 
              ...p, 
              [c]: {
                ...state.state[c],
                values: Object
                  .keys(state.state[c].values)
                  .reduce((p2, c2) => {
                    return { 
                      ...p2,
                      [c2]: Object
                        .keys(state.state[c].values[c2])
                        .reduce((p3, c3) => {
                          if (state.selects[c3] || state.selects[state.elements[c3].groupId]) {
                            return p3;
                          }
                          return { ...p3, [c3]: state.state[c].values[c2][c3] }
                        }, {}),  
                    }
                  }, {}), 
              },
            };
          }, {})
      }
    case TEMPLATE_PASTE_ELEMENT:
      return {
        ...state,
        list: state.list.concat(action.list),
        elements: {
          ...state.elements,
          ...action.elements,
        },
        state: {
          ...state.state,
          master: {
            ...state.state.master,
            values: {
              ...state.state.master.values,
              [0]: {
                ...state.state.master.values[0],
                ...action.renderData, 
              }
            }
          }
        }
      }
    case TEMPLATE_SORT_LIST_STATE: 
      return {
        ...state,
        listState: action.list,
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            return {
              ...p,
              [c]: ['master']
                .concat([...action.list].reverse())
                .reduce((p2, c2) => {
                  const v = state.state[c2].curent;
                  if (
                    state.state[c2] &&
                    state.state[c2].hide == false && 
                    state.state[c2].values && 
                    state.state[c2].values[v] &&
                    state.state[c2].values[v][c]
                  ) {
                    return { ...p2, ...state.state[c2].values[v][c] };
                  }
                  return p2
                }, state.elements[c]),
            }
          }, {}),
      }
    case TEMPLATE_CHANGE_STATE:
      return {
        ...state,
        selectState: action.stateId,
        /* elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            return {
              ...p,
              [c]: ['master']
                .concat([...state.listState].reverse())
                .reduce((p2, c2) => {
                  if (action.stateId === 'master') {
                    return { 
                      ...state.elements[c],
                      ...state.state.master.values[0][c],
                    }
                  }
                  const v = state.state[c2].curent;
                  if (
                    state.state[c2] &&
                    state.state[c2].hide == false && 
                    state.state[c2].values && 
                    state.state[c2].values[v] &&
                    state.state[c2].values[v][c]
                  ) {
                    return { ...p2, ...state.state[c2].values[v][c] };
                  }
                  return p2
                }, state.elements[c]),
            }
          }, {}), */
      };
    case TEMPLATE_CHANGE_VALUE_STATE:
      return {
        ...state,
        selectState: action.stateId,
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            return {
              ...p,
              [c]: ['master']
                .concat([...state.listState].reverse())
                .reduce((p2, c2) => {
                  const v = c2 === action.stateId ? action.value : state.state[c2].curent;
                  const h = c2 === 'master' ? false : state.state.master.hide ? true : state.state[c2].hide;
                  if (
                    state.state[c2] &&
                    h == false && 
                    state.state[c2].values && 
                    state.state[c2].values[v] &&
                    state.state[c2].values[v][c]
                  ) {
                    return { ...p2, ...state.state[c2].values[v][c] };
                  }
                  return p2
                }, state.elements[c]),
            }
          }, {}),
        state: {
          ...state.state,
          [action.stateId]: {
            ...state.state[action.stateId],
            curent: action.value,
          }
        }
      }
    case TEMPLATE_CHANGE_VISIBILITY_STATE:
      return {
        ...state,
        state: {
          ...state.state,
          [action.stateId]: {
            ...state.state[action.stateId],
            hide: action.value,
          }
        },
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            return {
              ...p,
              [c]: ['master']
                .concat([...state.listState].reverse())
                .reduce((p2, c2) => {
                  if (action.stateId === 'master' && action.value) {
                    return { ...p2, ...state.state.master.values[0][c] };
                  }
                  const v = state.state[c2].curent;
                  const h = action.stateId === c2 ? action.value : state.state[c2].hide
                  if (
                    state.state[c2] &&
                    h == false && 
                    state.state[c2].values && 
                    state.state[c2].values[v] &&
                    state.state[c2].values[v][c]
                  ) {
                    return { ...p2, ...state.state[c2].values[v][c] };
                  }
                  return p2
                }, state.elements[c]),
            }
          }, {}),
      }
    case TEMPLATE_ADD_STATE: 
      return {
        ...state,
        selectState: action.stateId,
        listState: state.listState.concat(action.stateId),
        state: {
          ...state.state,
          [action.stateId]: { hide: false, curent: 0, values: {}, title: action.stateId, edit: true },
        },
      }
    case TEMPLATE_EDIT_STATE:
      return { 
        ...state,
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            if (c === action.elementId) {
                return { 
                  ...p, 
                  [c]: ['master']
                    .concat([...state.listState].reverse())
                    .reduce((p2, c2) => {
                      const v = action.stateId === c2 ? action.stateValue : state.state[c2].curent;
                      const h = c2 === 'master' ? false : state.state.master.hide ? true : state.state[c2].hide;
                      if (action.stateId === c2) {
                        if (state.state[c2] && h == false) {
                          if (state.state[c2].values && state.state[c2].values[v] && state.state[c2].values[v][c]) {
                            return { ...p2, ...state.state[c2].values[v][c], ...action.data };
                          } else {
                            return { ...p2, ...action.data };
                          }
                        }
                        return p2;
                      } else {
                        if (
                          state.state[c2] &&
                          h == false && 
                          state.state[c2].values && 
                          state.state[c2].values[v] &&
                          state.state[c2].values[v][c]
                        ) {
                          return { ...p2, ...state.state[c2].values[v][c] };
                        }
                      }
                      return p2;
                    }, state.elements[c]),
                }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
        state: {
          ...state.state,
          [action.stateId]: {
            ...state.state[action.stateId],
            values: editState(state.state[action.stateId].values, action)
          }
        },
      };
    case TEMPLATE_EDIT_STATE_MASTER:
      return { 
        ...state,
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            if (c === action.elementId) {
                return { 
                  ...p, 
                  [c]: ['master']
                    .reduce((p2, c2) => {
                      const v = action.stateId === c2 ? action.stateValue : state.state[c2].curent;
                      const h = c2 === 'master' ? false : state.state.master.hide ? true : state.state[c2].hide;
                      if (action.stateId === c2) {
                        if (state.state[c2] && h == false) {
                          if (state.state[c2].values && state.state[c2].values[v] && state.state[c2].values[v][c]) {
                            return { ...p2, ...state.state[c2].values[v][c], ...action.data };
                          } else {
                            return { ...p2, ...action.data };
                          }
                        }
                        return p2;
                      } else {
                        if (
                          state.state[c2] &&
                          h == false && 
                          state.state[c2].values && 
                          state.state[c2].values[v] &&
                          state.state[c2].values[v][c]
                        ) {
                          return { ...p2, ...state.state[c2].values[v][c] };
                        }
                      }
                      return p2;
                    }, state.elements[c]),
                }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
        state: {
          ...state.state,
          [action.stateId]: {
            ...state.state[action.stateId],
            values: editState(state.state[action.stateId].values, action)
          }
        },
      };
    case TEMPLATE_DELETE_STATE:
      const listState = state.listState.filter(i => i !== action.stateId);
      return {
        ...state,
        selectState: listState[listState.length - 1] || 'master',
        listState: listState,
        state: Object
          .keys(state.state)
          .reduce((p, c) => {
            if (c === action.stateId) {
              return p;
            }
            return { ...p, [c]: state.state[c] };
          }, {}),
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            return {
              ...p,
              [c]: ['master']
                .concat([...state.listState.filter(i => i !== action.stateId)].reverse())
                .reduce((p2, c2) => {
                  if (action.stateId === 'master') {
                    return state.state.master.values[0][c]
                  }
                  const v = state.state[c2].curent;
                  const h = state.state[c2].hide
                  if (
                    state.state[c2] &&
                    h == false && 
                    state.state[c2].values && 
                    state.state[c2].values[v] &&
                    state.state[c2].values[v][c]
                  ) {
                    return { ...p2, ...state.state[c2].values[v][c] };
                  }
                  return p2
                }, state.elements[c]),
            }
          }, {}),
      }
      case TEMPLATE_EDIT_ID_STATE:
        return {
          ...state,
          state: Object
          .keys(state.state)
          .reduce((p, c) => {
            if (c === action.stateId) {
              return { ...p, [c]: { ...state.state[c], edit: action.value } };
            }
            return { ...p, [c]: { ...state.state[c], edit: false } };
          }, {}),
        }
      case TEMPLATE_CHANGE_TITLE_STATE:
        return {
          ...state,
          state: {
            ...state.state,
            [action.stateId]: {
              ...state.state[action.stateId],
              title: action.title
            },
          }
        }
      case TEMPLATE_SET_MODE_MASTER:
        return {
          ...state,
          toolbarType: 'tree',
          propertyType: state.toolbarType === 'events' ? 'main' : state.propertyType,
          selectState: 'master',
          elements: Object
            .keys(state.elements)
            .reduce((p, c) => {
              return {
                ...p,
                [c]: ['master']
                  .reduce((p2, c2) => {
                    const v = state.state[c2].curent;
                    const h = false;
                    if (
                      state.state[c2] &&
                      h == false && 
                      state.state[c2].values && 
                      state.state[c2].values[v] &&
                      state.state[c2].values[v][c]
                    ) {
                      return { ...p2, ...state.state[c2].values[v][c] };
                    }
                    return p2
                  }, state.elements[c]),
              }
            }, {}),
        }
      case TEMPLATE_SET_MODE_VARS:
        return {
          ...state,
          toolbarType: 'vars',
          propertyType: state.toolbarType === 'events' ? 'main' : state.propertyType,
          selectState: (!state.selectState  || state.selectState === 'master') ? state.listState[0] : state.selectState,
          elements: Object
            .keys(state.elements)
            .reduce((p, c) => {
              return {
                ...p,
                [c]: ['master']
                  .concat([...state.listState].reverse())
                  .reduce((p2, c2) => {
                    const v = state.state[c2].curent;
                    const h = c2 === 'master' ? false : state.state.master.hide ? true : state.state[c2].hide;
                    if (
                      state.state[c2] &&
                      h == false && 
                      state.state[c2].values && 
                      state.state[c2].values[v] &&
                      state.state[c2].values[v][c]
                    ) {
                      return { ...p2, ...state.state[c2].values[v][c] };
                    }
                    return p2
                  }, state.elements[c]),
              }
            }, {}),
        }
      case TEMPLATE_SET_MODE_EVENTS:
        return {
          ...state,
          toolbarType: 'events',
          propertyType: 'actions',
        }
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
    case TEMPLATE_PASTE_ELEMENT:
    case TEMPLATE_SORT_LIST_STATE:
    case TEMPLATE_CHANGE_STATE:
    case TEMPLATE_CHANGE_VALUE_STATE:
    case TEMPLATE_CHANGE_VISIBILITY_STATE:
    case TEMPLATE_ADD_STATE:
    case TEMPLATE_EDIT_STATE:
    case TEMPLATE_EDIT_STATE_MASTER:
    case TEMPLATE_DELETE_STATE:
    case TEMPLATE_EDIT_ID_STATE:
    case TEMPLATE_CHANGE_TITLE_STATE:
    case TEMPLATE_SET_MODE_MASTER:
    case TEMPLATE_SET_MODE_VARS:
    case TEMPLATE_SET_MODE_EVENTS:
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
