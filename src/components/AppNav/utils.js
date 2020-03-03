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
      
      if (starta && item.id === b) {
        starta = false;
      }
      if (startb && item.id === a) {
        startb = false;
      }
      if (item.children !== undefined) {
        nodes(item.children);
      }      
    }
  }

  nodes(data);

  return temp;
}