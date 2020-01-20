import { 
  LAYOUT_SET_DATA, 
  LAYOUT_FORCE_DATA, 

  LAYOUT_SECTION_OUT,
  LAYOUT_COLUMN_OVER,
} from './constants';


const defaultState = {
  list: [
    { id: '1', active: false, focus: false, columns: [ { id: '1', active: false, focus: false } ] },
    { id: '2', active: false, focus: false, columns: [ { id: '1', active: false, focus: false }, { id: '2', active: false, focus: false } ] },
    { id: '3', active: false, focus: false, columns: [ { id: '1', active: false, focus: false }, { id: '2', active: false, focus: false }, { id: '3', active: false, focus: false } ]},
    { id: '4', active: false, focus: false, columns: [ { id: '1', active: false, focus: false }, { id: '2', active: false, focus: false }, { id: '3', active: false, focus: false }, { id: '4', active: false, focus: false } ]},
  ]
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case LAYOUT_SET_DATA:
      return { ...state, ...defaultState, ...action.data };
    case LAYOUT_FORCE_DATA:
      return { ...state, ...action.data };
    case LAYOUT_SECTION_OUT:
      return { 
        ...state, 
        list: state.list.map(i => {
          if (i.id === action.sectionid) {
            return {
              ...i,
              focus: false,
              columns: i.columns.map(x => { 
                return { ...x, focus: false }
              })
            }
          }
          return i;
        }),
      };
    case LAYOUT_COLUMN_OVER:
      return { 
        ...state, 
        list: state.list.map(i => {
          if (i.id === action.sectionid) {
            return {
              ...i,
              focus: true,
              columns: i.columns.map(x => { 
                if (x.id === action.columnid) {
                  return {  ...x, focus: true }
                } else {
                  if (x.focus === true) {
                    return { ...x, focus: false }
                  }
                }
                return x;
              })
            }
          }
          return i;
        }),
      };
    default:
      return state;
  }
}


export default reducer;
