export function getFirstChild(data) {

  let temp = null;

  function check(item) {
    if (temp === null) {
      temp = item;
    }
  }

  function nodes(list) {
    list.forEach(i => {
      if (i.children !== undefined) {
        nodes(i.children)
      } else {
        check(i);
      }
    });
  }

  nodes(data);

  return temp;
}

export function getNodesRange(data, a, b) {
  const temp = {}


  let starta = false;
  let startb = false;

  function nodes(list) {
    for (let item of list) {
      if (startb === false && item.id === a) {
        starta = true;
      }
      if (starta === false && item.id === b) {
        startb = true;
      }

      if (starta || startb) {
        temp[item.id] = item;
      }

      if (item.children !== undefined && item.expanded) {
        if (starta === false && startb === false) {
          nodes(item.children);
        } else {
          if (starta && b !== item.id) {
            nodes(item.children);
          }
          if (startb) {
            nodes(item.children);
          }
        }
      }    
      
      if (starta && item.id === b) {
        starta = false;
      }
      if (startb && item.id === a) {
        startb = false;
      }  
    }
  }

  nodes(data);

  return temp;
}

export function insertNodes(data, node, items) {
  const temp = data.reduce((p, c) => {
    if (c.id === node.id) {
      if (c.children !== undefined) {
        const temp2 = c.children.concat(items);
        return p.concat({ ...c, expanded: true, children: insertNodes(temp2, node, items) });
      }
      return p.concat(c, items);
    }
    if (c.children !== undefined) {
      return p.concat({ ...c, children: insertNodes(c.children, node, items) });
    }
    return p.concat(c);
  }, []);
  return temp;
}

export function insertNodes2(data, node, items) {
  const temp = data.reduce((p, c) => {
    if (c.id === node.id) {
      if (c.children !== undefined) {
        const temp2 = c.children.concat(items);
        return p.concat({ ...c, children: insertNodes2(temp2, node, items) });
      }
      return p.concat(c, items);
    }
    if (c.children !== undefined) {
      return p.concat({ ...c, children: insertNodes2(c.children, node, items) });
    }
    return p.concat(c);
  }, []);
  return temp;
}

export function findNode(data, nodeid, parentOpen) {
  const paths = {};
  let find = null;
  let count = 0;
  let countAll = 0;

  function nodes(list, parentid, parentOpen) {
    list.forEach((item, key) => {
      if (find === null) {
        count = count + 1;
        countAll = countAll + 1;
      } else {
        if (parentid === 'root' || paths[parentid] || parentOpen) {
          countAll = countAll + 1;
        }
      }

      if (item.id === nodeid) {
        find = item;
      }

      if (item.children !== undefined) {
        if (find === null) {
          paths[item.id] = item;
        }
        nodes(item.children, item.id, item.expanded);
        if (find === null) {
          if (!item.expanded) {
            count = count - item.children.length;
            countAll = countAll - item.children.length
          }
          delete paths[item.id];
        }
      }
    });
  }
  nodes(data, 'root', false);
  if (find) {
   find.paths = paths;
   find.scrollPoint = (count - 1) * 21 + 5;
   find.windowHeight = countAll * 21 + 5; 
  }
  
  return find;
}

export function editNodes(data, func) {
  const temp = data.reduce((p, c) => {
    if (c.children !== undefined) {
      return p.concat({ ...func(c), children: editNodes(c.children, func) });
    }
    return p.concat(func(c));
  }, []);
  return temp;
}

export function editNodes2(data, paths) {
  data.forEach(item => {
    if (item.children) {
      if (paths[item.id]) {
        item.expanded = true;
      }
      editNodes2(item.children, paths)
    } else {
      if (paths[item.id]) {
        item.expanded = true;
      }
    }
  });
  return data;
}

export function getOrder(parent, node) {
  if (node.children !== undefined) {
    if (parent.children.length) {
      return parent.children[parent.children.length - 1].order + 1000;
    }
    return 1000;
  } else {
    if (parent.children.length) {
      let order = 0;
      parent.children.forEach((item, key) => {
        if (item.id === node.id) {
          if (key === parent.children.length - 1 ) {
            order = parent.children[parent.children.length - 1].order + 1000;
          } else {
            order = (parent.children[key].order + parent.children[key + 1].order) / 2;
          }
        }
      });
      return Math.round(order);
    }
    return 1000;
  }
}

export function getOrderMove(parent, node) {
  if (parent.children.length > 1) {
    let order = 0;
    parent.children.forEach((item, key) => {
      if (item.id === node.id) {
        if (key === 0) {
          order = parent.children[1].order / 2;
        } else if (key === parent.children.length - 1) {
          order = parent.children[parent.children.length - 2].order + 1000;
        } else {
          order = (parent.children[key - 1].order + parent.children[key + 1].order) / 2;
        }
      }
    });
    return Math.round(order);
  }
  return 1000 ;
}

export function getPrevNode(parent, node) {
  if (parent.children.length > 1) {
    let id = '_top';
    parent.children.forEach((item, key) => {
      if (item.id === node.id) {
        if (key === 0) {
          id = '_top';
        } else if (key === parent.children.length - 1) {
          id = parent.children[parent.children.length - 2].id;
        } else {
          id = parent.children[key - 1].id;
        }
      }
    });
    return id;
  }
  return '_top' ;
}

function structTree(check, roots, data, a, b) {
  const temp = {
    map: {},
    list: {},
  }
  
  let starta = false;
  let startb = false;

  function nodes(list, root, childs) {
    for (let item of list) {
      if (startb === false && item.id === a) {
        starta = true;
      }
      if (starta === false && item.id === b) {
        startb = true;
      }
      if (check === false ? (starta || startb) : childs && (starta || startb)) {
        temp.list[item.id] = item;

        if (temp.map[root] === undefined) {
          temp.map[root] = {};
        }

        if (check) {
          if (temp.map[root]['seq'] === undefined) {
            temp.map[root]['seq'] = [];
          }
          temp.map[root]['seq'].push(item.id);
        }

        if (item.children !== undefined) {
          if (temp.map[root]['folders'] === undefined) {
            temp.map[root]['folders'] = [];
          }
          temp.map[root]['folders'].push({ nodeid: item.id });
        } else {
          if (temp.map[root]['nodes'] === undefined) {
            temp.map[root]['nodes'] = [];
          }
          temp.map[root]['nodes'].push({ nodeid: item.id });
        }
      }

      if (item.children !== undefined) {
        nodes(item.children, root, childs && !(starta || startb));
      }    
      
      if (starta && item.id === b) {
        starta = false;
      }
      if (startb && item.id === a) {
        startb = false;
      }  
    }
  }

  data.forEach(item => {
    nodes(item.children, roots[item.id], true);
  });
  return temp;
}

function structSelects(check, roots, data, selects) {
  const temp = {
    map: {},
    list: {},
  }
 

  function nodes(list, root, childs) {
    for (let item of list) {
      if (check === false ? selects[item.id] : childs && selects[item.id]) {
        temp.list[item.id] = item;

        if (temp.map[root] === undefined) {
          temp.map[root] = {};
        }

        if (check) {
          if (temp.map[root]['seq'] === undefined) {
            temp.map[root]['seq'] = [];
          }
          temp.map[root]['seq'].push(item.id);
        }

        if (item.children !== undefined) {
          if (temp.map[root]['folders'] === undefined) {
            temp.map[root]['folders'] = [];
          }
          temp.map[root]['folders'].push({ nodeid: item.id });
        } else {
          if (temp.map[root]['nodes'] === undefined) {
            temp.map[root]['nodes'] = [];
          }
          temp.map[root]['nodes'].push({ nodeid: item.id });
        }
      }
      if (item.children !== undefined) {
        nodes(item.children, root, childs && !selects[item.id]);
      }    
    }
  }

  data.forEach(item => {
    nodes(item.children, roots[item.id], true);
  });
  return temp;
}

export function structToMap(check, roots, data, a, b) {
  if (b) {
    return structTree(check, roots, data, a, b);
  }
  return structSelects(check, roots, data, a);
}

export function removeNodes(data, list) {
  const temp = data.reduce((p, c) => {
    if (list[c.id]) {
      return p;
    }
    if (c.children !== undefined) {
      return p.concat({ ...c, children: removeNodes(c.children, list) });
    }
    return p.concat(c);
  }, []);
  return temp;
}

