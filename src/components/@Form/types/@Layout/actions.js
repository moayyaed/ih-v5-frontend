import { 
  LAYOUT_SET_DATA,
  LAYOUT_CLEAR_DATA,

  LAYOUT_SELECT_ELEMENTS,

  LAYOUT_HOVER_SECTION,
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

export function hoverSection(id, prop, sectionId, columnId, value) {
  return {
    type: LAYOUT_HOVER_SECTION,
    id,
    prop,
    sectionId,
    columnId,
    value
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
  hoverSection,
  editSection,
  removeSection,
  moveColumn,
}