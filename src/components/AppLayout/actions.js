import { 
  APP_LAYOUT_SET_DATA,
  APP_LAYOUT_UPDATE_ELEMENTS_ALL,


  APP_LAYOUT_UPDATE_TEMPLATES, 
  APP_LAYOUT_UPDATE_ELEMENTS,
  APP_LAYOUT_SYNC_CHARTS_LAYOUT,
  APP_LAYOUT_SYNC_CHARTS_CONTAINER,

  APP_LAYOUT_SYNC_CHARTS_LAYOUT_HOME_ALL,
  APP_LAYOUT_SYNC_CHARTS_CONTAINER_HOME_ALL,


  APP_LAYOUT_CHANGE_CONTAINER,
} from './constants';


export function data(data) {
  return {
    type: APP_LAYOUT_SET_DATA,
    data,
  };
}

export function updateElementsAll(data) {
  return {
    type: APP_LAYOUT_UPDATE_ELEMENTS_ALL,
    data,
  };
}

export function updateElementsLayout(data) {
  return {
    type: APP_LAYOUT_UPDATE_ELEMENTS,
    data,
  };
}

export function updateElementsContainer(containerId, data) {
  return {
    type: APP_LAYOUT_UPDATE_TEMPLATES,
    containerId,
    data,
  };
}

export function syncChartsLayout(range, realtime) {
  return {
    type: APP_LAYOUT_SYNC_CHARTS_LAYOUT,
    range,
    realtime,
  };
}

export function syncChartsContainer(containerId, range, realtime) {
  return {
    type: APP_LAYOUT_SYNC_CHARTS_CONTAINER,
    containerId,
    range,
    realtime,
  };
}

export function syncChartsLayoutHomeAll(position, date) {
  return {
    type: APP_LAYOUT_SYNC_CHARTS_LAYOUT_HOME_ALL,
    position,
    date,
  };
}

export function syncChartsContainerHomeAll(containerId, position, date) {
  return {
    type: APP_LAYOUT_SYNC_CHARTS_CONTAINER_HOME_ALL,
    containerId,
    position,
    date,
  };
}

export function changeContainer(targetId, containerId, data) {
  return {
    type: APP_LAYOUT_CHANGE_CONTAINER,
    targetId, 
    containerId, 
    data,
  };
}


export default {
  data,
  updateElementsAll,

  
  updateElementsLayout,
  updateElementsContainer,
  syncChartsLayout,
  syncChartsContainer,
  syncChartsLayoutHomeAll,
  syncChartsContainerHomeAll,
  changeContainer,
}