import React from 'react';
import { sortableContainer, sortableElement, sortableHandle, } from 'react-sortable-hoc';

import styled, { keyframes } from 'styled-components';

const styles = {
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
}


const DragHandle = sortableHandle(() => 
  <span className="BaseTable__header-handle" style={styles.dragHandle}>::</span>);

const SortableHeader = sortableElement(({children, column }) => {
  return (
    <div style={styles.columnContainer}>
      <DragHandle />
      {children}
    </div>
  )
});

export const SortableHeaderRowRenderer = sortableContainer(
  ({ cells, columns }) => {
    return (
      <div style={styles.headerContainer}>
        {React.Children.map(cells, (column, index) => 
          <SortableHeader index={index} column={columns[index]}>
            {column}
          </SortableHeader>
        )}
      </div>
    )
  }
);

export const Empty = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  display: inline-block;
  border-radius: 100%;
  margin: 2px;
  border: 2px solid #0696d7;
  border-bottom-color: transparent;
  margin: 2px;
  width: ${props => (props.small ? 12 : 22)}px;
  height: ${props => (props.small ? 12 : 22)}px;
  animation: ${rotate} 0.75s linear infinite;
`

export const LoadingLayer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0;
  width: 100%;
  height: 100%;
`

export const LoadingMoreLayer = styled.div`
  pointer-events: none;
  background: rgba(32, 60, 94, 0.3);
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
`

export const LoadingMoreText = styled.span`
  color: #fff;
  margin-right: 5px;
`