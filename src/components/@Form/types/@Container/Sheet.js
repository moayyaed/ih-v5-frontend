import React, { Component } from 'react';
import core from 'core';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import Element from './Element';


const styles = {
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    perspective: 1000,
    WebkitPerspective: 1000,
  },
  sheet: {
    transformOrigin: '0 0',
    position: 'absolute',
    borderRadius: 0,
    backgroundSize: '50px 50px',
    // backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogPGxpbmUgeDE9IjEwMCIgeTE9IjAiIHgyPSIxMDAiIHkyPSIxMDAiIHN0cm9rZT0iIzc1NzU3NSIgLz4NCiA8bGluZSB4MT0iMCIgeTE9IjEwMCIgeDI9IjEwMCIgeTI9IjEwMCIgc3Ryb2tlPSIjNzU3NTc1IiAvPg0KPC9zdmc+')",
  },
}


class Sheet extends Component {

  handleMouseUpContainer = (e) => {

  }

  handleMouseDownContainer = (e) => {

  }

  handleMouseWhellContainer = (e) => {
    const isTouchPad = e.nativeEvent.wheelDeltaY ? 
    e.nativeEvent.wheelDeltaY === -3 * e.nativeEvent.deltaY : e.nativeEvent.deltaMode === 0;

    const offset = this.container.getBoundingClientRect();

    let x = this.props.settings.x;
    let y = this.props.settings.y;
    let s = this.props.settings.scale;

    const px = e.pageX - offset.left;
    const py = e.pageY - offset.top;

    const tx = (px - x) / s;
    const ty = (py - y) / s;

    if (isTouchPad) {
      if (e.deltaY > 0) {
        s -= (e.deltaY * 1 / 450)
      } else {
        s += (e.deltaY * -1 / 450)
      }
    } else {
      s += Math.max(-1, Math.min(1, e.deltaY)) * -0.1 * s;
    }

    if (s > 8) {
      s = 8;
    }
    if (s < 0.1 ) {
      s = 0.1;
    }

    x = -tx * s + px
    y = -ty * s + py

    core.actions.container
      .settings(
        this.props.id, this.props.prop,
        { x, y, scale: s }
      );
  }

  handleClickSheet = (e) => {

  }

  handleContextMenuSheet = (e) => {

  }

  handleMoveSheet = (e) => {
 
  }

  handleStopMoveSheet = (e, data) => {
    core.actions.container
      .settings(
        this.props.id, this.props.prop,
        { x: data.x, y: data.y }
      );
  }

  handleStartMoveElement = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleMoveElement = (e, elementId, data) => {

  }

  handleStopMoveElement = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();

    core.actions.container
      .editElement(
        this.props.id, this.props.prop,
        elementId, { x: data.x, y: data.y }
      );
  }

  handleChangeSizeElement = (e, elementId, position) => {
    e.preventDefault();
    e.stopPropagation();

    core.actions.container
      .editElement(
        this.props.id, this.props.prop,
        elementId, position
      );
  }

  handleClickElement = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();

    core.actions.container
      .select(
        this.props.id, this.props.prop,
        elementId
      );
  }
  
  linkContainer = (e) => {
    this.container = e;
  } 

  linkSheet = (e) => {
    this.sheet = e;
  } 

  render({ selects, settings, list, elements } = this.props) {
    return (
      <div style={styles.root}>
        <div 
          ref={this.linkContainer}
          style={styles.container}
          onMouseUp={this.handleMouseUpContainer}
          onMouseDown={this.handleMouseDownContainer}
          onWheel={this.handleMouseWhellContainer}
        >
          <Draggable 
            position={settings}
            onDrag={this.handleMoveSheet}
            onStop={this.handleStopMoveSheet}
          >
            <Paper
              ref={this.linkSheet}
              elevation={2} 
              className="parent" 
              style={{ ...styles.sheet, width: settings.w, height: settings.h }}
              onClick={(e) => this.handleClickSheet}
              onContextMenu={(e) => this.handleContextMenuSheet}
            >
              {list.map(id => 
                <Element 
                  key={id}
                  id={id}
                  scale={settings.scale}
                  select={selects[id]} 
                  item={elements[id]}
                  onStartMove={this.handleStartMoveElement}
                  onMove={this.handleMoveElement}
                  onStopMove={this.handleStopMoveElement}
                  onChangeSize={this.handleChangeSizeElement}
                  onClick={this.handleClickElement} 
                />
              )}
            </Paper>
          </Draggable>
        </div>
      </div>
    )
  }
}


export default Sheet