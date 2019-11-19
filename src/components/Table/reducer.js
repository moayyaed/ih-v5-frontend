import { TABLE_CLEAR, TABLE_LOAD, TABLE_DATA, TABLE_SELECTS, TABLE_COLUMNS } from './constants';


const defaultState = {
  loading: true,
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
    case TABLE_CLEAR:
      return defaultState;
    case TABLE_LOAD:
      return { ...state, loading: true, };
    case TABLE_DATA:
      return { ...state, loading: false, ...action.data };
    case TABLE_SELECTS:
      return { ...state, selects: action.selects };
    case TABLE_COLUMNS:
      return { ...state, columns: action.columns };
    default:
      return state;
  }
}


export default reducer;
