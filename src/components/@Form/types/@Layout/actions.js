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


export function data(id, prop, data) {
  return {
    type: LAYOUT_SET_DATA,
    id,
    prop,
    data,
  };
}

export function clear() {
  return {
    type: LAYOUT_CLEAR_DATA,
  };
}

export function settings(id, prop, data) {
  return {
    type: LAYOUT_SET_SETTINGS,
    id,
    prop,
    data,
  };
}

export function select(id, prop, elementId) {
  return {
    type: LAYOUT_SET_SELECT,
    id,
    prop,
    elementId,
  };
}

export function selectSome(id, prop, elementId, data) {
  return {
    type: LAYOUT_SET_SELECT_SOME,
    id,
    prop,
    elementId,
    data,
  };
}

export function clearSelects(id, prop) {
  return {
    type: LAYOUT_CLEAR_SELECTS,
    id,
    prop,
  };
}

export function groupElements(id, prop, groupId, groupData) {
  return {
    type: LAYOUT_GROUP_ELEMENTS,
    id,
    prop,
    groupId,
    groupData,
  };
}

export function unGroupElements(id, prop, list, data) {
  return {
    type: LAYOUT_UNGROUP_ELEMENTS,
    id,
    prop,
    list,
    data,
  };
}

export function resizeGroupElement(id, prop, groupId, groupPosition, groupChilds) {
  return {
    type: LAYOUT_RESIZE_GROUP_ELEMENT,
    id,
    prop,
    groupId,
    groupPosition,
    groupChilds,
  };
}

export function moveSelectContainer(id, prop, x, y) {
  return {
    type: LAYOUT_MOVE_SELECT_CONTAINER,
    id,
    prop,
    x,
    y,
  };
}

export function resizeSelectContainer(id, prop, position, childs) {
  return {
    type: LAYOUT_RESIZE_SELECT_CONTAINER,
    id,
    prop,
    position,
    childs,
  };
}

export function addElement(id, prop, elementId, data) {
  return {
    type: LAYOUT_ADD_ELEMENT,
    id,
    prop,
    elementId,
    data,
  };
}

export function addContainer(id, prop, elementId, elementData, containerId, containerData) {
  return {
    type: LAYOUT_ADD_CONTAINER,
    id,
    prop,
    elementId,
    elementData,
    containerId,
    containerData,
  };
}

export function addTemplate(id, prop, elementId, elementData, templateId, templateData) {
  return {
    type: LAYOUT_ADD_TEMPLATE,
    id,
    prop,
    elementId,
    elementData,
    templateId,
    templateData,
  };
}

export function changeTemplateLink(id, prop, elementId, data) {
  return {
    type: LAYOUT_CHANGE_TEMPLATE_LINK,
    id,
    prop,
    elementId,
    data,
  };
}

export function editElement(id, prop, elementId, data) {
  return {
    type: LAYOUT_EDIT_ELEMENT,
    id,
    prop,
    elementId,
    data,
  };
}

export function deleteElement(id, prop) {
  return {
    type: LAYOUT_DELETE_ELEMENT,
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
  addContainer,
  addTemplate,
  editElement,
  deleteElement,
  changeTemplateLink,
}