function checkValue(value) {
  if (value && value !== '') {
    return value;
  }
  return null;
}

function parseFrames(layoutid, value) {
  if (value && value !== '') {
    return value
      .split(';')
      .reduce((p, c) => {
        const values = c.split(',')
        if (values[0]) {
          return { 
            ...p, 
            [layoutid + '_' + values[0]]: {
              containerid: values[1] || null,
              linkid: values[2] || null,
              multichartid: values[3] || null,
              timelineid: values[4] || null,
              journalid: values[5] || null,
              alertjournalid: values[6] || null,
            } 
          };
        }
        return p;
      }, {});
  }
  return null;
}

function getComponentParams(componentid, params) {
  const defaultParams = {

  }

  return defaultParams;
}

function routeParse(pathname) {
  const params = pathname.split('/');
  const base = {
    layout: checkValue(params[1]),
    frames: parseFrames(checkValue(params[1]), params[2]),
    uframes: checkValue(params[2]),
  }
  const componentParams = getComponentParams(base.componentid, params);
  return {
    ...base,
    ...componentParams,
  };
}


export default routeParse;