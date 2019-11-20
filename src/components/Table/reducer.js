import shortid from 'shortid';
import { TABLE_CLEAR, TABLE_LOAD, TABLE_DATA, TABLE_SELECTS, TABLE_COLUMNS } from './constants';


const defaultState = {
  loading: true,
  selects: {
    scrollToIndex: undefined,
    lastIndex: null,
    data: {},
  },
  ...fakeTableData(),
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case TABLE_CLEAR:
      return defaultState;
    case TABLE_LOAD:
      return state.loading ? state : { ...state, ...defaultState, ...fakeTableData() };
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

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeTableData() {
  const h = Array(10)
    .fill(0)
    .map(() => {
      const w = getRandom(120, 250);
      return {
        id: shortid.generate(),
        width: w,
        label: getRandom(50, w - 10),
      }
    });
  const d = Array(150)
    .fill(0)
    .map(() => {
      return h.map(i => getRandom(50, i.label))
    });
    return { id: shortid.generate(), columns: h, data: d }
}


export default reducer;
