import React, { PureComponent } from 'react';
import core from 'core';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    border: '2px dashed #9E9E9E',
    textAlign: 'center',
    margin: '10px 5px',
    width: 100,
  }
}

const BUTTONS = [ 'TEXT', 'IMAGE'];


class Properties extends PureComponent {

  handleDragStart = () => {

  }

  handleDragEnd = () => {

  }
  
  render() {
    return (
      <DragDropContext onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="droppable" type="test">
          {(provided, snapshot1) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={styles.root}
            >
              {BUTTONS.map((id, index) =>
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot2) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={{ ...styles.button, ...provided.draggableProps.style }}
                    >
                      {id}
                    </div>
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


export default Properties;