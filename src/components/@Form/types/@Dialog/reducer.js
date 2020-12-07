import { 
  DIALOG_SET_DATA,
  DIALOG_CLEAR_DATA,

  DIALOG_SET_SETTINGS,

  DIALOG_SET_SELECT,
  DIALOG_SET_SELECT_SOME,
  DIALOG_CLEAR_SELECTS,

  DIALOG_GROUP_ELEMENTS,
  DIALOG_UNGROUP_ELEMENTS,

  DIALOG_RESIZE_GROUP_ELEMENT,
  DIALOG_MOVE_SELECT_CONTAINER,
  DIALOG_RESIZE_SELECT_CONTAINER,

  DIALOG_ADD_ELEMENT,
  DIALOG_ADD_TEMPLATE,
  DIALOG_EDIT_ELEMENT,
  DIALOG_DELETE_ELEMENT,

  DIALOG_CHANGE_TEMPLATE,
} from './constants';


function deleteElements(elements, templates = {}, selects) {
  const e = Object
    .keys(elements)
    .reduce((p, c) => {
      if (selects[c] || selects[elements[c].groupId]) {
        return p;
      }
      if (elements[c].groupId) {
        const parentGroupId = getParentGroupId(c, elements);
        if (selects[parentGroupId]) {
          return p;
        }
      }
      return { ...p, [c]: elements[c] }
    }, {});
  const check = Object
    .keys(e)
    .reduce((p, c) => {
      if (e[c].type === 'template') {
        return { ...p, [e[c].templateId]: true }
      }
      return p;
    }, {})
  const t = Object
    .keys(templates)
    .reduce((p, c) => {
      if (check[c]) {
        return { ...p, [c]: templates[c] }
      }
      return p;
    }, {})
  return { elements: e, templates: t };
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

function reducerContainer(state, action) {
  switch (action.type) {
    case DIALOG_SET_DATA:
      return { ...state, ...action.data };
    case DIALOG_SET_SELECT:
      return { 
        ...state,
        selectType: 'one',
        selectOne: action.elementId,
        selects: {
          [action.elementId]: true,
        },
        propertyType: (state.selectOne === 'content' && typeof state.selects.content === 'string') ? state.selects.content : state.propertyType,
      };
    case DIALOG_SET_SETTINGS:
      return { 
        ...state,
        settings: {
          ...state.settings,
          ...action.data 
        }
      };
    case DIALOG_SET_SELECT_SOME:
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
    case DIALOG_CLEAR_SELECTS:
      return { 
        ...state,
        selectType: 'one',
        selectOne: 'content',
        selects: { content: true },
        // propertyType: 'move',
      };
    case DIALOG_GROUP_ELEMENTS:
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
              const temp = { ...state.elements[c] }
              delete temp['groupId'];
              return { 
                ...p, 
                [c]: {
                  ...temp,
                  x: { ...state.elements[c].x, value: state.elements[state.elements[c].groupId].x.value + state.elements[c].x.value },
                  y: { ...state.elements[c].y, value: state.elements[state.elements[c].groupId].y.value + state.elements[c].y.value },
                } 
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, { [action.groupId]: action.groupData })
      };
    case DIALOG_UNGROUP_ELEMENTS:
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
                  x: { ...state.elements[c].x, value: state.elements[state.elements[c].groupId].x.value + state.elements[c].x.value },
                  y: { ...state.elements[c].y, value: state.elements[state.elements[c].groupId].y.value + state.elements[c].y.value },
                } 
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
      }
    case DIALOG_RESIZE_GROUP_ELEMENT:
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
                 x: { ...state.elements[c].x, value: Math.round((elem.x.value * (nextPos.w.value / oldPos.w.value)) * 1e2 ) / 1e2 },
                 y: { ...state.elements[c].y, value: Math.round((elem.y.value * (nextPos.h.value / oldPos.h.value)) * 1e2 ) / 1e2 },
                 w: { ...state.elements[c].w, value: Math.round((elem.w.value * (nextPos.w.value / oldPos.w.value)) * 1e2 ) / 1e2 },
                 h: { ...state.elements[c].h, value: Math.round((elem.h.value * (nextPos.h.value / oldPos.h.value)) * 1e2 ) / 1e2 },
                } 
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
      };
    case DIALOG_MOVE_SELECT_CONTAINER:
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
              const x = state.elements[c].x.value + (action.x.value - state.selectContainer.x.value);
              const y = state.elements[c].y.value + (action.y.value - state.selectContainer.y.value);
              return { 
                ...p, 
                [c]: { 
                  ...state.elements[c],
                  x: { ...state.elements[c].x, value: x },
                  y: { ...state.elements[c].y, value: y },
                } 
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
      };
    case DIALOG_RESIZE_SELECT_CONTAINER:
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
              const h = nextPos.w.value / oldPos.w.value;
              const v = nextPos.h.value / oldPos.h.value; 

              if (elem.groupId) {
                return { 
                  ...p, 
                  [c]: {
                    ...state.elements[c],
                    x: { ...state.elements[c].x, value: Math.round((elem.x.value * (nextPos.w.value / oldPos.w.value)) * 1e2 ) / 1e2 },
                    y: { ...state.elements[c].y, value: Math.round((elem.y.value * (nextPos.h.value / oldPos.h.value)) * 1e2 ) / 1e2 },
                    w: { ...state.elements[c].w, value: Math.round((elem.w.value * (nextPos.w.value / oldPos.w.value)) * 1e2 ) / 1e2 },
                    h: { ...state.elements[c].h, value: Math.round((elem.h.value * (nextPos.h.value / oldPos.h.value)) * 1e2 ) / 1e2 },
                  } 
                }
              }
              return { 
                ...p, 
                [c]: {
                  ...state.elements[c],
                x: { ...state.elements[c].x, value: nextPos.x.value + ((elem.x.value - oldPos.x.value) * h) },
                y: { ...state.elements[c].y, value: nextPos.y.value + ((elem.y.value - oldPos.y.value) * v) },
                w: { ...state.elements[c].w, value: (elem.x.value + elem.w.value) * h - (elem.x.value * h) },
                h: { ...state.elements[c].h, value: (elem.y.value + elem.h.value) * v - (elem.y.value * v) },
                } 
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
      }
    case DIALOG_ADD_ELEMENT:
      return { 
        ...state,
        list: state.list.concat(action.elementId),
        selectType: action.data.type === 'expander' ? state.selectType : 'one',
        selectOne: action.data.type === 'expander' ? state.selectOne : action.elementId,
        selects: action.data.type === 'expander' ? state.selects : {
          [action.elementId]: true,
        },
        selectContainer: action.data.type === 'expander' ? state.selectContainer : null,
        elements: {
          ...state.elements,
          [action.elementId]: action.data,
        },
      };
    case DIALOG_ADD_TEMPLATE:
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
          [action.elementId]: action.elementData,
        },
        templates: {
          ...state.templates,
          [action.templateId]: action.templateData,
        },
      };
    case DIALOG_CHANGE_TEMPLATE:
      return { 
        ...state,
        elements: {
          ...state.elements,
          [action.elementId]: {
            ...state.elements[action.elementId],
            [action.name]: {
              ...state.elements[action.elementId][action.name],
              ...action.data,
            }
          },
        }
      };
    case DIALOG_EDIT_ELEMENT:
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
    case DIALOG_DELETE_ELEMENT:
      return { 
        ...state,
        selectType: null,
        selectOne: null,
        selectContainer: null,
        selects: {},
        list: state.list.filter(i => !state.selects[i]),
        ...deleteElements(state.elements, state.templates, state.selects),
      };
    default:
      return state;
  }
}


function reducer(state, action) {
  switch (action.type) {
    case DIALOG_CLEAR_DATA:
      return { };
    case DIALOG_SET_DATA:
    case DIALOG_SET_SETTINGS:
    case DIALOG_SET_SELECT:
    case DIALOG_SET_SELECT_SOME:
    case DIALOG_CLEAR_SELECTS:
    case DIALOG_GROUP_ELEMENTS:
    case DIALOG_UNGROUP_ELEMENTS:
    case DIALOG_RESIZE_GROUP_ELEMENT:
    case DIALOG_MOVE_SELECT_CONTAINER:
    case DIALOG_RESIZE_SELECT_CONTAINER:
    case DIALOG_ADD_ELEMENT:
    case DIALOG_ADD_TEMPLATE:
    case DIALOG_CHANGE_TEMPLATE:
    case DIALOG_EDIT_ELEMENT:
    case DIALOG_DELETE_ELEMENT:
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
