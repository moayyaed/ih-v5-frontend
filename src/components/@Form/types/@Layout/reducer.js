import { 
  LAYOUT_SET_DATA,
  LAYOUT_CLEAR_DATA,

  LAYOUT_HOVER_SECTION,
  LAYOUT_SELECT_ELEMENTS,
} from './constants';


function reducerLayout(state, action) {
  switch (action.type) {
    case LAYOUT_SET_DATA:
      return { ...state, ...action.data };
    case LAYOUT_HOVER_SECTION:
      return { 
        ...state,
        sections: {
          ...state.sections,
          [action.sectionId]: {
            ...state.sections[action.sectionId],
            hover: action.value,
          }
        },
        columns: {
          ...state.columns,
          [action.sectionId]: Object
            .keys(state.columns[action.sectionId])
            .reduce((p, c) => {
              if (c === action.columnId) {
                return { 
                  ...p, 
                  [c]: {
                    ...state.columns[action.sectionId][c],
                    hover: true,
                  }
                };
              }
              return { 
                ...p, 
                [c]: {
                  ...state.columns[action.sectionId][c],
                  hover: false,
                }
              };
            }, {}),
        }   
      };
    case LAYOUT_SELECT_ELEMENTS:
      return { ...state, select: action.values };
    default:
      return state;
  }
}


function reducer(state, action) {
  switch (action.type) {
    case LAYOUT_CLEAR_DATA:
      return { };
    case LAYOUT_SET_DATA:
    case LAYOUT_HOVER_SECTION:
    case LAYOUT_SELECT_ELEMENTS:
      return { 
        ...state, 
        data: {
          ...state.data,
          [action.id]: {
            ...state.data[action.id],
            [action.prop]: reducerLayout(state.data[action.id][action.prop], action),
          }
        }
      };
    default:
      return state;
  }
}


export default reducer;
