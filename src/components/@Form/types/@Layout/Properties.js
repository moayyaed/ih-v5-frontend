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

const BUTTONS = [ 'TEXT', 'IMAGE', 'SECTION'];


class Properties extends PureComponent {

  handleDragStart = (e, id) => {
    e.dataTransfer.setData('text', id);
    core.actions.layout
      .data(this.props.id, this.props.prop, { isDraggingToolbar: true });
  }

  handleDragEnd = () => {
    core.actions.layout
      .data(this.props.id, this.props.prop, {
        isDraggingToolbar: false, 
        drag: { section: null, column: null }  
      });
  }
  
  render() {
    return (
      <div style={styles.root} >
        {BUTTONS.map(id =>
          <div 
            draggable 
            key={id} 
            style={styles.button} 
            onDragStart={(e) => this.handleDragStart(e, id)} 
            onDragEnd={this.handleDragEnd}
          >
            {id}
          </div>
        )}
      </div>

    );
  }
}


export default Properties;