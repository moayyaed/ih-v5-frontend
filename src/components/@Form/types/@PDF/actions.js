import { 
  PDF_SET_DATA,
  PDF_CLEAR_DATA,

  PDF_SET_SETTINGS,

  PDF_SET_SELECT,
  PDF_SET_SELECT_SOME,
  PDF_SET_SELECT_MOUSE_BOX,
  PDF_CLEAR_SELECTS,

  PDF_GROUP_ELEMENTS,
  PDF_UNGROUP_ELEMENTS,

  PDF_RESIZE_GROUP_ELEMENT,
  PDF_MOVE_SELECT_CONTAINER,
  PDF_RESIZE_SELECT_CONTAINER,

  PDF_ADD_ELEMENT,
  PDF_ADD_TEMPLATE,
  PDF_EDIT_ELEMENT,
  PDF_DELETE_ELEMENT,
  
  PDF_CHANGE_TEMPLATE,
  PDF_PASTE_STYLE_ELEMENT,
} from './constants';


export function data(id, prop, data) {
  return {
    type: PDF_SET_DATA,
    id,
    prop,
    data,
  };
}

export function clear() {
  return {
    type: PDF_CLEAR_DATA,
  };
}

export function settings(id, prop, data) {
  return {
    type: PDF_SET_SETTINGS,
    id,
    prop,
    data,
  };
}

export function select(id, prop, elementId) {
  return {
    type: PDF_SET_SELECT,
    id,
    prop,
    elementId,
  };
}

export function selectSome(id, prop, elementId, data) {
  return {
    type: PDF_SET_SELECT_SOME,
    id,
    prop,
    elementId,
    data,
  };
}

export function selectMB(id, prop, selects, data) {
  return {
    type: PDF_SET_SELECT_MOUSE_BOX,
    id,
    prop,
    selects,
    data,
  };
}

export function clearSelects(id, prop) {
  return {
    type: PDF_CLEAR_SELECTS,
    id,
    prop,
  };
}

export function groupElements(id, prop, groupId, groupData) {
  return {
    type: PDF_GROUP_ELEMENTS,
    id,
    prop,
    groupId,
    groupData,
  };
}

export function unGroupElements(id, prop, list, data) {
  return {
    type: PDF_UNGROUP_ELEMENTS,
    id,
    prop,
    list,
    data,
  };
}

export function resizeGroupElement(id, prop, groupId, groupPosition, groupChilds) {
  return {
    type: PDF_RESIZE_GROUP_ELEMENT,
    id,
    prop,
    groupId,
    groupPosition,
    groupChilds,
  };
}

export function moveSelectContainer(id, prop, x, y) {
  return {
    type: PDF_MOVE_SELECT_CONTAINER,
    id,
    prop,
    x,
    y,
  };
}

export function resizeSelectContainer(id, prop, position, childs) {
  return {
    type: PDF_RESIZE_SELECT_CONTAINER,
    id,
    prop,
    position,
    childs,
  };
}

export function addElement(id, prop, elementId, data) {
  return {
    type: PDF_ADD_ELEMENT,
    id,
    prop,
    elementId,
    data,
  };
}

export function addTemplate(id, prop, elementId, elementData, templateId, templateData) {
  return {
    type: PDF_ADD_TEMPLATE,
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
    type: PDF_CHANGE_TEMPLATE,
    id,
    prop,
    elementId,
    name,
    data,
  };
}

export function editElement(id, prop, elementId, data) {
  return {
    type: PDF_EDIT_ELEMENT,
    id,
    prop,
    elementId,
    data,
  };
}

export function deleteElement(id, prop) {
  return {
    type: PDF_DELETE_ELEMENT,
    id,
    prop,
  };
}

export function pasteStyle(id, prop, buffer) {
  return {
    type: PDF_PASTE_STYLE_ELEMENT,
    id,
    prop,
    buffer,
  };
}


export default {
  data,
  clear,
  settings,
  select,
  selectSome,
  selectMB,
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

  pasteStyle,
}