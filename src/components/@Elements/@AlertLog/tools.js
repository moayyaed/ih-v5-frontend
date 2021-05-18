
export function getDefault(type) {
  switch(type) {
    case 'cb':
      return false;
    case 'number':
      return 0;
    case 'input':
      return '';
    case 'link':
      return '';
    case 'droplist':
      return { id: '-', title: '-' };
    default:
      return '';
  }
}

const arrayMoveMutate = (array, from, to) => {
	const startIndex = from < 0 ? array.length + from : from;

	if (startIndex >= 0 && startIndex < array.length) {
		const endIndex = to < 0 ? array.length + to : to;

		const [item] = array.splice(from, 1);
		array.splice(endIndex, 0, item);
	}
};

export const arrayMove = (array, from, to) => {
	array = [...array];
	arrayMoveMutate(array, from, to);
	return array;
};

export function createColumns(tableId, columns) {
  let cache =  [];

  try { 
    const str = window.localStorage.getItem(`table_${tableId}`);
    if (str) {
      cache = JSON.parse(str);
    }
  } catch {

  }
  const temp = cache
    .reduce((p, c, index) => {
      return { ...p, [c.prop]: { sort: index, width: c.width } };
    }, {});
    
  return columns
    .map(i => {
      if (temp[i.prop] !== undefined) {
        return { ...i, width: temp[i.prop].width }
      }
      return { ...i, width: Number(i.width)};
    })
    .sort((aa, bb) => {
      const a = temp[aa.prop] !== undefined ? temp[aa.prop].sort : 9999;
      const b = temp[bb.prop] !== undefined ? temp[bb.prop].sort : 9999;
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });
}

export function saveColumns(tableId, columns) {
  const temp = columns.map(i => ({ prop: i.prop, width: i.width }))
  try { 
    window.localStorage.setItem(`table_${tableId}`, JSON.stringify(temp));
  } catch {

  }
}

