import { 
  APP_NAV_SET_DATA, 

  APP_NAV_SELECT_NODE, 
  APP_NAV_SELECT_NODES,
  APP_NAV_CLEAR_SELECTED,

  APP_NAV_ADD_NODE, 
  APP_NAV_SET_PANEL_WIDTH, 
} from './constants';


export function data(data) {
  return {
    type: APP_NAV_SET_DATA,
    data,
  };
}

export function panelWidth(value) {
  return {
    type: APP_NAV_SET_PANEL_WIDTH,
    value,
  };
}

export function selectNode(item) {
  return {
    type: APP_NAV_SELECT_NODE,
    item,
  };
}

export function selectNodes(lastItem, items) {
  return {
    type: APP_NAV_SELECT_NODES,
    lastItem,
    items,
  };
}

export function clearSelected() {
  return {
    type: APP_NAV_CLEAR_SELECTED,
  };
}

export function addNode() {
  return {
    type: APP_NAV_ADD_NODE,
  };
}



export default {
  data,
  selectNode,
  selectNodes,
  clearSelected,
  addNode,
  panelWidth,
}