import { TREE_SET_DATA, TREE_SET_SELECT } from './constants';


const defaultState = {
  loading: false,
  selectid: null,
  contextmenuid: null,
  list: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case TREE_SET_DATA:
      return { ...state, ...action.data };
    case TREE_SET_SELECT:
      return { ...state, selectid: action.selectid };
    default:
      return state;
  }
}


export default reducer;
