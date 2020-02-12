function checkValue(value) {
  if (value && value !== '') {
    return value;
  }
  return null;
}

function routeParse(pathname) {
  const params = pathname.split('/');
  return {
    menuid: checkValue(params[2]),
    rootid: checkValue(params[3]),
    viewid: checkValue(params[5]),
    nodeid: checkValue(params[4]),  
  };
}


export default routeParse;