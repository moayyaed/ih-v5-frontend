import { EXAMPLE_CLEAR, EXAMPLE_LOAD, EXAMPLE_DATA } from './constants';


const defaultState = {
  loading: true,
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case EXAMPLE_CLEAR:
      return defaultState;
    case EXAMPLE_LOAD:
      return state.loading ? state : { ...state, ...defaultState };
    case EXAMPLE_DATA:
      return { ...state, loading: false, ...action.data };
    default:
      return state;
  }
}
