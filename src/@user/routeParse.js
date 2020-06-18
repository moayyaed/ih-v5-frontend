function checkValue(value) {
  if (value && value !== '') {
    return value;
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
    layout: checkValue(params[2]),
  }
  const componentParams = getComponentParams(base.componentid, params);
  return {
    ...base,
    ...componentParams,
  };
}


export default routeParse;