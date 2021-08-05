import { 
  APP_LAYOUT_SET_DATA,
  APP_LAYOUT_UPDATE_ELEMENTS_ALL,
  APP_LAYOUT_CHANGE_CONTAINER,

  APP_LAYOUT_SYNC_CHARTS_LAYOUT,
  APP_LAYOUT_SYNC_CHARTS_CONTAINER,
  APP_LAYOUT_SYNC_CHARTS_LAYOUT_HOME_ALL,
  APP_LAYOUT_SYNC_CHARTS_CONTAINER_HOME_ALL,
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
  }
}

export function changeContainer(elementid, containerid, contextid, data) {
  return {
    type: APP_LAYOUT_CHANGE_CONTAINER,
    elementid,
    containerid, 
    contextid,
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


export default {
  data,
  updateElementsAll,
  changeContainer,
  syncChartsLayout,
  syncChartsContainer,
  syncChartsLayoutHomeAll,
  syncChartsContainerHomeAll,

}