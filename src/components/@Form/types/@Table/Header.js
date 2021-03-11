import React from 'react';
import { sortableContainer, sortableElement, sortableHandle, } from 'react-sortable-hoc';

import ButtonFilter from './ButtonFilter';


const styles = {
    dragHandle: {
    position: 'absolute',
    zIndex: 1000,
    height: '100%',
    width: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'grab',
  },
  headerContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
  },
  columnContainer: {
    display: 'flex',
    position: 'relative',
  },
}

const DragHandle = sortableHandle(() => 
  <span className="BaseTable__header-handle" style={styles.dragHandle}>::</span>);


const SortableHeader = sortableElement(({children, column, data }) => {
  return (
    <div style={styles.columnContainer}>
      <DragHandle />
      {React.cloneElement(children)}
      <ButtonFilter column={column} data={data} />
    </div>
  )
});

export const SortableHeaderRowRenderer = sortableContainer(
  ({ cells, columns, data }) => {
    return (
      <div style={styles.headerContainer}>
        {React.Children.map(cells, (column, index) => 
          <SortableHeader index={index} data={data} column={columns[index]}>
            {column}
          </SortableHeader>
        )}
      </div>
    )
  }
);


export default SortableHeaderRowRenderer;