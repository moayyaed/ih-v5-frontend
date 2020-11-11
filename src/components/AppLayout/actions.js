import { 
  APP_LAYOUT_SET_DATA, 
  APP_LAYOUT_UPDATE_TEMPLATES, 
  APP_LAYOUT_UPDATE_ELEMENTS,
  APP_LAYOUT_SYNC_CHARTS_LAYOUT,
  APP_LAYOUT_SYNC_CHARTS_CONTAINER,
} from './constants';


export function data(data) {
  return {
    type: APP_LAYOUT_SET_DATA,
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


export default {
  data,
  updateElementsLayout,
  updateElementsContainer,
  syncChartsLayout,
  syncChartsContainer,
}