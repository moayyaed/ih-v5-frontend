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


const SortableHeader = sortableElement(({children, column, filters, originData, data, onFilter }) => {
  return (
    <div style={styles.columnContainer}>
      <DragHandle />
      {React.cloneElement(children, { className: column.filter ? 'BaseTable__header-cell .filter' : 'BaseTable__header-cell' })}
      {column.filter ? <ButtonFilter onFilter={onFilter} column={column} filters={filters} originData={originData} data={data} /> : null}
    </div>
  )
});

export const SortableHeaderRowRenderer = sortableContainer(
  ({ cells, columns, filters, originData, data, onFilter }) => {
    return (
      <div style={styles.headerContainer}>
        {React.Children.map(cells, (column, index) => 
          <SortableHeader onFilter={onFilter} index={index} filters={filters} originData={originData} data={data} column={columns[index]}>
            {column}
          </SortableHeader>
        )}
      </div>
    )
  }
);


export default SortableHeaderRowRenderer;