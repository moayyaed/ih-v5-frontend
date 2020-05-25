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


export function data(id, prop, data) {
  return {
    type: CONTAINER_SET_DATA,
    id,
    prop,
    data,
  };
}

export function clear() {
  return {
    type: CONTAINER_CLEAR_DATA,
  };
}

export function settings(id, prop, data) {
  return {
    type: CONTAINER_SET_SETTINGS,
    id,
    prop,
    data,
  };
}

export function select(id, prop, elementId) {
  return {
    type: CONTAINER_SET_SELECT,
    id,
    prop,
    elementId,
  };
}

export function selectSome(id, prop, elementId, data) {
  return {
    type: CONTAINER_SET_SELECT_SOME,
    id,
    prop,
    elementId,
    data,
  };
}

export function clearSelects(id, prop) {
  return {
    type: CONTAINER_CLEAR_SELECTS,
    id,
    prop,
  };
}

export function groupElements(id, prop, groupId, groupData) {
  return {
    type: CONTAINER_GROUP_ELEMENTS,
    id,
    prop,
    groupId,
    groupData,
  };
}

export function unGroupElements(id, prop, list, data) {
  return {
    type: CONTAINER_UNGROUP_ELEMENTS,
    id,
    prop,
    list,
    data,
  };
}

export function resizeGroupElement(id, prop, groupId, groupPosition, groupChilds) {
  return {
    type: CONTAINER_RESIZE_GROUP_ELEMENT,
    id,
    prop,
    groupId,
    groupPosition,
    groupChilds,
  };
}

export function moveSelectContainer(id, prop, x, y) {
  return {
    type: CONTAINER_MOVE_SELECT_CONTAINER,
    id,
    prop,
    x,
    y,
  };
}

export function resizeSelectContainer(id, prop, position, childs) {
  return {
    type: CONTAINER_RESIZE_SELECT_CONTAINER,
    id,
    prop,
    position,
    childs,
  };
}

export function addElement(id, prop, elementId, data) {
  return {
    type: CONTAINER_ADD_ELEMENT,
    id,
    prop,
    elementId,
    data,
  };
}

export function editElement(id, prop, elementId, data) {
  return {
    type: CONTAINER_EDIT_ELEMENT,
    id,
    prop,
    elementId,
    data,
  };
}

export function deleteElement(id, prop) {
  return {
    type: CONTAINER_DELETE_ELEMENT,
    id,
    prop,
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
}