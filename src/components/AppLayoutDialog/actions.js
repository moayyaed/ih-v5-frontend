import { APP_LAYOUT_DIALOG_SET_DATA, APP_LAYOUT_DIALOG_UPDATE_ELEMENTS, APP_LAYOUT_DIALOG_SYNC_CHARTS_LAYOUT } from './constants';


export function data(data) {
  return {
    type: APP_LAYOUT_DIALOG_SET_DATA,
    data,
  };
}

export function updateElements(data) {
  return {
    type: APP_LAYOUT_DIALOG_UPDATE_ELEMENTS,
    data,
  };
}

export function syncCharts(range, realtime) {
  return {
    type: APP_LAYOUT_DIALOG_SYNC_CHARTS_LAYOUT,
    range,
    realtime,
  };
}

export default {
  data,
  updateElements,
  syncCharts,
}