import { 
  LAYOUT_SET_DATA,
  LAYOUT_CLEAR_DATA,

  LAYOUT_HOVER_SECTION,
  LAYOUT_SELECT_ELEMENTS,
} from './constants';


export function data(data) {
  return {
    type: LAYOUT_SET_DATA,
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


export default {
  data,
  clear,
  hoverSection,
  select,
}