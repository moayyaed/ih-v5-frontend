import { 
  APP_LAYOUT_DIALOG_SET_DATA, 
  APP_LAYOUT_DIALOG_UPDATE_ELEMENTS, 
  APP_LAYOUT_DIALOG_SYNC_CHARTS_LAYOUT,
  APP_LAYOUT_DIALOG_SYNC_CHARTS_LAYOUT_HOME_ALL, 
} from './constants';


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

export function syncChartsHomeAll(position, date) {
  return {
    type: APP_LAYOUT_DIALOG_SYNC_CHARTS_LAYOUT_HOME_ALL,
    position,
    date
  };
}

export default {
  data,
  updateElements,
  syncCharts,
  syncChartsHomeAll,
}