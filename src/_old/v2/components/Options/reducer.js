import { OPTIONS_SET_DATA, OPTIONS_SET_SELECT } from './constants';


const defaultState = {
  selectid: null,
  tabs: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case OPTIONS_SET_DATA:
      return { ...state, ...action.data };
    case OPTIONS_SET_SELECT:
      return { ...state, selectid: action.selectid };
    default:
      return state;
  }
}


export default reducer;
