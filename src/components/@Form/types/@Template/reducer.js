import core from 'core';
import { createValueFunc } from 'components/tools';


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
  TEMPLATE_MOVE_ELEMENT_MASTER,
  TEMPLATE_MOVE_ELEMENT_STATE,

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


function checkLinks(data, states, id, v) {
  return Object
    .keys(data)
    .reduce((p, c) => {
      if (data[c]._bind && data[c].enabled) {
        const value = data[c]._bind === id ? v : (states[data[c]._bind] ?  states[data[c]._bind].curent : data[c].value)
          try {
            if (core.cache.functions[data[c].uuid] === undefined) {
              core.cache.functions[data[c].uuid] = createValueFunc(data[c].func).body;
            }
            if (core.cache.functions[data[c].uuid]) {
              const v = core.cache.functions[data[c].uuid].call(null, value);
              return { 
                ...p, 
                [c]: { ...data[c], value: v }
              }
            }
          } catch(e) {
          }
      }
      return { ...p, [c]: data[c] }
    }, {})
}


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

function getStateMoveContainer(selects, elements, selectContainer, action, data) {
  Object
    .keys(selects)
    .forEach(key => {
      if (data[key]) {
        data[key] = {
          ...data[key],
          x: { value: elements[key].x.value + (action.x.value - selectContainer.x.value) },
          y: { value: elements[key].y.value + (action.y.value - selectContainer.y.value) },
        };
      } else {
        data[key] = {
          x: { value: elements[key].x.value + (action.x.value - selectContainer.x.value) },
          y: { value: elements[key].y.value + (action.y.value - selectContainer.y.value) },
        };
      }
    });
  return data;
}

function getPositionSelectContainer(state, elements) {
  if (state.toolbarType === 'events' || state.selectOne === 'content') {
    return null;
  }
  if (state.selectType === 'some') {
    const data = { 
      x: { value: Infinity }, 
      y: { value: Infinity }, 
      w: { value: 0 }, 
      h: { value: 0 }, 
      zIndex: { value: 0 } 
    };
    Object
      .keys(state.selects)
      .forEach(key => {
        const element = elements[key];
        data.x.value = Math.min(data.x.value, element.x.value);
        data.y.value = Math.min(data.y.value, element.y.value); 
        data.w.value = Math.max(data.w.value, element.x.value + element.w); 
        data.h.value = Math.max(data.h.value, element.y.value + element.h.value); 
        data.zIndex.value = Math.max(data.zIndex.value, element.zIndex.value.value); 
      });
    data.w.value = data.w.value - data.x.value;
    data.h.value = data.h.value - data.y.value;

    return data;
  }
  return state.selectContainer;
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

function getElemntsState(state) {
  return Object
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
            return { ...p2, ...checkLinks(state.state[c2].values[v][c], state.state) };
          }
          return checkLinks(p2, state.state)
        }, state.elements[c]),
    }
  }, {});
}

function getElemntsMaster(state) {
  return Object
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
              return { ...p2, ...checkLinks(state.state[c2].values[v][c], state.state) };
            }
            return checkLinks(p2, state.state)
          }, state.elements[c]),
      }
    }, {});
}

function getSelectResizeContainer(action, state) {
  return Object
  .keys(state.elements)
  .reduce((p, c) => {
    if (action.childs[c]) {
      const nextPos = action.position;
      const oldPos = state.selectContainer;
      const elem = state.elements[c];
      const h = nextPos.w.value / oldPos.w.value;
      const v = nextPos.h.value / oldPos.h.value; 

      if (elem.groupId) {
        return { 
          ...p, 
          [c]: {
            ...state.elements[c],
            x: { value: Math.round((elem.x.value * (nextPos.w.value / oldPos.w.value)) * 1e2 ) / 1e2 },
            y: { value: Math.round((elem.y.value * (nextPos.h.value / oldPos.h.value)) * 1e2 ) / 1e2 },
            w: { value: Math.round((elem.w.value * (nextPos.w.value / oldPos.w.value)) * 1e2 ) / 1e2 },
            h: { value: Math.round((elem.h.value * (nextPos.h.value / oldPos.h.value)) * 1e2 ) / 1e2 },
          } 
        }
      }
      return { 
        ...p, 
        [c]: {
          ...state.elements[c],
        x: { value: nextPos.x.value + ((elem.x.value - oldPos.x.value) * h) },
        y: { value: nextPos.y.value + ((elem.y.value - oldPos.y.value) * v) },
        w: { value: (elem.x.value + elem.w.value) * h - (elem.x.value * h) },
        h: { value: (elem.y.value + elem.h.value) * v - (elem.y.value * v) },
        } 
      }
    }
    return { ...p, [c]: state.elements[c] }
  }, {});
}

function getStateResizeContainer(action, elements, data) {
  Object
  .keys(action.childs)
  .forEach(key => {
    if (data[key]) {
      data[key] = {
        ...data[key],
        x: { value: elements[key].x.value },
        y: { value: elements[key].y.value },
        w: { value: elements[key].w.value },
        h: { value: elements[key].h.value },
      };
    } else {
      data[key] = {
        x: { value: elements[key].x.value },
        y: { value: elements[key].y.value },
        w: { value: elements[key].w.value },
        h: { value: elements[key].h.value },
      };
    }
  });
  return data;
}

function mergeData(key, oldData, newData) {
  if (oldData) {
    return { ...oldData[key], ...newData }
  }
  return { ...newData }
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
        },
        propertyType: (state.selectOne === 'content' && typeof state.selects.content === 'string') ? state.selects.content : state.propertyType,
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
        selectType: state.toolbarType  === 'tree' ? 'one' : null,
        selectOne: state.toolbarType  === 'tree' ? 'content': null,
        selectContainer: null,
        selects: state.toolbarType  === 'tree' ? { content: true } : {},
        propertyType: state.toolbarType  === 'tree' ? 'move' : state.propertyType,
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
                 x: { value: Math.round((elem.x.value * (nextPos.w / oldPos.w.value)) * 1e2 ) / 1e2 },
                 y: { value: Math.round((elem.y.value * (nextPos.h / oldPos.h.value)) * 1e2 ) / 1e2 },
                 w: { value: Math.round((elem.w.value * (nextPos.w / oldPos.w.value)) * 1e2 ) / 1e2 },
                 h: { value: Math.round((elem.h.value * (nextPos.h / oldPos.h.value)) * 1e2 ) / 1e2 },
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
                  x: { value: state.elements[c].x.value + (action.x.value - state.selectContainer.x.value) },
                  y: { value: state.elements[c].y.value + (action.y.value - state.selectContainer.y.value) },
                } 
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
        state: {
          ...state.state,
          [state.selectState]: {
            ...state.state[state.selectState],
            values: {
              ...state.state[state.selectState].values,
              [state.state[state.selectState].curent]: getStateMoveContainer(
                state.selects, 
                state.elements,
                state.selectContainer,
                action,
                state.state[state.selectState].values[state.state[state.selectState].curent]
              ),
            }
          }
        }
      };
    case TEMPLATE_RESIZE_SELECT_CONTAINER:
      const resizeElements = getSelectResizeContainer(action, state);
      return {
        ...state,
        selectContainer: {
          ...state.selectContainer,
          ...action.position,
        },
        elements: resizeElements,
        state: {
          ...state.state,
          [state.selectState]: {
            ...state.state[state.selectState],
            values: {
              ...state.state[state.selectState].values,
              [state.state[state.selectState].curent]: getStateResizeContainer(
                action,
                resizeElements,
                state.state[state.selectState].values[state.state[state.selectState].curent]
              ),
            }
          }
        }
      }
    case TEMPLATE_ADD_ELEMENT:
      return { 
        ...state,
        list: state.list.concat(action.elementId),
        selectType: 'one',
        selectOne: action.elementId,
        selects: {
          [action.elementId]: true,
        },
        selectContainer: null,
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
    case TEMPLATE_MOVE_ELEMENT_MASTER:
      return { 
        ...state,
        elements: {
          ...state.elements,
          [action.elementId]: {
            ...state.elements[action.elementId],
            ...action.data,
          },
        },
        state: {
          ...state.state,
          master: {
            ...state.state.master,
            values: {
              ...state.state.master.values,
              [0]: {
                ...state.state.master.values[0],
                [action.elementId]: {
                  ...state.state.master.values[0][action.elementId],
                  ...action.data,
                },
              }
            }
          }
        }
      };
    case TEMPLATE_MOVE_ELEMENT_STATE:
      return { 
        ...state,
        elements: {
          ...state.elements,
          [action.elementId]: {
            ...state.elements[action.elementId],
            ...action.data,
          },
        },
        state: {
          ...state.state,
          [state.selectState]: {
            ...state.state[state.selectState],
            values: {
              ...state.state[state.selectState].values,
              [state.state[state.selectState].curent]: {
                ...state.state[state.selectState].values[state.state[state.selectState].curent],
                [action.elementId]: mergeData(action.elementId, state.state[state.selectState].values[state.state[state.selectState].curent], action.data),
              }
            }
          }
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
                    return { ...p2, ...checkLinks(state.state[c2].values[v][c], state.state, action.stateId, action.value) };
                  }
                  return checkLinks(p2, state.state, action.stateId, action.value)
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
        const elementsMaster = getElemntsMaster(state);
        return {
          ...state,
          toolbarType: 'tree',
          propertyType: state.toolbarType === 'events' ? 'main' : state.propertyType,
          selectState: 'master',
          selectContainer: getPositionSelectContainer(state, elementsMaster),
          elements: elementsMaster,
          selectType: state.toolbarType === 'events' ? null : state.selectType,
          selectOne: state.toolbarType === 'events' ? null : state.selectOne,
          selects: state.toolbarType === 'events' ? {} : state.selects,
        }
      case TEMPLATE_SET_MODE_VARS:
        const elementsState = getElemntsState(state);
        return {
          ...state,
          toolbarType: 'vars',
          propertyType: state.toolbarType === 'events' ? 'main' : state.propertyType,
          selectState: (!state.selectState  || state.selectState === 'master') ? state.listState[0] : state.selectState,
          selectContainer: getPositionSelectContainer(state, elementsState),
          elements: elementsState,
          selectType: (state.toolbarType === 'events' || state.selectOne === 'content') ? null : state.selectType,
          selectOne: (state.toolbarType === 'events' || state.selectOne === 'content') ? null : state.selectOne,
          selects: (state.toolbarType === 'events' || state.selectOne === 'content') ? {} : state.selects,
        }
      case TEMPLATE_SET_MODE_EVENTS:
        return {
          ...state,
          toolbarType: 'events',
          propertyType: 'actions',
          selectState: 'master',
          selectType: null,
          selectContainer: null,
          selectOne: null,
          selects: {},
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
    case TEMPLATE_MOVE_ELEMENT_MASTER:
    case TEMPLATE_MOVE_ELEMENT_STATE:
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
