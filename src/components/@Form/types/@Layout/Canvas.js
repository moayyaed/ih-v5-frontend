import React, { Component } from 'react';
import core from 'core';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import DragHandleIcon from '@material-ui/icons/DragHandle';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import css from './main.module.css';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 15px',
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
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed #d5dadf',
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
  toolbarSectionIcon: {
    width: 16,
    height: 16,
  },
  toolbarColumnIcon: {
    width: 18,
    height: 18,
  }
}

function moveTo(list, index, id) {
  const result = Array.from(list);
  result.splice(index, 0, id);

  return result;
}

function removeTo(list, index) {
  const result = Array.from(list);
  result.splice(index, 1)

  return result;
}

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
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
    <div onMouseLeave={(e) => props.isDragging || props.isDraggingGlobal || props.onHoverOut(e)}>
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
                        onClickToolbar={props.onClickToolbar}
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
        border: active ? '1px dashed #6d7882' : '1px dashed transparent',
      }}
      onDragEnter={() => props.onDragEnter(props.sectionId, props.id)}
      onMouseEnter={() => props.isDragging || props.isDraggingGlobal || props.onHoverEnter(props.sectionId, props.id)}
    >
      <ToolbarColumn 
        enabled={active} 
        columnId={props.id}
        onClick={props.onClickToolbar}
        dragHandleProps={props.provided.dragHandleProps}
      />
      <div style={styles.columnBody}>
        {props.id}
      </div>
    </div>
  );
}


class Canvas extends Component {

  handleHoverEnter = (sectionId, columnId) => {
    core.actions.layout
      .hover(
        this.props.id, this.props.prop, 
        { section: sectionId, column: columnId }
      )
  }

  handleHoverOut = (e) => {
    if (
        this.props.hover.section !== null &&
        this.props.hover.column !== null &&
        e.relatedTarget.className === "canvas"
      ) {
        core.actions.layout
          .hover(
            this.props.id, this.props.prop, 
            { section: null, column: null }
          )
      }

  }

  handleClickToolbar = (e, button, value) => {
    e.preventDefault();
    e.stopPropagation();

    if (button === 'b2') {
      this.handleClickSection(value);
    }
    if (button === 'b3') {
      this.handleRemoveSection(e, value);
    }
    if (button === 'b4') {
      this.handleClickColumn(value);
    }
  }

  handleClickSection = (sectionId) => {
    core.actions.layout
      .select(
        this.props.id, this.props.prop, 
        { section: sectionId, column: null },
      )
  }

  handleRemoveSection = (e, sectionId) => {
    core.actions.layout
      .removeSection(
        this.props.id, this.props.prop, 
        sectionId,
      );
    
      if (e) {
        const elements = window.document.elementsFromPoint(e.clientX, e.clientY);
        elements.forEach(i => {
          const sectionid = i.getAttribute('sectionid');
          const columnid = i.getAttribute('columnid');
          
          if (sectionid && sectionid !== '' && columnid && columnid !== '') {
            this.handleHoverEnter(sectionid, columnid);
          }
        });
      }
  }

  handleClickColumn = (columnId) => {
    core.actions.layout
      .select(
        this.props.id, this.props.prop, 
        { column: columnId, section: null },
      )
  }

  handleDragStart = (result) => {
    core.actions.layout
      .data(this.props.id, this.props.prop, { isDragging: true });

    if (result.type === 'section') {
      core.actions.layout
      .hover(
        this.props.id, this.props.prop, 
        { section: result.draggableId, column: null }
      )
    }
  }

  handleDragEnd = (result) => {
    core.actions.layout
      .data(this.props.id, this.props.prop, { isDragging: false });

    if (!result.destination) {
      return;
    }

    if (result.type === 'section') {
      this.handleDragEndSection(result)
    } else {
      this.handleDragEndColumn(result)
    }
  }

  handleDragEndSection = (result) => {
    const list = reorder(
      this.props.list,
      result.source.index,
      result.destination.index
    );

    core.actions.layout
      .data(
        this.props.id, this.props.prop, 
        { list },
      )
  }

  handleDragEndColumn = (result) => {
    const sourceSectionId = result.source.droppableId;
    const targetSectionId = result.destination.droppableId;


    if (sourceSectionId !== targetSectionId) {
      const sourceColumns = removeTo(
        this.props.sections[sourceSectionId].columns,
        result.source.index,
      );
      const targetColumns = moveTo(
        this.props.sections[targetSectionId].columns,
        result.destination.index,
        result.draggableId,
      );

      core.actions.layout
        .moveColumn(
          this.props.id, this.props.prop, 
          sourceSectionId, targetSectionId, sourceColumns, targetColumns,
        )
    } else {
      const columns = reorder(
        this.props.sections[targetSectionId].columns,
        result.source.index,
        result.destination.index
      );

      core.actions.layout
        .editSection(
          this.props.id, this.props.prop, 
          targetSectionId, { columns },
        )
    }
  }

  handleDragEnter = (sectionId, columnId) => {
    /* core.actions.layout
      .editSection(
        this.props.id, this.props.prop, 
        targetSectionId, { columns },
      ) */
  }

  render() {
    return (
      <DragDropContext onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="droppable" type="section" >
        {(provided, snapshot1) => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={styles.root}
            className="canvas"
          >
            {this.props.list
              .map((id, index) =>
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot2) => (
                    <Section 
                      id={id}
                      provided={provided}
                      select={this.props.select}
                      hover={this.props.hover}
                      drag={this.props.drag}
                      item={this.props.sections[id]}
                      columns={this.props.columns}
                      isDraggingGlobal={this.props.isDragging}
                      isDragging={snapshot1.isDraggingOver}
                      isPreview={snapshot2.isDragging}
                      onClickToolbar={this.handleClickToolbar}
                      onHoverEnter={this.handleHoverEnter}
                      onHoverOut={this.handleHoverOut}
                      onDragEnter={this.handleDragEnter}
                    />
                  )}
                </Draggable>
            )}
            {provided.placeholder}
          </div>
        )}
        </Droppable>
      </DragDropContext>
    );
  }

}


export default Canvas;