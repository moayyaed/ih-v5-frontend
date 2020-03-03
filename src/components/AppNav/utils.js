export function getNodesRange(data, a, b) {
  const temp = {}
  let start = false;

  function nodes(list) {
    for (let item of list) {
      if (item.id === a) {
        start = true;
      }
      if (item.id === b) {
        start = true;
      }
      if (start) {
        temp[item.id] = item;
      }
      if (item.id === b) {
        start = false;
        // break;
      }
      if (item.children !== undefined) {
        nodes(item.children);
      }      
    }
  }

  nodes(data);

  return temp;
}