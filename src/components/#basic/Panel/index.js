import React, { Component } from 'react';
import Draggable from 'react-draggable';

import css from './main.module.css';

const styles = {
  box: {

  },
  dragLeft: {
    position: 'absolute',
    left: 0,
    width: 5,
    height: 'calc(100% - 35px)',
    flexShrink: 0,
    cursor: 'col-resize',
    zIndex: 19,
  },
  dragRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 5,
    height: '100%',
    flexShrink: 0,
    cursor: 'col-resize',
    zIndex: 80,
  },
  content: {
    width: '100%',
    height: '100%',
  },
}


function getStyleBox(width, position, style) {
  if (position === 'left') {
    return {
      ...styles.box,
      ...style,
      width,
    }
  }
  return {
    ...styles.box,
    ...style,
    width,
  }
}

function getStyleDrag(position, offsetLeft, offsetRight) {
  if (position === 'left') {
    return {
      ...styles.dragRight,
      right: offsetRight
    }
  }
  return {
    ...styles.dragLeft,
    left: offsetLeft
  }
}


class Panel extends Component {

  state = { 
    ...this.props, 
    x: this.props.position === 'left' ? -this.props.width + 5 : this.props.width - 5
  }

  componentDidMount() {
 
  }

  componentWillUnmount() {
    
  }

  handleDrag = (e, data) => {
    if (this.state.position === 'left') {
      this.box.style.width = Math.abs(data.x) + 5 + 'px';
    }
    if (this.state.position === 'right') {
      this.box.style.width = data.x + 5 + 'px';
    }
  }

  handleDragStop = (e, data) => {
    if (this.state.position === 'left') {
      this.width = this.width - data.x;
      this.setState((state) => {
        return { 
          ...state, 
          x: data.x,
          width: Math.abs(data.x) + 5
        };
      });
    }
    if (this.state.position === 'right') {
      this.width = this.width + data.x;
      this.setState((state) => {
        return { 
          ...state, 
          x: data.x,
          width: data.x + 5,
        };
      });
    }
  }

  link = (e) => {
    this.box = e;
  }

  linkDrag = (e) => {
    this.drag = e;
  }

  render({ x, width, position, } = this.state) {
    return (
      <>
        <Draggable 
          axis='x'
          position={{ x, y: 0 }}
          onDrag={this.handleDrag}
          onStop={this.handleDragStop}
        >
          <div ref={this.linkDrag} className={css.dragLine} style={getStyleDrag(position)} />
        </Draggable>
        <div ref={this.link} style={getStyleBox(width, position, this.props.style)}>
          <div style={styles.content}>
            {this.props.children}
          </div>
        </div>
      </>
    )
  }

}

Panel.defaultProps = {
  width: 200,
  position: 'right',
}


export default Panel;