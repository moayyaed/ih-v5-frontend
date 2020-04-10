import React, { Component } from 'react';
import core from 'core';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import DragHandleIcon from '@material-ui/icons/DragHandle';

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
    textAlign: 'center',
    width: 25,
    height: 25,
    cursor: 'pointer',
  },
  toolbarColumn: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    backgroundColor: '#616161',
    cursor: 'pointer',
    color: '#fff',
  },
  toolbarColumnIcon: {
    width: 20,
    height: 20,
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
      />
      <div 
        style={styles.toolbarSectionButton} 
        className={css.toolbarSectionButton} 
        onClick={(e) => props.onClick(e, 'b2', props.sectionId)}
      > 
        <DragHandleIcon />  
      </div>
      <div 
        style={styles.toolbarSectionButton} 
        className={css.toolbarSectionButton} 
      />
    </div>
  );
}

function Section(props) {
  const active = props.isDragging ? false : props.item.hover || props.select.section === props.id;
  return (
    <div 
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      style={{ 
        ...styles.section, 
        ...props.provided.draggableProps.style, 
        height: props.item.height 
      }} 
      onMouseLeave={() => props.onHoverOut(props.id)}
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
                      key={id}
                      id={id}
                      provided={provided}
                      select={props.select.column}
                      sectionId={props.id} 
                      item={props.columns[id]}
                      isDragging={props.isDragging || snapshot1.isDraggingOver}
                      onHoverEnter={props.onHoverEnter}
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
  const active = props.isDragging ? false : props.item.hover || props.select === props.id;
  return (
    <div
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      style={{ 
        ...styles.column,
        ...props.provided.draggableProps.style,
        border: active ? '1px dashed #6d7882' : '1px dashed transparent',
      }} 
      onMouseEnter={() => props.onHoverEnter(props.sectionId, props.id)}
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
      .hoverSection(
        this.props.id, this.props.prop, 
        sectionId, columnId, true
      )
  }

  handleHoverOut = (sectionId) => {
    core.actions.layout
      .hoverSection(
        this.props.id, this.props.prop, 
        sectionId, false
      )
  }

  handleClickToolbar = (e, button, value) => {
    e.preventDefault();
    e.stopPropagation();

    if (button === 'b2') {
      this.handleClickSection(value);
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

  handleClickColumn = (columnId) => {
    core.actions.layout
      .select(
        this.props.id, this.props.prop, 
        { column: columnId, section: null },
      )
  }

  handleDragEnd = (result) => {
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

  render() {
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="droppable" type="section">
        {(provided, snapshot1) => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={styles.root}
          >
            {this.props.list
              .map((id, index) =>
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot2) => (
                    <Section 
                      key={id} 
                      id={id}
                      provided={provided}
                      select={this.props.select}
                      item={this.props.sections[id]}
                      columns={this.props.columns}
                      isDragging={snapshot1.isDraggingOver}
                      onClickToolbar={this.handleClickToolbar}
                      onHoverEnter={this.handleHoverEnter}
                      onHoverOut={this.handleHoverOut}
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