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
  };
}


export default routeParse;