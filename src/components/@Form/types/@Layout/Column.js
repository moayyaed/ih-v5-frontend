import React from 'react';

import Draggable from 'react-draggable';
import DragHandleIcon from '@material-ui/icons/DragHandle';


const styles = {
  column: {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  columnBody: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarColumn: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 18,
    height: 18,
    backgroundColor: '#616161',
    cursor: 'pointer',
    color: '#fff',
  },
  toolbarColumnIcon: {
    width: 18,
    height: 18,
  },
  resize: {
    position: 'absolute',
    width: 5,
    height: '100%',
    top: 0,
    right: -3,
    cursor: 'col-resize',
    zIndex: 1000,
    background: '#9e9e9e20',
  }
}


function ToolbarColumn(props) {
  return (
    <div
      {...props.dragHandleProps}
      style={{ ...styles.toolbarColumn, display: props.enabled ? 'block' : 'none'}}
      onClick={(e) => props.onClick(e, 'b4', props.columnId)}
    >
      <DragHandleIcon style={styles.toolbarColumnIcon} />
    </div>
  );
}

function Column(props) {
  const select = props.select === props.id;
  const hover = props.hover === props.id;
  const drag = props.drag === props.id;
  const active = props.isDragging ? props.isPreview : hover || select;
  return (
    <div
      {...props.provided.draggableProps}
      ref={props.provided.innerRef}
      sectionid={props.sectionId}
      columnid={props.id}
      style={{ 
        ...styles.column,
        ...props.provided.draggableProps.style,
        border: active ? '1px dashed #6d7882' : drag ? '1px solid #3eaaf5' : '1px dashed transparent',
      }}
      onClick={e => props.onClickColumn(e)}
      onContextMenu={e => props.onContextMenu(e, props.sectionId, props.id)}
      onDragEnter={() => props.onDragEnter(props.item.type === null && props.sectionId, props.item.type === null && props.id)}
      onDrop={(e) => props.item.type === null && props.onDragDrop(e, props.sectionId, props.id)}
      onMouseEnter={() => props.isDragging || props.isDraggingGlobal || props.onHoverEnter(props.sectionId, props.id)}
    >
      <ToolbarColumn 
        enabled={active} 
        columnId={props.id}
        onClick={props.onClickToolbar}
        dragHandleProps={props.provided.dragHandleProps}
      />
        <Draggable 
          axis='x'
          position={{ x:0, y: 0 }}
          onDrag={(e, data) => props.onResizeColumn(e, data)}
          onStop={(e, data) => props.onResizeColumn(e, data)}
        >
          <div style={styles.resize} />
        </Draggable>
      <div 
        style={{ 
          ...styles.columnBody,
          border: props.item.type ? active ? '1px solid #3eaaf5' : '1px dashed transparent' : '1px dashed #d5dadf', 
          backgroundColor: drag ? 'rgba(62, 170, 245, 0.3)' : 'unset',
        }}
      >
        <div>{props.id}</div>
        <div>{props.item.type}</div>
      </div>
    </div>
  );
}


export default Column;