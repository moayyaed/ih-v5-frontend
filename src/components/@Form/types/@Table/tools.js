import { SystemUpdateAltRounded } from "@material-ui/icons";

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

  return columns;
}

