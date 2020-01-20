import shortid from 'shortid';

import { 
  LAYOUT_SET_DATA,
  LAYOUT_FORCE_DATA,

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
  columnOver,
  columnActive
}
