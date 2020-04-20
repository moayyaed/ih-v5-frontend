import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import DragHandleIcon from '@material-ui/icons/DragHandle';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Column from './Column';

import css from './main.module.css';

const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
  section: {
    position: 'relative',
    width: '100%',
    marginTop: 1,
    marginBottom: 1,
  },
  sectionBody: {
    display: 'flex',
    width: '100%',
    height: '100%',
    // outline: '1px dashed #6d7882',
    // border: '1px solid #3eaaf5',
  },
  toolbarSection: {
    color: '#fff',
    display: 'flex',
    position: 'absolute',
    width: 75,
    height: 25,
    boxShadow: '0 -2px 8px rgba(0,0,0,.05)',
    backgroundColor: '#03A9F4',
    top: -26,
    left: 'calc(50% - 37.5px)',
  },
  toolbarSectionInner: {
    color: '#fff',
    display: 'flex',
    position: 'absolute',
    width: 50,
    height: 25,
    boxShadow: '0 -2px 8px rgba(0,0,0,.05)',
    backgroundColor: '#F57C00',
    top: -26,
    left: 'calc(50% - 25px)',
  },
  toolbarSectionButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    cursor: 'pointer',
  },
  toolbarSectionIcon: {
    width: 16,
    height: 16,
  },
}

function getToolbarStyle(inner, enabled) {
  if (inner) {
    return {
      ...styles.toolbarSectionInner,
      display: enabled ? 'flex' : 'none',
    }
  }
  return {
    ...styles.toolbarSection,
    display: enabled ? 'flex' : 'none',
  }
}

function ToolbarSection(props) {
  const color = props.inner ? '#F57C00' : '#3eaaf5'; 
  return (
    <div
      {...props.dragHandleProps}
      style={getToolbarStyle(props.inner, props.enabled)}
    >
      {props.inner ? null : <div 
        style={styles.toolbarSectionButton} 
        className={css.toolbarSectionButton}
        onClick={(e) => props.onClick(e, 'b1', props.sectionId)} 
      >
        <AddIcon style={styles.toolbarSectionIcon} />
      </div>}
      <div 
        style={styles.toolbarSectionButton} 
        className={props.inner ? css.toolbarSectionButtonInner : css.toolbarSectionButton}
        onClick={(e) => props.onClick(e, 'b2', props.sectionId)}
      > 
        <DragHandleIcon style={styles.toolbarSectionIcon} />  
      </div>
      <div 
        style={styles.toolbarSectionButton} 
        className={props.inner ? css.toolbarSectionButtonInner : css.toolbarSectionButton}
        onClick={(e) => props.onClick(e, 'b3', props.sectionId)} 
      >
        <RemoveIcon style={styles.toolbarSectionIcon} />
      </div>
    </div>
  );
}

function Section(props) {
  const select = props.select.section === props.id;
  const hover = props.hover.section === props.id;
  const drag = props.drag.section === props.id;
  const active = props.isDragging ? props.isPreview : hover || select;
  const color = props.inner ? '#F57C00' : '#3eaaf5'; 
  return (
    <div
      style={styles.root}
      onDragLeave={(e) => props.onDragOut(e)} 
      onMouseLeave={(e) => props.isDragging || props.isDraggingGlobal || props.onHoverOut(e)}
    >
      <div 
        {...props.provided.draggableProps}
        ref={props.provided.innerRef}
        style={{ 
          ...styles.section, 
          ...props.provided.draggableProps.style, 
          height: props.item.height 
        }}
      >
        <ToolbarSection
          inner={props.inner}
          enabled={active} 
          sectionId={props.id}
          dragHandleProps={props.provided.dragHandleProps} 
          onClick={props.onClickToolbar} 
        />
        <Droppable 
          droppableId={props.id} 
          direction={props.item.direction === 'row' ? 'horizontal' : 'vertical'} 
          type={props.id}
        >
          {(provided, snapshot1) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef} 
              style={{ 
                ...styles.sectionBody,
                flexDirection: props.item.direction, 
                outline: active ? `1px solid ${color}` : 'unset' 
              }}
            >
              {props.item.columns
                .map((id, index) =>
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot2) => (
                      <Column 
                        id={id}
                        sectionId={props.id} 
                        provided={provided}
                        select={props.select.column}
                        hover={props.hover.column}
                        drag={props.drag.column}
                        item={props.columns[id]}
                        direction={props.item.direction}
                        disabledSizeControl={index === props.item.columns.length - 1}
                        isDraggingGlobal={props.isDraggingGlobal}
                        isDragging={props.isDragging || snapshot1.isDraggingOver}
                        isPreview={snapshot2.isDragging}
                        onHoverEnter={props.onHoverEnter}
                        onDragEnter={props.onDragEnter}
                        onDragDrop={props.onDragDrop}
                        onClickToolbar={props.onClickToolbar}
                        onClickColumn={props.onClickColumn}
                        onContextMenu={props.onContextMenu}
                        onResizeColumn={props.onResizeColumn}
                        onRenderContent={props.onRenderContent}
                      />
                    )}
                  </Draggable>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}


export default Section;