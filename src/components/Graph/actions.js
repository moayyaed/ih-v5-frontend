import { GRAPH_SET_DATA, GRAPH_SET_POSITION_LAYOUT, GRAPH_SET_POSITION_ITEM } from './constants';


export function setData(data) {
  return {
    type: GRAPH_SET_DATA,
    data,
  };
}

export function setPositionLayout(x, y) {
  return {
    type: GRAPH_SET_POSITION_LAYOUT,
    x,
    y,
  };
}

export function setPositionItem(itemid, x, y) {
  return {
    type: GRAPH_SET_POSITION_ITEM,
    itemid,
    x,
    y,
  };
}


export default {
  setData,
  setPositionLayout,
  setPositionItem,
}
