import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import DragHandleIcon from '@material-ui/icons/DragHandle';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Column from './Column';

import css from './main.module.css';

const styles = {
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


function ToolbarSection(props) {
  return (
    <div
      {...props.dragHandleProps}
      style={{
        ...styles.toolbarSection,
        display: props.enabled ? 'flex' : 'none',
      }}
    >
      <div 
        style={styles.toolbarSectionButton} 
        className={css.toolbarSectionButton}
        onClick={(e) => props.onClick(e, 'b1', props.sectionId)} 
      >
        <AddIcon style={styles.toolbarSectionIcon} />
      </div>
      <div 
        style={styles.toolbarSectionButton} 
        className={css.toolbarSectionButton} 
        onClick={(e) => props.onClick(e, 'b2', props.sectionId)}
      > 
        <DragHandleIcon style={styles.toolbarSectionIcon} />  
      </div>
      <div 
        style={styles.toolbarSectionButton} 
        className={css.toolbarSectionButton}
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
  return (
    <div
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
          enabled={active} 
          sectionId={props.id}
          dragHandleProps={props.provided.dragHandleProps} 
          onClick={props.onClickToolbar} 
        />
        <Droppable droppableId={props.id} direction="horizontal" type={props.id} >
          {(provided, snapshot1) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef} 
              style={{ 
                ...styles.sectionBody, 
                outline: active ? '1px solid #3eaaf5' : 'unset' 
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
                        isDraggingGlobal={props.isDraggingGlobal}
                        isDragging={props.isDragging || snapshot1.isDraggingOver}
                        isPreview={snapshot2.isDragging}
                        onHoverEnter={props.onHoverEnter}
                        onDragEnter={props.onDragEnter}
                        onDragDrop={props.onDragDrop}
                        onClickToolbar={props.onClickToolbar}
                        onClickColumn={props.onClickColumn}
                        onContextMenu={props.onContextMenu}
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