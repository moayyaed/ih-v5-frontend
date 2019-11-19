import { TABLE_CLEAR, TABLE_LOAD, TABLE_DATA, TABLE_SELECTS, TABLE_COLUMNS } from './constants';


export function clear() {
  return {
    type: TABLE_CLEAR,
  };
}

export function load() {
  return {
    type: TABLE_LOAD,
  };
}

export function data(data) {
  return {
    type: TABLE_DATA,
    data,
  };
}

export function selects(id, selects) {
  return {
    id,
    type: TABLE_SELECTS,
    selects,
  };
}

export function columns(id, columns) {
  return {
    id,
    type: TABLE_COLUMNS,
    columns,
  };
} 


export default {
  clear,
  load,
  data,
  selects,
  columns,
}
