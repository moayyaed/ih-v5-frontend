import shortid from 'shortid';

import { 
  LAYOUT_SET_DATA, 
  LAYOUT_FORCE_DATA, 

  LAYOUT_SECTION_DRAG_START,
  LAYOUT_SECTION_DRAG_MOVE,
  LAYOUT_SECTION_DRAG_STOP,
  LAYOUT_SECTION_DRAG_UPDATE,

  LAYOUT_SECTION_OUT,
  LAYOUT_COLUMN_OVER,
  LAYOUT_COLUMN_ACTIVE,
} from './constants';


const defaultState = {
  toolbar: {
    enabled: false,
    element: null,
    x: 0,
    y: 0,
    min: 0,
    max: 0,
  },
  list: [
    { id: '1', type: 'section', height: 50, hide: false, active: false, focus: false, columns: [ { id: '1', active: false, focus: false } ] },
    { id: '2', type: 'section', height: 75, active: false, focus: false, columns: [ { id: '1', active: false, focus: false }, { id: '2', active: false, focus: false } ] },
    { id: '3', type: 'section', height: 100, active: false, focus: false, columns: [ { id: '1', active: false, focus: false }, { id: '2', active: false, focus: false }, { id: '3', active: false, focus: false } ]},
    { id: '4', type: 'section', height: 150, active: false, focus: false, columns: [ { id: '1', active: false, focus: false }, { id: '2', active: false, focus: false }, { id: '3', active: false, focus: false }, { id: '4', active: false, focus: false } ]},
  ]
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case LAYOUT_SET_DATA:
      return { ...state, ...defaultState, ...action.data };
    case LAYOUT_FORCE_DATA:
      return { ...state, ...action.data };
    case LAYOUT_SECTION_DRAG_START:
      return { 
        ...state, 
        list: state.list.reduce((p, c) => {
          if (c.id === action.sectionid) {
            return p.concat({
              ...c,
              hide: true,
            }, { id: shortid.generate(), type: 'stub', height: 40 });
          }
          return p.concat(c);
        }, []),
        toolbar: {
          ...state.toolbar,
          enabled: true,
          element: action.element,
          x: action.x,
          y: action.y,
          min: action.min,
          max: action.max,
        },
      };
    case LAYOUT_SECTION_DRAG_UPDATE:
      return { 
        ...state, 
        list: state.list.reduce((p, c) => {
          if (c.type === 'stub') {
            return p;
          }
          if (c.id === action.sectionid) {
            if (action.flag) {
              return p.concat(c, { id: shortid.generate(), type: 'stub', height: 40 });
            }
            return p.concat({ id: shortid.generate(), type: 'stub', height: 40 }, c);
          }
          return p.concat(c);
        }, []),
        toolbar: {
          ...state.toolbar,
          x: action.x,
          y: action.y,
          min: action.min,
          max: action.max,
        },
      };
    case LAYOUT_SECTION_DRAG_MOVE:
      return { 
        ...state, 
        toolbar: {
          ...state.toolbar,
          x: action.x,
          y: action.y,
        },
      };
    case LAYOUT_SECTION_DRAG_STOP:
      return { 
        ...state, 
        list: state.list.reduce((p, c) => {
          if (c.type === 'stub') {
            return p;
          }
          if (c.id === action.sectionid) {
            return p.concat({
              ...c,
              hide: false,
            });
          }
          return p.concat(c);
        }, []),
        toolbar: {
          ...state.toolbar,
          enabled: false,
          element: null,
        },
      };
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
    case LAYOUT_COLUMN_ACTIVE:
      return { 
        ...state, 
        list: state.list.map(i => {
          if (i.id === action.sectionid) {
            return {
              ...i,
              focus: true,
              columns: i.columns.map(x => { 
                if (x.id === action.columnid) {
                  return {  ...x, focus: true, active: true }
                } else {
                  if (x.active === true) {
                    return { ...x, focus: false, active: false }
                  }
                }
                return x;
              })
            }
          }
          return { 
            ...i, 
            focus: false,
            active: false,
            columns: i.columns.map(x => {
              return { ...x, focus: false, active: false }
            }) 
          };
        }),
      };
    default:
      return state;
  }
}


export default reducer;
