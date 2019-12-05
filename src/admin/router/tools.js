export function parseValue(value) {
  if (value === '') {
    return null;
  }

  if (value === undefined) {
    return null;
  }
  return value;
}

export function parsePathOfComponent(menuid, navcomponent, navid, list) {
  switch(navcomponent) {
    case 'table':
        return { menuid, navcomponent, navid, selectid: parseValue(list[4])};
    case 'graph':
        return { menuid, navcomponent, navid };
    case 'options':
        return { menuid, navcomponent, navid };
    default:
        return { menuid, navcomponent, navid };
  }
}

export function parsePath(path) {
  const list = path.split('/');

  const menuid = parseValue(list[1]);
  const navcomponent = parseValue(list[2]);
  const navid = parseValue(list[3]);

  if (navcomponent) {
    return parsePathOfComponent(menuid, navcomponent, navid, list)
  }

  return { menuid, navcomponent, navid };
}