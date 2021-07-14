function linkProp(name, prop, link) {
  if (prop && typeof prop !== 'string') {
    if (name === 'actions') {
      return linkActions(prop, link)
    }
    if (name === 'links') {
      return linkTemplate(prop, link)
    }
    if (name === 'widgetlinks') {
      return linkWidgetLinks(prop, link)
    }
    if (prop.enabled) {
      return linkStatic(prop, link);
    }
  }
  return prop;
}

function linkCommands(list, link) {
  return list.map(i => {
    if (i.command === 'device' || i.command === 'device_any') {
      if (i.did !== '__device' || i.did !== '__devstat') {
        return { ...i, did: link.did, title: `${link.title}.${i.prop}` }
      }
    }
    if (i.command === 'setval' || i.command === 'setval_any') {
      if (i.did !== '__device' || i.did !== '__devstat') {
        return { ...i, did: link.did, title: `${link.title}.${i.prop}` }
      }
    }
    if (i.command === 'dialog' || i.command === 'dialog_any') {
      if (i.value && i.value.device && i.value.device.id && (i.value.device.id !== '__device' || i.value.device.id !== '__devstat')) {
        return { 
          ...i,
          value: {
            ...i.value,
            device: {
              ...i.value.device,
              id: link.did,
              title: link.titleOriginal,
            }
          }
        }
      }
    }
    if (i.command === 'layout') {
      if (i.value && i.value.targetFrameTable) {
        return {
          ...i,
          value: {
            ...i.value,
            targetFrameTable: i.value.targetFrameTable.map(v => {
              if (v.device && v.device.id && (v.device.id !== '__device' || v.device.id !== '__devstat')) {
                return {
                  ...v,
                  device: {
                    ...v.device,
                    id: link.did,
                    title: link.titleOriginal
                  }
                }
              }
              return v;
            }) 
          }
        }
      }
    }
    return i;
  });
}

function linkAction(action, link) {
  if (typeof action !== 'string') {
    return {
      ...action,
      left: linkCommands(action.left, link),
      right: linkCommands(action.right, link),
    };
  }
  return action;
}

function linkActions(items, link) {
  if (items.type === 'multi') {
    return Object
      .keys(items)
      .reduce((p, id) => {
        return { ...p, [id]: linkAction(items[id], link) }
      }, {})
  }
  return linkAction(items, link);
}

function lintTemplateVar(item, link) {
  if (item.value && item.value.did) {
    return {
      ...item,
      did: link.did,
      dn: link.dn,
      title: `${link.dn}.${item.value.prop}`,
      value: {
        ...item.value,
        did: link.did,
      }
    }
  }
  return item;
}

function linkTemplate(items, link) {
  return Object
    .keys(items)
    .reduce((p, id) => {
      return {
        ...p,
        [id]: lintTemplateVar(items[id], link),
      }
    }, {})
}

function linkWidgetLinks(items, link) {
  if (items.link) {
    if (items.link.dn) {
      return {
        ...items,
        link: {
          ...items.link,
          id: link.did,
          dn: link.dn,
          title: `${link.did}.${items.link.prop}`
        }
      }
    } else {
      if (items.link.id) {
        return {
          ...items,
          link: {
            ...items.link,
            id: link.did,
            title: link.titleOriginal,
          }
        }
      }
    }
  }
  return items;
}

function linkStatic(items, link) {
  if (items.did !== '__device' && items.did !== '__devstat') {
    return { 
      ...items, 
      did: link.did,
      title: `${link.title}.${items.prop}`,  
    }
  }
  return items;
}


export function linkAllProps(element, link) {
  return Object
    .keys(element)
    .reduce((p, name) => {
      return { ...p, [name]: linkProp(name, element[name], link) };
    }, {});
}