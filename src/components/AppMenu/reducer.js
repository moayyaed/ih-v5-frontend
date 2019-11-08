import { APP_MENU_SET_DATA, APP_MENU_SET_SELECT } from './constants';


const defaultState = {
  select: null,
  list: [
    { id: '1', label: 'Menu 1', tooltip: 'App Menu 1', icon: '' },
    { id: '2', label: 'Menu 2', tooltip: 'App Menu 2', icon: '' },
    { id: '3', label: 'Menu 3', tooltip: 'App Menu 3', icon: '' },
  ],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_MENU_SET_DATA:
      return { ...state, ...action.data };
    case APP_MENU_SET_SELECT:
      return { ...state, select: action.selectid };
    default:
      return state;
  }
}


export default reducer;
