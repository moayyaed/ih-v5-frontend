import { 
  APP_DIALOG_SET_DATA, 
  APP_DIALOG_CLOSE, 
  APP_DIALOG_SET_COMPONENT,
  APP_DIALOG_SET_FORM,
} from './constants';


const defaultState = {
  open: false,
  title: '',
  transfer: null,
  template: { type: null, id: null },
  component: { type: null, id: null },
  form: {
    id: null,
    save: false,
    scheme: {},
    data: {},
    cache: {}
  }
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_DIALOG_SET_DATA:
      return { ...state, ...action.data };
    case APP_DIALOG_CLOSE:
      return { ...defaultState };
    case APP_DIALOG_SET_COMPONENT:
      return { ...state, component: action.data };
    case APP_DIALOG_SET_FORM:
      return { ...state, form: action.data };
    default:
      return state;
  }
}


export default reducer;
