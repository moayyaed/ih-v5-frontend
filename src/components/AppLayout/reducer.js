import { APP_LAYOUT_SET_DATA } from './constants';


const defaultState = {
  layout: { list: [] },
  containers: {},
  templates: {},
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_LAYOUT_SET_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}


export default reducer;
