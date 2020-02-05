import { EXPLORER_CLEAR, EXPLORER_LOAD, EXPLORER_DATA } from './constants';


const defaultState = {
  loading: true,
  ...fakeNavigatorData(),
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case EXPLORER_CLEAR:
      return defaultState;
    case EXPLORER_LOAD:
      return state.loading ? state : { ...state, ...defaultState, ...fakeNavigatorData() };
    case EXPLORER_DATA:
      return { ...state, loading: false, ...action.data };
    default:
      return state;
  }
}

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeNavigatorData() {
  return { list: Array(getRandom(3, 6))
    .fill(0)
    .map(() => {
      return {
        width: getRandom(100, 140),
        list: Array(getRandom(3, 6)).fill(0).map(() => getRandom(80, 120)),
      }
    })
  }
}


export default reducer;
