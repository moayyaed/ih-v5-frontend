import { 
  LAYOUT_SET_DATA,
  LAYOUT_CLEAR_DATA,

  LAYOUT_HOVER_SECTION,
  LAYOUT_SELECT_ELEMENTS,

  LAYOUT_EDIT_SECTION,
  LAYOUT_MOVE_COLUMN,
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
        columns: Object
          .keys(state.columns)
          .reduce((p, c) => {
            if (c === action.columnId) {
              return { 
                ...p, 
                [c]: {
                  ...state.columns[c],
                  hover: true,
                }
              };
            }
            return { 
              ...p, 
              [c]: {
                ...state.columns[c],
                hover: false,
              }
            };
          }, {}),  
      };
    case LAYOUT_SELECT_ELEMENTS:
      return { ...state, select: action.values };
    case LAYOUT_EDIT_SECTION:
      return { 
        ...state,
        sections: {
          ...state.sections,
          [action.sectionId]: {
            ...state.sections[action.sectionId],
            ...action.data,
          }
        },
      }
    case LAYOUT_MOVE_COLUMN:
      return { 
        ...state,
        sections: {
          ...state.sections,
          [action.sourceSectionId]: {
            ...state.sections[action.sourceSectionId],
            columns: action.sourceColumns,
          },
          [action.targetSectionId]: {
            ...state.sections[action.targetSectionId],
            columns: action.targetColumns,
          }
        },
      }
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
    case LAYOUT_EDIT_SECTION:
    case LAYOUT_MOVE_COLUMN:
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
