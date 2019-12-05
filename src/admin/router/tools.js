export function parseValue(value) {
  if (value === '') {
    return null;
  }

  if (value === undefined) {
    return null;
  }
  return value;
}

export function parsePathOfComponent(navid, component, pageid, list) {
  switch(component) {
    case 'table':
        return { navid, component, pageid, selectid: parseValue(list[4])};
    case 'graph':
        return { navid, component, pageid };
    case 'options':
        return { navid, component, pageid };
    default:
        return { navid, component, pageid };
  }
}

export function parsePath(path) {
  const list = path.split('/');

  const navid = parseValue(list[1]);
  const component = parseValue(list[2]);
  const pageid = parseValue(list[3]);

  if (component) {
    return parsePathOfComponent(navid, component, pageid, list)
  }

  return { navid, component, pageid };
}