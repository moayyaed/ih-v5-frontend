import { 
  LAYOUT_SET_DATA,
  LAYOUT_CLEAR_DATA,
} from './constants';



function reducer(state, action) {
  switch (action.type) {
    case LAYOUT_SET_DATA:
      return { ...state, ...action.data };
    case LAYOUT_CLEAR_DATA:
      return { };
    default:
      return state;
  }
}


export default reducer;
