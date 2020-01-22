import shortid from 'shortid';

import { 
  LAYOUT_SET_DATA,
  LAYOUT_FORCE_DATA,

  LAYOUT_SECTION_DRAG_START,
  LAYOUT_SECTION_DRAG_STOP,
  LAYOUT_SECTION_DRAG_MOVE,

  LAYOUT_SECTION_OUT,
  LAYOUT_COLUMN_OVER,
  LAYOUT_COLUMN_ACTIVE,
} from './constants';


export function setData(data) {
  return {
    type: LAYOUT_SET_DATA,
    data,
  };
}

export function forceData(data) {
  return {
    type: LAYOUT_FORCE_DATA,
    data,
  };
}

export function sectionOut(sectionid) {
  return {
    type: LAYOUT_SECTION_OUT,
    sectionid,
  };
}

export function sectionDragStart(sectionid, element, x, y, min, max) {
  return {
    type: LAYOUT_SECTION_DRAG_START,
    sectionid,
    element,
    x,
    y,
    min,
    max,
  };
}

export function sectionDragMove(x, y) {
  return {
    type: LAYOUT_SECTION_DRAG_MOVE,
    x,
    y,
  };
}

export function sectionDragStop(sectionid) {
  return {
    type: LAYOUT_SECTION_DRAG_STOP,
    sectionid,
  };
}

export function columnOver(sectionid, columnid) {
  return {
    type: LAYOUT_COLUMN_OVER,
    sectionid,
    columnid,
  };
}

export function columnActive(sectionid, columnid) {
  return {
    type: LAYOUT_COLUMN_ACTIVE,
    sectionid,
    columnid,
  };
}

export default {
  setData,
  forceData,
  sectionOut,
  sectionDragStart,
  sectionDragMove,
  sectionDragStop,
  columnOver,
  columnActive,
}
