import { 
  APP_NAV_SET_DATA, 

  APP_NAV_SELECT_NODE, 
  APP_NAV_SELECT_NODES,
  APP_NAV_SELECT_NODE_CONTEXT_MENU,
  APP_NAV_CLEAR_SELECTED,

  APP_NAV_UPDATE_NODES, 
  APP_NAV_SET_PANEL_WIDTH, 
  APP_NAV_SET_SCROLL, 
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

export function scroll(e) {
  return {
    type: APP_NAV_SET_SCROLL,
    e: e.scrollTop,
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

export function selectNodeContextMenu(item = null) {
  return {
    type: APP_NAV_SELECT_NODE_CONTEXT_MENU,
    item,
  };
}

export function clearSelected() {
  return {
    type: APP_NAV_CLEAR_SELECTED,
  };
}

export function updateNodes(data) {
  if (Array.isArray(data)) {
    return {
      type: APP_NAV_UPDATE_NODES,
      data: data.reduce((p, c) => ({ ...p, [c.id]: c }), {}),
    };
  }
  return {
    type: APP_NAV_UPDATE_NODES,
    data,
  };
}



export default {
  data,
  selectNode,
  selectNodes,
  selectNodeContextMenu,
  clearSelected,
  updateNodes,
  panelWidth,
  scroll,
}