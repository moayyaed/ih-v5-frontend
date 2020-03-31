import { 
  APP_NAV_SET_DATA, 
  APP_NAV_CLEAR_DATA,

  APP_NAV_CLICK_NODE,
  APP_NAV_SELECT_NODE, 
  APP_NAV_SELECT_NODES,
  APP_NAV_SELECT_NODE_CONTEXT_MENU,
  APP_NAV_CLEAR_SELECTED,

  APP_NAV_UPDATE_NODES, 
  APP_NAV_SET_PANEL_WIDTH, 
  APP_NAV_SET_SCROLL, 
} from './constants';


export function data(stateid, data) {
  return {
    type: APP_NAV_SET_DATA,
    stateid, 
    data,
  };
}

export function clear(stateid) {
  return {
    type: APP_NAV_CLEAR_DATA,
    stateid,
  };
}

export function panelWidth(stateid, value) {
  return {
    type: APP_NAV_SET_PANEL_WIDTH,
    stateid, 
    value,
  };
}

export function scroll(stateid, e) {
  return {
    type: APP_NAV_SET_SCROLL,
    stateid, 
    e: e.scrollTop,
  };
}

export function clickNode(stateid, component, id) {
  return {
    type: APP_NAV_CLICK_NODE,
    stateid, 
    data: { component, id },
  };
}

export function selectNode(stateid, item) {
  return {
    type: APP_NAV_SELECT_NODE,
    stateid, 
    item,
  };
}

export function selectNodes(stateid, lastItem, items) {
  return {
    type: APP_NAV_SELECT_NODES,
    stateid, 
    lastItem,
    items,
  };
}

export function selectNodeContextMenu(stateid, item = null) {
  return {
    type: APP_NAV_SELECT_NODE_CONTEXT_MENU,
    stateid, 
    item,
  };
}

export function clearSelected(stateid, ) {
  return {
    type: APP_NAV_CLEAR_SELECTED,
    stateid, 
  };
}

export function updateNodes(stateid, data) {
  if (Array.isArray(data)) {
    return {
      type: APP_NAV_UPDATE_NODES,
      stateid, 
      data: data.reduce((p, c) => ({ ...p, [c.id]: c }), {}),
    };
  }
  return {
    type: APP_NAV_UPDATE_NODES,
    stateid, 
    data,
  };
}



export default {
  data,
  clear,
  clickNode,
  selectNode,
  selectNodes,
  selectNodeContextMenu,
  clearSelected,
  updateNodes,
  panelWidth,
  scroll,
}