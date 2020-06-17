import { 
  LAYOUT_SET_DATA,
  LAYOUT_CLEAR_DATA,

  LAYOUT_SELECT_ELEMENTS,
  LAYOUT_HOVER_ELEMENTS,
  LAYOUT_FORCE_HOVER,
  LAYOUT_REMOVE_HOVER,

  LAYOUT_ADD_SECTION,
  LAYOUT_ADD_SECTION_INNER,
  LAYOUT_EDIT_SECTION,
  LAYOUT_REMOVE_SECTION,
  LAYOUT_REMOVE_SECTION_INNER,
  LAYOUT_CLEAR_SECTION,

  LAYOUT_ADD_COLUMN,
  LAYOUT_EDIT_COLUMN,
  LAYOUT_REMOVE_COLUMN,
  LAYOUT_MOVE_COLUMN,
  LAYOUT_RESIZE_COLUMNS,
} from './constants';


function removeColumn(list, columns, removeId) {
  const size = Number(columns[removeId].size);
  let a = null;
  let b = null;

  let prev = null;
  let next = null;
  
  list.forEach(key => {
    if (b) {
      next = key;
      b = null;
    }
    if (key === removeId) {
      a = true;
      b = true
    }
    if (a === null) {
      prev = key;
    }
  });

  const temp = Object
    .keys(columns)
    .reduce((p, c) => {
      if (c === removeId) {
        return p;
      }
      return { ...p, [c]: columns[c] };
    }, {});
    
  if (prev) {
    const s = (Number(temp[prev].size) + size).toFixed(2);
    temp[prev] = { ...temp[prev], size:  Number(s) }
  } else {
    const nextsize = Number(temp[next].size).toFixed(2);
    const s = (Number(temp[next].size) + size).toFixed(2);
    temp[next] = { ...temp[next], size: Number(s) }
  }
  return temp;
}

function reducerLayout(state, action) {
  switch (action.type) {
    case LAYOUT_SET_DATA:
      return { ...state, ...action.data };
    case LAYOUT_HOVER_ELEMENTS:
      return { 
        ...state, 
        hover: { 
          ...state.hover, 
          sections: {
            ...state.hover.sections,
            [action.values.section]: true,
          },
          columns: {
            ...state.hover.columns,
            [action.values.column]: true,
          },
          check: null,
        } 
      };
    case LAYOUT_FORCE_HOVER:
      return { 
        ...state, 
        hover: { 
          ...state.hover,
          ...action.data,
        } 
      };
    case LAYOUT_REMOVE_HOVER:
      return { 
        ...state, 
        hover: { 
          ...state.hover,
          sections: Object
            .keys(state.hover.sections)
            .reduce((p, c) => {
              if (c === action.sectionId) {
                return p;
              }
              return { ...p, [c]: state.hover.sections[c] };
            }, {}),
          columns: Object
          .keys(state.hover.columns)
          .reduce((p, c) => {
            if (c === action.columnId) {
              return p;
            }
            return { ...p, [c]: state.hover.columns[c] };
          }, {}),
        } 
      };
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
          [action.newSectionId]: { 
            height: 75, 
            direction: 'row', 
            columns: [`${action.newSectionId}_c1`] 
          },
        },
        columns: {
          ...state.columns,
          [`${action.newSectionId}_c1`]: { type: null, size: 100 },
        },
      };
    case LAYOUT_ADD_SECTION_INNER:
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.newSectionId]: { 
            height: '100%', 
            direction: 'column', 
            columns: [`${action.newSectionId}_c1`] 
          },
        },
        columns: Object
          .keys(state.columns)
          .reduce((p, c) => {
            if (c === action.columnId) {
              return { 
                ...p, [c]: { 
                  ...state.columns[c], 
                  type: 'innersection', 
                  sectionId: action.newSectionId 
                } 
              };
            }
            return { ...p, [c]: state.columns[c] };
          }, { [`${action.newSectionId}_c1`]: { type: null, size: 100 } })
      }
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
    case LAYOUT_REMOVE_SECTION_INNER:
      return { 
        ...state,
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
            if (c === action.columnId) {
              return { ...p, [c]: { type: null, size: state.columns[c].size } };
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
          }, {}), [`${action.sectionId}_c1`]: { type: null, size: 100 } }
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
          [action.columnId]: { 
            ...state.columns[action.columnId], 
            size: Number((Number(state.columns[action.columnId].size) / 2).toFixed(2))
          },
          [action.newColumnId]: { 
            type: null, 
            size: Number((Number(state.columns[action.columnId].size) / 2).toFixed(2)) 
          },
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
        columns: removeColumn(state.sections[action.sectionId].columns, state.columns, action.columnId)
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
    case LAYOUT_RESIZE_COLUMNS:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.columnIdA]: { ...state.columns[action.columnIdA], size: action.valueA },
          [action.columnIdB]: { ...state.columns[action.columnIdB], size: action.valueB }
        }
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
    case LAYOUT_FORCE_HOVER:
    case LAYOUT_REMOVE_HOVER:
    case LAYOUT_MOVE_COLUMN:
    case LAYOUT_ADD_SECTION:
    case LAYOUT_ADD_SECTION_INNER:
    case LAYOUT_EDIT_SECTION:
    case LAYOUT_REMOVE_SECTION:
    case LAYOUT_REMOVE_SECTION_INNER:
    case LAYOUT_CLEAR_SECTION:
    case LAYOUT_ADD_COLUMN:
    case LAYOUT_EDIT_COLUMN:
    case LAYOUT_REMOVE_COLUMN:
    case LAYOUT_RESIZE_COLUMNS:
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
