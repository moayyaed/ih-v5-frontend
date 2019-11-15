import { TABLE_SET_DATA, TABLE_SET_SELECTS, TABLE_SET_COLUMNS } from './constants';


export function setData(id, data) {
  return {
    id,
    type: TABLE_SET_DATA,
    data,
  };
}

export function setSelects(id, selects) {
  return {
    id,
    type: TABLE_SET_SELECTS,
    selects,
  };
}

export function setColumns(id, columns) {
  return {
    id,
    type: TABLE_SET_COLUMNS,
    columns,
  };
} 


export default {
  setData,
  setSelects,
  setColumns,
}
