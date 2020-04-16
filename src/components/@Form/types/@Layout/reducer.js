import { 
  LAYOUT_SET_DATA,
  LAYOUT_CLEAR_DATA,

  LAYOUT_SELECT_ELEMENTS,
  LAYOUT_HOVER_ELEMENTS,

  LAYOUT_ADD_SECTION,
  LAYOUT_EDIT_SECTION,
  LAYOUT_REMOVE_SECTION,
  LAYOUT_CLEAR_SECTION,

  LAYOUT_ADD_COLUMN,
  LAYOUT_EDIT_COLUMN,
  LAYOUT_REMOVE_COLUMN,
  LAYOUT_MOVE_COLUMN,
} from './constants';


function reducerLayout(state, action) {
  switch (action.type) {
    case LAYOUT_SET_DATA:
      return { ...state, ...action.data };
    case LAYOUT_HOVER_ELEMENTS:
      return { ...state, hover: action.values };
    case LAYOUT_SELECT_ELEMENTS:
      return { ...state, select: action.values };
    case LAYOUT_ADD_SECTION:
      return { 
        ...state,
        list: state.list
          .reduce((p, c) => {
            if (c === action.sectionId) {
              return p.concat(c, action.newSectionId);
            }
            return p.concat(c);
          }, []),
        sections: {
          ...state.sections,
          [action.newSectionId]: { height: 75, columns: [`${action.newSectionId}_c1`] },
        },
        columns: {
          ...state.columns,
          [`${action.newSectionId}_c1`]: { type: null },
        },
      };
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
    case LAYOUT_REMOVE_SECTION:
      return { 
        ...state,
        list: state.list.filter(i => i !== action.sectionId),
        sections: Object
          .keys(state.sections)
          .reduce((p, c) => {
            if (c === action.sectionId) {
              return p;
            }
            return { ...p, [c]: state.sections[c] };
          }, {}),
        columns: Object
          .keys(state.columns)
          .reduce((p, c) => {
            if (state.sections[action.sectionId].columns.includes(c)) {
              return p;
            }
            return { ...p, [c]: state.columns[c] };
          }, {})
      }
    case LAYOUT_CLEAR_SECTION:
      return { 
        ...state,
        sections: {
          ...state.sections,
          [action.sectionId]: { 
            ...state.sections[action.sectionId],
            columns: [`${action.sectionId}_c1`]
          },
        },
        columns: { ...Object
          .keys(state.columns)
          .reduce((p, c) => {
            if (state.sections[action.sectionId].columns.includes(c)) {
              return p;
            }
            return { ...p, [c]: state.columns[c] };
          }, {}), [`${action.sectionId}_c1`]: { type: null } }
      };
    case LAYOUT_ADD_COLUMN:
      return { 
        ...state,
        sections: {
          ...state.sections,
          [action.sectionId]: { 
            ...state.sections[action.sectionId],
            columns: state.sections[action.sectionId].columns
              .reduce((p, c) => {
                if (c === action.columnId) {
                  return p.concat(c, action.newColumnId);
                }
                return p.concat(c);
              }, []),
          },
        },
        columns: {
          ...state.columns,
          [action.newColumnId]: { type: null },
        },
      };
    case LAYOUT_EDIT_COLUMN:
      return { 
        ...state,
        columns: {
          ...state.columns,
          [action.columnId]: {
            ...state.columns[action.columnId],
            ...action.data,
          }
        },
      }
    case LAYOUT_REMOVE_COLUMN:
      return { 
        ...state,
        sections: {
          ...state.sections,
          [action.sectionId]: {
            ...state.sections[action.sectionId],
            columns: state.sections[action.sectionId].columns.filter(i => i !== action.columnId),
          }
        },
        columns: Object
          .keys(state.columns)
          .reduce((p, c) => {
            if (c === action.columnId) {
              return p;
            }
            return { ...p, [c]: state.columns[c] };
          }, {})
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
    case LAYOUT_HOVER_ELEMENTS:
    case LAYOUT_SELECT_ELEMENTS:
    case LAYOUT_MOVE_COLUMN:
    case LAYOUT_ADD_SECTION:
    case LAYOUT_EDIT_SECTION:
    case LAYOUT_REMOVE_SECTION:
    case LAYOUT_CLEAR_SECTION:
    case LAYOUT_ADD_COLUMN:
    case LAYOUT_EDIT_COLUMN:
    case LAYOUT_REMOVE_COLUMN:
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
