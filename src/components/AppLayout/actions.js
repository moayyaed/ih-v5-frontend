import { APP_LAYOUT_SET_DATA, APP_LAYOUT_UPDATE_TEMPLATES  } from './constants';


export function data(data) {
  return {
    type: APP_LAYOUT_SET_DATA,
    data,
  };
}

export function updateTemplates(containerId, data) {
  return {
    type: APP_LAYOUT_UPDATE_TEMPLATES,
    containerId,
    data,
  };
}


export default {
  data,
  updateTemplates,
}