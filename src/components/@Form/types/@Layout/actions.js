import { 
  LAYOUT_SET_DATA,
  LAYOUT_CLEAR_DATA,

  LAYOUT_SELECT_ELEMENTS,
  LAYOUT_HOVER_ELEMENTS,
  LAYOUT_FORCE_HOVER,
  LAYOUT_REMOVE_HOVER,

  LAYOUT_ADD_SECTION,
  LAYOUT_ADD_SECTION_INNER,
  LAYOUT_EDIT_SECTION,
  LAYOUT_REMOVE_SECTION,
  LAYOUT_REMOVE_SECTION_INNER,
  LAYOUT_CLEAR_SECTION,

  LAYOUT_ADD_COLUMN,
  LAYOUT_EDIT_COLUMN,
  LAYOUT_REMOVE_COLUMN,
  LAYOUT_MOVE_COLUMN,
  LAYOUT_RESIZE_COLUMNS,
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

export function forceHover(id, prop, data) {
  return {
    type: LAYOUT_FORCE_HOVER,
    id,
    prop,
    data,
  };
}

export function removeHover(id, prop, sectionId, columnId) {
  return {
    type: LAYOUT_REMOVE_HOVER,
    id,
    prop,
    sectionId,
    columnId,
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

export function addSectionInner(id, prop, newSectionId, columnId) {
  return {
    type: LAYOUT_ADD_SECTION_INNER,
    id,
    prop,
    newSectionId,
    columnId,
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

export function removeSectionInner(id, prop, sectionId, columnId) {
  return {
    type: LAYOUT_REMOVE_SECTION_INNER,
    id,
    prop,
    sectionId,
    columnId,
  };
}

export function clearSection(id, prop, sectionId) {
  return {
    type: LAYOUT_CLEAR_SECTION,
    id,
    prop,
    sectionId,
  };
}

export function addColumn(id, prop, sectionId, columnId, newColumnId) {
  return {
    type: LAYOUT_ADD_COLUMN,
    id,
    prop,
    sectionId,
    columnId,
    newColumnId,
  };
}

export function editColumn(id, prop, columnId, data) {
  return {
    type: LAYOUT_EDIT_COLUMN,
    id,
    prop,
    columnId,
    data,
  };
}

export function removeColumn(id, prop, sectionId, columnId) {
  return {
    type: LAYOUT_REMOVE_COLUMN,
    id,
    prop,
    sectionId,
    columnId,
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

export function resizeColumns(id, prop, columnIdA, valueA, columnIdB, valueB) {
  return {
    type: LAYOUT_RESIZE_COLUMNS,
    id,
    prop,
    columnIdA,
    valueA,
    columnIdB,
    valueB,
  };
}


export default {
  data,
  clear,
  select,
  hover,
  forceHover,
  removeHover,
  addSection,
  addSectionInner,
  editSection,
  removeSection,
  removeSectionInner,
  clearSection,
  addColumn,
  editColumn,
  removeColumn,
  moveColumn,
  resizeColumns,
}