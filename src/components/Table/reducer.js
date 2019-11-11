import { TABLE_SET_DATA, TABLE_SET_SELECTS, TABLE_SET_COLUMNS } from './constants';


const defaultState = {
  id: '',
  selects: {
    scrollToIndex: undefined,
    lastIndex: null,
    data: {},
  },
  columns: [],
  data: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case TABLE_SET_DATA:
      return { ...state, ...action.data };
    case TABLE_SET_SELECTS:
      return { ...state, selects: action.selects };
    case TABLE_SET_COLUMNS:
      return { ...state, columns: action.columns };
    default:
      return state;
  }
}


export default reducer;
