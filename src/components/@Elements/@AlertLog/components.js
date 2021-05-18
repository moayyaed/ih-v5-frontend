import React from 'react';

import Text from './Text';
import Button from './Button';



const Cell = cellProps => {
  const type = cellProps.columns[cellProps.columnIndex].type;
  const row = cellProps.rowData;
  const column = cellProps.column;

  if (column.dataKey === 'rowbutton') {
    return React.createElement(Button, cellProps);
  }

  return React.createElement(Text, cellProps);
}

const components = {
  TableCell: Cell,
}


export default components;