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
  TEMPLATE_DELETE_STATE,

  TEMPLATE_EDIT_ID_STATE,
  TEMPLATE_CHANGE_TITLE_STATE,
  
} from './constants';


export function data(id, prop, data) {
  return {
    type: TEMPLATE_SET_DATA,
    id,
    prop,
    data,
  };
}

export function clear() {
  return {
    type: TEMPLATE_CLEAR_DATA,
  };
}

export function settings(id, prop, data) {
  return {
    type: TEMPLATE_SET_SETTINGS,
    id,
    prop,
    data,
  };
}

export function select(id, prop, elementId) {
  return {
    type: TEMPLATE_SET_SELECT,
    id,
    prop,
    elementId,
  };
}

export function selectSome(id, prop, elementId, data) {
  return {
    type: TEMPLATE_SET_SELECT_SOME,
    id,
    prop,
    elementId,
    data,
  };
}

export function clearSelects(id, prop) {
  return {
    type: TEMPLATE_CLEAR_SELECTS,
    id,
    prop,
  };
}

export function groupElements(id, prop, groupId, groupData, masterData) {
  return {
    type: TEMPLATE_GROUP_ELEMENTS,
    id,
    prop,
    groupId,
    groupData,
    masterData,
  };
}

export function unGroupElements(id, prop, list, data) {
  return {
    type: TEMPLATE_UNGROUP_ELEMENTS,
    id,
    prop,
    list,
    data,
  };
}

export function resizeGroupElement(id, prop, groupId, groupPosition, groupChilds) {
  return {
    type: TEMPLATE_RESIZE_GROUP_ELEMENT,
    id,
    prop,
    groupId,
    groupPosition,
    groupChilds,
  };
}

export function moveSelectContainer(id, prop, x, y) {
  return {
    type: TEMPLATE_MOVE_SELECT_CONTAINER,
    id,
    prop,
    x,
    y,
  };
}

export function resizeSelectContainer(id, prop, position, childs) {
  return {
    type: TEMPLATE_RESIZE_SELECT_CONTAINER,
    id,
    prop,
    position,
    childs,
  };
}

export function addElement(id, prop, elementId, data, masterData) {
  return {
    type: TEMPLATE_ADD_ELEMENT,
    id,
    prop,
    elementId,
    data,
    masterData,
  };
}

export function editElement(id, prop, elementId, data) {
  return {
    type: TEMPLATE_EDIT_ELEMENT,
    id,
    prop,
    elementId,
    data,
  };
}

export function deleteElement(id, prop) {
  return {
    type: TEMPLATE_DELETE_ELEMENT,
    id,
    prop,
  };
}

export function pasteElement(id, prop, list, elements, state, renderData) {
  return {
    type: TEMPLATE_PASTE_ELEMENT,
    id,
    prop,
    list,
    elements,
    state,
    renderData,
  };
}

export function sortListState(id, prop, list) {
  return {
    type: TEMPLATE_SORT_LIST_STATE,
    id,
    prop,
    list,
  };
}

export function changeState(id, prop, stateId) {
  return {
    type: TEMPLATE_CHANGE_STATE,
    id,
    prop,
    stateId,
  };
}

export function changeValueState(id, prop, stateId, value) {
  return {
    type: TEMPLATE_CHANGE_VALUE_STATE,
    id,
    prop,
    stateId,
    value,
  };
}

export function changeVisibilityState(id, prop, stateId, value) {
  return {
    type: TEMPLATE_CHANGE_VISIBILITY_STATE,
    id,
    prop,
    stateId,
    value,
  };
}

export function addState(id, prop, stateId) {
  return {
    type: TEMPLATE_ADD_STATE,
    id,
    prop,
    stateId,
  };
}

export function editState(id, prop, stateId, stateValue, elementId, data) {
  return {
    type: TEMPLATE_EDIT_STATE,
    id,
    prop,
    stateId,
    stateValue,
    elementId,
    data,
  };
}

export function deleteState(id, prop, stateId) {
  return {
    type: TEMPLATE_DELETE_STATE,
    id,
    prop,
    stateId,
  };
}

export function editIdState(id, prop, stateId, value) {
  return {
    type: TEMPLATE_EDIT_ID_STATE,
    id,
    prop,
    stateId,
    value,
  };
}

export function changeTitleState(id, prop, stateId, title) {
  return {
    type: TEMPLATE_CHANGE_TITLE_STATE,
    id,
    prop,
    stateId,
    title,
  };
}


export default {
  data,
  clear,
  settings,
  select,
  selectSome,
  clearSelects, 

  groupElements,
  unGroupElements,
  resizeGroupElement,

  moveSelectContainer,
  resizeSelectContainer,

  addElement,
  editElement,
  deleteElement,
  pasteElement,

  sortListState,
  changeState,
  changeValueState,
  changeVisibilityState,

  addState,
  editState,
  deleteState,

  editIdState,
  changeTitleState,
}