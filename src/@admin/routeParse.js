function checkValue(value) {
  if (value && value !== '') {
    return value;
  }
  return null;
}

function getComponentParams(componentid, params) {
  const defaultParams = {
    tab: null,
    channelview: null,
    channel: null,
  }
  if (componentid) {
    defaultParams.tab = checkValue(params[6]);
  }
  
  // if (componentid === 'pluginview' || componentid === 'deviceview') {
    defaultParams.channelview = checkValue(params[7]);
    defaultParams.channel = checkValue(params[8]);
  //}
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
  const componentParams = getComponentParams(base.componentid, params);
  return {
    ...base,
    ...componentParams,
  };
}


export default routeParse;