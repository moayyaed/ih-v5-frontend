import { EXPLORER_SET_DATA, EXPLORER_SET_SELECT } from './constants';


const defaultState = {
  loading: false,
  selectid: null,
  list: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case EXPLORER_SET_DATA:
      return { ...state, ...action.data };
    case EXPLORER_SET_SELECT:
      return { ...state, selectid: action.selectid };
    default:
      return state;
  }
}


export default reducer;
