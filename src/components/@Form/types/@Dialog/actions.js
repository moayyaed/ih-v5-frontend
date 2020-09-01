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


export function data(id, prop, data) {
  return {
    type: DIALOG_SET_DATA,
    id,
    prop,
    data,
  };
}

export function clear() {
  return {
    type: DIALOG_CLEAR_DATA,
  };
}

export function settings(id, prop, data) {
  return {
    type: DIALOG_SET_SETTINGS,
    id,
    prop,
    data,
  };
}

export function select(id, prop, elementId) {
  return {
    type: DIALOG_SET_SELECT,
    id,
    prop,
    elementId,
  };
}

export function selectSome(id, prop, elementId, data) {
  return {
    type: DIALOG_SET_SELECT_SOME,
    id,
    prop,
    elementId,
    data,
  };
}

export function clearSelects(id, prop) {
  return {
    type: DIALOG_CLEAR_SELECTS,
    id,
    prop,
  };
}

export function groupElements(id, prop, groupId, groupData) {
  return {
    type: DIALOG_GROUP_ELEMENTS,
    id,
    prop,
    groupId,
    groupData,
  };
}

export function unGroupElements(id, prop, list, data) {
  return {
    type: DIALOG_UNGROUP_ELEMENTS,
    id,
    prop,
    list,
    data,
  };
}

export function resizeGroupElement(id, prop, groupId, groupPosition, groupChilds) {
  return {
    type: DIALOG_RESIZE_GROUP_ELEMENT,
    id,
    prop,
    groupId,
    groupPosition,
    groupChilds,
  };
}

export function moveSelectContainer(id, prop, x, y) {
  return {
    type: DIALOG_MOVE_SELECT_CONTAINER,
    id,
    prop,
    x,
    y,
  };
}

export function resizeSelectContainer(id, prop, position, childs) {
  return {
    type: DIALOG_RESIZE_SELECT_CONTAINER,
    id,
    prop,
    position,
    childs,
  };
}

export function addElement(id, prop, elementId, data) {
  return {
    type: DIALOG_ADD_ELEMENT,
    id,
    prop,
    elementId,
    data,
  };
}

export function addTemplate(id, prop, elementId, elementData, templateId, templateData) {
  return {
    type: DIALOG_ADD_TEMPLATE,
    id,
    prop,
    elementId,
    elementData,
    templateId,
    templateData,
  };
}

export function changeTemplate(id, prop, elementId, name, data) {
  return {
    type: DIALOG_CHANGE_TEMPLATE,
    id,
    prop,
    elementId,
    name,
    data,
  };
}

export function editElement(id, prop, elementId, data) {
  return {
    type: DIALOG_EDIT_ELEMENT,
    id,
    prop,
    elementId,
    data,
  };
}

export function deleteElement(id, prop) {
  return {
    type: DIALOG_DELETE_ELEMENT,
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
  addTemplate,
  editElement,
  deleteElement,
  changeTemplate,
}