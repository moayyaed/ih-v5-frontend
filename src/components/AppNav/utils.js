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

      if (item.children !== undefined) {
        nodes(item.children);
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
        const temp2 = items.concat(c.children);
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
  let temp = null;

  function nodes(list) {
    for (let item of list) {
      if (item.id === nodeid) {
        temp = { node: item, paths };
      }
      if (temp === null && item.children !== undefined) {
        nodes(item.children);
        if (temp !== null) {
          paths[item.id] = item;
        }
      }    
      
    }
  }

  nodes(data);

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