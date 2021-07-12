function checkValue(value) {
  if (value && value !== '') {
    return value;
  }
  return null;
}

function parseFrames(value) {
  if (value && value !== '') {
    return value
      .split(';')
      .reduce((p, c) => {
        const values = c.split(',')
        if (values[0]) {
          return { 
            ...p, 
            [values[0]]: {
              containerid: values[1] || null,
              contextid: values[2] || null,
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
    frames: parseFrames(params[2]),
    uframes: checkValue(params[2]),
  }
  const componentParams = getComponentParams(base.componentid, params);
  return {
    ...base,
    ...componentParams,
  };
}


export default routeParse;