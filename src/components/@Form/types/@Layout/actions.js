import { 
  LAYOUT_SET_DATA,
  LAYOUT_CLEAR_DATA,

  LAYOUT_SELECT_ELEMENTS,
  LAYOUT_HOVER_ELEMENTS,

  LAYOUT_ADD_SECTION,
  LAYOUT_EDIT_SECTION,
  LAYOUT_REMOVE_SECTION,

  LAYOUT_MOVE_COLUMN,
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

export function hover(id, prop, values) {
  return {
    type: LAYOUT_HOVER_ELEMENTS,
    id,
    prop,
    values,
  };
}

export function select(id, prop, values) {
  return {
    type: LAYOUT_SELECT_ELEMENTS,
    id,
    prop,
    values,
  };
}

export function addSection(id, prop, sectionId, newSectionId) {
  return {
    type: LAYOUT_ADD_SECTION,
    id,
    prop,
    sectionId,
    newSectionId,
  };
}

export function editSection(id, prop, sectionId, data) {
  return {
    type: LAYOUT_EDIT_SECTION,
    id,
    prop,
    sectionId,
    data
  };
}

export function removeSection(id, prop, sectionId) {
  return {
    type: LAYOUT_REMOVE_SECTION,
    id,
    prop,
    sectionId,
  };
}

export function moveColumn(id, prop, sourceSectionId, targetSectionId, sourceColumns, targetColumns) {
  return {
    type: LAYOUT_MOVE_COLUMN,
    id,
    prop,
    sourceSectionId,
    targetSectionId,
    sourceColumns,
    targetColumns,
  };
}


export default {
  data,
  clear,
  select,
  hover,
  addSection,
  editSection,
  removeSection,
  moveColumn,
}