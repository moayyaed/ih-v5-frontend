import { TABLE_SET_DATA } from './constants';


const defaultState = {
  text: ''
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case TABLE_SET_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}


export default reducer;
