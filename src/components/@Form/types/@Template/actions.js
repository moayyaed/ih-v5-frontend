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

  TEMPLATE_CHANGE_STATE,
  TEMPLATE_CHANGE_VALUE_STATE,

  TEMPLATE_EDIT_STATE,
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

export function groupElements(id, prop, groupId, groupData) {
  return {
    type: TEMPLATE_GROUP_ELEMENTS,
    id,
    prop,
    groupId,
    groupData,
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

export function addElement(id, prop, elementId, data) {
  return {
    type: TEMPLATE_ADD_ELEMENT,
    id,
    prop,
    elementId,
    data,
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

  changeState,
  changeValueState,

  editState,
}