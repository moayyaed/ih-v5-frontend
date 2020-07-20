import { 
  LAYOUT_SET_DATA,
  LAYOUT_CLEAR_DATA,

  LAYOUT_SET_SETTINGS,

  LAYOUT_SET_SELECT,
  LAYOUT_SET_SELECT_SOME,
  LAYOUT_CLEAR_SELECTS,

  LAYOUT_GROUP_ELEMENTS,
  LAYOUT_UNGROUP_ELEMENTS,

  LAYOUT_RESIZE_GROUP_ELEMENT,
  LAYOUT_MOVE_SELECT_CONTAINER,
  LAYOUT_RESIZE_SELECT_CONTAINER,

  LAYOUT_ADD_ELEMENT,
  LAYOUT_ADD_CONTAINER,
  LAYOUT_ADD_TEMPLATE,
  LAYOUT_EDIT_ELEMENT,
  LAYOUT_DELETE_ELEMENT,

  LAYOUT_CHANGE_TEMPLATE_LINK,
} from './constants';


function deleteElements(elements, containers, templates, selects) {
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
        if (e[c].type === 'container') {
          const temp = Object
            .keys(containers[e[c].containerId.id].elements)
            .reduce((p2, c2) => {
              if (containers[e[c].containerId.id].elements[c2].type === 'template') {
                return { ...p2, [containers[e[c].containerId.id].elements[c2].templateId]: true }
              }
              return p2;
            }, {})
          return { ...p, ...temp, [e[c].containerId.id]: true   }
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

      const _c = Object
      .keys(containers)
      .reduce((p, c) => {
        if (check[c]) {
          return { ...p, [c]: containers[c] }
        }
        return p;
      }, {})

      console.log(_c)
 
  return { elements: e, containers: _c, templates: t };
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
    case LAYOUT_SET_DATA:
      return { ...state, ...action.data };
    case LAYOUT_SET_SELECT:
      return { 
        ...state,
        selectType: 'one',
        selectOne: action.elementId,
        selects: {
          [action.elementId]: true,
        },
        propertyType: (state.selectOne === 'content' && typeof state.selects.content === 'string') ? state.selects.content : state.propertyType,
      };
    case LAYOUT_SET_SETTINGS:
      return { 
        ...state,
        settings: {
          ...state.settings,
          ...action.data 
        }
      };
    case LAYOUT_SET_SELECT_SOME:
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
    case LAYOUT_CLEAR_SELECTS:
      return { 
        ...state,
        selectType: 'one',
        selectOne: 'content',
        selects: { content: state.propertyType || true },
        propertyType: 'move',
      };
    case LAYOUT_GROUP_ELEMENTS:
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
          }, { [action.groupId]: action.groupData })
      };
    case LAYOUT_UNGROUP_ELEMENTS:
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
    case LAYOUT_RESIZE_GROUP_ELEMENT:
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
    case LAYOUT_MOVE_SELECT_CONTAINER:
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
    case LAYOUT_RESIZE_SELECT_CONTAINER:
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
    case LAYOUT_ADD_ELEMENT:
      return { 
        ...state,
        list: state.list.concat(action.elementId),
        elements: {
          ...state.elements,
          [action.elementId]: action.data,
        },
      };
    case LAYOUT_ADD_CONTAINER:
      return { 
        ...state,
        list: state.list.concat(action.elementId),
        elements: {
          ...state.elements,
          [action.elementId]: action.elementData,
        },
        containers: {
          ...state.containers,
          [action.containerId]: action.container,
        },
        templates: {
          ...state.templates,
          ...action.templates,
        },
      };
    case LAYOUT_ADD_TEMPLATE:
      return { 
        ...state,
        list: state.list.concat(action.elementId),
        elements: {
          ...state.elements,
          [action.elementId]: action.elementData,
        },
        templates: {
          ...state.templates,
          [action.templateId]: action.templateData,
        },
      };
    case LAYOUT_CHANGE_TEMPLATE_LINK:
      return { 
        ...state,
        elements: {
          ...state.elements,
          [action.elementId]: {
            ...state.elements[action.elementId],
            links: {
              ...state.elements[action.elementId].links,
              ...action.data,
            }
          },
        }
      };
    case LAYOUT_EDIT_ELEMENT:
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
    case LAYOUT_DELETE_ELEMENT:
      return { 
        ...state,
        selectType: null,
        selectOne: null,
        selectContainer: null,
        selects: {},
        list: state.list.filter(i => !state.selects[i]),
        ...deleteElements(state.elements, state.containers, state.templates, state.selects),
      };
    default:
      return state;
  }
}


function reducer(state, action) {
  switch (action.type) {
    case LAYOUT_CLEAR_DATA:
      return { };
    case LAYOUT_SET_DATA:
    case LAYOUT_SET_SETTINGS:
    case LAYOUT_SET_SELECT:
    case LAYOUT_SET_SELECT_SOME:
    case LAYOUT_CLEAR_SELECTS:
    case LAYOUT_GROUP_ELEMENTS:
    case LAYOUT_UNGROUP_ELEMENTS:
    case LAYOUT_RESIZE_GROUP_ELEMENT:
    case LAYOUT_MOVE_SELECT_CONTAINER:
    case LAYOUT_RESIZE_SELECT_CONTAINER:
    case LAYOUT_ADD_ELEMENT:
    case LAYOUT_ADD_CONTAINER:
    case LAYOUT_ADD_TEMPLATE:
    case LAYOUT_CHANGE_TEMPLATE_LINK:
    case LAYOUT_EDIT_ELEMENT:
    case LAYOUT_DELETE_ELEMENT:
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
