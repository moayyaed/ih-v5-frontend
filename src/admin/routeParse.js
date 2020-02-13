function checkValue(value) {
  if (value && value !== '') {
    return value;
  }
  return null;
}

function getComponentParams(componentid, params) {
  const defaultParams = {
    tab: null,
  }
  if (componentid) {
    defaultParams.tab = checkValue(params[6]);
  }
  return defaultParams;
}

function routeParse(pathname) {
  const params = pathname.split('/');
  const base = {
    menuid: checkValue(params[2]),
    rootid: checkValue(params[3]),
    componentid: checkValue(params[4]),
    nodeid: checkValue(params[5]), 
  }
  return {
    ...base,
    ...getComponentParams(base.componentid, params),
  };
}


export default routeParse;