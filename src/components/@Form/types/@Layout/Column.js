import React, { PureComponent } from 'react';

import DragHandleIcon from '@material-ui/icons/DragHandle';
import SizeControl from './SizeControl';

const styles = {
  column: {
    position: 'relative',
    height: '100%',
    width: '100%',
    padding: 10,
    flexShrink: 0,
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
}

function getStyle(direction, size, active, drag) {
  if (direction === 'row') {
    return {
      width: `${size}%`,
      border: active ? '1px dashed #6d7882' : drag ? '1px solid #3eaaf5' : '1px dashed transparent',
    }
  }
  return {
    height: `${size}%`,
    border: active ? '1px dashed #6d7882' : drag ? '1px solid #3eaaf5' : '1px dashed transparent',
  }
}


function ToolbarColumn(props) {
  return (
    <div
      {...props.dragHandleProps}
      style={{ ...styles.toolbarColumn, display: props.enabled ? 'block' : 'none'}}
      className="columntoolbar"
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
        ...getStyle(props.direction, props.item.size, active, drag),
        ...props.provided.draggableProps.style,
      }}
      className="column"
      onClick={e => props.onClickColumn(e)}
      onContextMenu={e => props.onContextMenu(e, props.direction, props.sectionId, props.id)}
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
        <SizeControl
          type={props.direction}
          disabled={props.disabledSizeControl}
          onStop={props.onResizeColumn}
        />
      <div 
        style={{ 
          ...styles.columnBody,
          border: props.item.type ? active ? '1px solid #3eaaf5' : '1px dashed transparent' : '1px dashed #d5dadf', 
          backgroundColor: drag ? 'rgba(62, 170, 245, 0.3)' : 'unset',
        }}
      >
        {props.onRenderContent(props.id, props.item)}
      </div>
    </div>
  );
}


export default Column;