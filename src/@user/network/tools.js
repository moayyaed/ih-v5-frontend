
function createHideFunction(string) {
  return new Function('data', 'return ' + string);
}

function getOption(data) {
  if (Array.isArray(data)) {
    return data.map(i => {
      if (i.hide !== undefined) {
        if (i.type === 'table') {
          return { 
            ...i, 
            hide: createHideFunction(i.hide),
            columns: i.columns.map(column => {
              if (column.hide) {
                return { ...column, hide: createHideFunction(column.hide) }
              }
              return column;
            }),
          };
        }
        return { ...i, hide: createHideFunction(i.hide) };
      }
      if (i.type === 'table') {
        return { 
          ...i, 
          columns: i.columns.map(column => {
            if (column.hide) {
              return { ...column, hide: createHideFunction(column.hide) }
            }
            return column;
          }),
        };
      }
      return i;
    });
  }
  return data;
}

export function generateOptions(data) {
  return Object
    .keys(data)
    .reduce((p, c) => {
      return { ...p, [c]: getOption(data[c]) };
    }, {});
}

export function generateCache(data) {
  return data.grid
    .reduce((p, c) => {
      return { 
        ...p, [c.id]: 
        data[c.id]
          .reduce((p, c) => {
            return { ...p, [c.prop]: {} }
          }, {}) 
      };
    }, {})
}