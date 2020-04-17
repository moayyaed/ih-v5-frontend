import React, { PureComponent } from 'react';

import Draggable from 'react-draggable';
import DragHandleIcon from '@material-ui/icons/DragHandle';


const styles = {
  column: {
    position: 'relative',
    height: '100%',
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
  resize: {
    position: 'absolute',
    width: 5,
    height: '100%',
    top: 0,
    right: -3,
    cursor: 'col-resize',
    zIndex: 1000,
    /// background: '#9e9e9e20',
  }
}


class SizeControl extends PureComponent {

  handleDragStart = (e) => {
    e.preventDefault();
  
    window.addEventListener('mouseup', this.handleDragStop, true);
    window.addEventListener('mousemove', this.handleDragMove, true);
    document.body.style.cursor = 'col-resize';
  
  }
  
  handleDragMove = (e) => {
    const { 
      targetPercent, 
      nextElementPercent, 
    } = this.getSize(this.link, e.movementX, e.movementY);

    const target = this.link.parentNode;
    const nextElement = target.nextElementSibling;

    target.style.width = targetPercent + '%';
    nextElement.style.width = nextElementPercent + '%';
  }
  
  handleDragStop = (e) => {
    window.removeEventListener('mousemove', this.handleDragMove, true);
    window.removeEventListener('mouseup', this.handleDragStop, true);
    document.body.style.cursor = 'auto';

    const target = this.link.parentNode;
    const nextElement = target.nextElementSibling;

    const targetId = target.getAttribute('columnid');
    const nextElementId = nextElement.getAttribute('columnid');

    const { 
      targetPercent, 
      nextElementPercent, 
    } = this.getSize(this.link, e.movementX, e.movementY);

    this.props.onStop(targetId, targetPercent, nextElementId, nextElementPercent)
  }

  getSize = (node, x, y) => {
    const parent = node.parentNode.parentNode;
    const target = node.parentNode;
    const nextElement = target.nextElementSibling;

    let targetWidth = target.offsetWidth + x;
    let nextElementWidth = nextElement.offsetWidth - x;

    const tpl = Number(target.style.paddingLeft.slice(0,target.style.paddingLeft.length - 2));
    const tpr = Number(target.style.paddingRight.slice(0,target.style.paddingRight.length - 2));
    const tbl = Number(target.style.borderLeftWidth.slice(0,target.style.borderLeftWidth.length - 2));
    const tbr = Number(target.style.borderRightWidth.slice(0,target.style.borderRightWidth.length - 2));

    const npl = Number(nextElement.style.paddingLeft.slice(0,nextElement.style.paddingLeft.length - 2));
    const npr = Number(nextElement.style.paddingRight.slice(0,nextElement.style.paddingRight.length - 2));
    const nbl = Number(nextElement.style.borderLeftWidth.slice(0,nextElement.style.borderLeftWidth.length - 2));
    const nbr = Number(nextElement.style.borderRightWidth.slice(0,nextElement.style.borderRightWidth.length - 2));

    if (tpl + tpr + tbl + tbr > targetWidth) {
      targetWidth = target.offsetWidth;
      nextElementWidth = nextElement.offsetWidth;
    }

    if (npl + npr + nbl + nbr > nextElementWidth) {
      targetWidth = target.offsetWidth;
      nextElementWidth = nextElement.offsetWidth;
    }

    const targetPercent = (targetWidth / (parent.offsetWidth / 100)).toFixed(2);
    const nextElementPercent = (nextElementWidth / (parent.offsetWidth / 100)).toFixed(2);

    return { targetPercent, nextElementPercent };
  }

  linked = (e) => {
    this.link = e;
  }

  render() {
    return (
      <div
        ref={this.linked} 
        style={styles.resize}
        onMouseDown={this.handleDragStart}
      />
    );
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
        width: `${props.item.width}%`,
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
        <SizeControl 
          onStop={props.onResizeColumn}
        />
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