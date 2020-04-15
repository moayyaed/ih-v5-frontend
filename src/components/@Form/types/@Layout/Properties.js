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

  handleDragStart = (e) => {
    e.dataTransfer.setData('text', '1');
    core.actions.layout
      .data(this.props.id, this.props.prop, { isDraggingToolbar: true });
  }

  handleDragEnd = () => {
    core.actions.layout
      .data(this.props.id, this.props.prop, { isDraggingToolbar: false });
  }
  
  render() {
    return (
      <div style={styles.root} >
        {BUTTONS.map(id =>
          <div 
            draggable 
            key={id} 
            style={styles.button} 
            onDragStart={this.handleDragStart} 
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