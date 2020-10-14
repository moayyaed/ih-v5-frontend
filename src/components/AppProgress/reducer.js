import { 
  APP_PROGRESS_SET_DATA, 
  APP_PROGRESS_LOG,
} from './constants';


const defaultState = {
  open: false,
  progress: 0,
  list: [],
  complete: false,
  message: 'submit',
  replace: false,
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_PROGRESS_SET_DATA:
      return { ...state, ...action.data };
    case APP_PROGRESS_LOG:
      return { ...state, log: state.log + action.mes };
    default:
      return state;
  }
}


export default reducer;
