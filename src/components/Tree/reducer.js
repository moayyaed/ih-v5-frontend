import { TREE_SET_DATA, TREE_SET_SELECT, TREE_SET_RENAME } from './constants';


const defaultState = {
  loading: false,
  selectid: null,
  renameid: null,
  contextmenuid: null,
  list: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case TREE_SET_DATA:
      return { ...state, ...action.data };
    case TREE_SET_SELECT:
      return { ...state, selectid: action.selectid };
    case TREE_SET_RENAME:
      return { ...state, renameid: action.renameid };
    default:
      return state;
  }
}


export default reducer;
