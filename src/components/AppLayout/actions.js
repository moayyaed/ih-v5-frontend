import { APP_LAYOUT_SET_DATA, APP_LAYOUT_UPDATE_TEMPLATES, APP_LAYOUT_UPDATE_ELEMENTS } from './constants';


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


export default {
  data,
  updateElementsLayout,
  updateElementsContainer,
}