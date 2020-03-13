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

export function findNode(data, nodeid) {
  const paths = {};
  let count = 0;
  let countAll = 0;
  let temp = null;

  function nodes(list) {
    list.forEach((item, key) => {
      if (item.id === nodeid) {
        count = count + key + 1;
        temp = { node: item, paths };
      }
      if(temp !== null) {
        countAll = countAll + 1;
      }
      if (temp === null && item.children !== undefined) {
        nodes(item.children);
        if (temp !== null) {
          count = count + key + 1;
          paths[item.id] = item;
        }
      }    
    });
  }

  nodes(data);

  if (temp) {
    temp.scrollPoint = (count - 1) * 21 + 5;
    temp.windowHeight = (count - 1 + countAll) * 21 + 5;
  }

  return temp;
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

