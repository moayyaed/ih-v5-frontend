import React, { Component } from 'react';
import Draggable from 'react-draggable';

import css from './main.module.css';

const styles = {
  box: {
    display: 'flex',
    position: 'fixed',
    height: '100%',
    width: 250,
    top: 0,
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    transform: 'none',
  },
  dragLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 5,
    height: '100%',
    flexShrink: 0,
    cursor: 'col-resize',
    zIndex: 80,
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
    paddingTop: 35,
  },
}


function getStyleBox(open, width, position, offsetLeft, offsetRight) {
  if (position === 'right') {
    return {
      ...styles.box,
      width,
      right: offsetRight,
      transform: open ? 'none' : 'translateX(350px)',
    }
  }
  return {
    ...styles.box,
    width,
    left: offsetLeft,
    transform: open ? 'none' : 'translateX(350px)',
  }
}

function getStyleDrag(position, offsetLeft, offsetRight) {
  if (position === 'right') {
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


class Drawer extends Component {

  state = { 
    ...this.props, 
    x: this.props.position === 'right' ? -this.props.width + 5 : this.props.width - 5
  }

  componentDidMount() {
 
  }

  componentWillUnmount() {
    
  }

  handleAnimationEnd = (e, a) => {
    if (this.state.position === 'right') {
      this.box.style.transition = 'unset';
      this.box.style.transform  = 'unset';
      this.box.style.right = 'unset';
      this.box.style.left = this.state.offsetLeft + 'px';
      this.setState((state) => {
        return {
          ...state,
          position: 'left',
          x: Math.abs(state.x),
        };
      });
    } else {
      this.box.style.transition = 'unset';
      this.box.style.transform  = 'unset';
      this.box.style.left = 'unset';
      this.box.style.right = this.state.offsetRight + 'px';
      this.setState((state) => {
        return {
          ...state,
          position: 'right',
          x: - state.x,
        };
      });
    }
    this.drag.style.display = 'block';
    this.box.removeEventListener('transitionend', this.handleAnimationEnd);
  }

  handleDrag = (e, data) => {
    if (this.state.position === 'right') {
      this.box.style.width = Math.abs(data.x) + 5 + 'px';
    }
    if (this.state.position === 'left') {
      this.box.style.width = data.x + 5 + 'px';
    }
  }

  handleDragStop = (e, data) => {
    if (this.state.position === 'right') {
      this.width = this.width - data.x;
      this.setState((state) => {
        return { 
          ...state, 
          x: data.x,
          width: Math.abs(data.x) + 5
        };
      });
    }
    if (this.state.position === 'left') {
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

  handleButton = () => {
    this.drag.style.display = 'none';
    this.box.style.transition = 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms';
    this.box.addEventListener('transitionend', this.handleAnimationEnd);

    const { width, offsetLeft, offsetRight } = this.state;

    if (this.state.position === 'right') {
      const t = `translateX(-${window.innerWidth - width - offsetRight - offsetLeft}px)`;
      this.box.style.transform = t;
    }
    if (this.state.position === 'left') {
      const t = `translateX(${window.innerWidth - width - offsetRight - offsetLeft}px)`;
      this.box.style.transform = t;
    }
  }

  link = (e) => {
    this.box = e;
  }

  linkDrag = (e) => {
    this.drag = e;
  }

  render({ x, width, position, offsetLeft, offsetRight } = this.state) {
    return (
      <>
        <Draggable 
          axis='x'
          position={{ x, y: 0 }}
          onDrag={this.handleDrag}
          onStop={this.handleDragStop}
        >
          <div 
            ref={this.linkDrag} 
            className={css.dragLine} 
            style={getStyleDrag(position, offsetLeft, offsetRight)}
          />
        </Draggable>
        <div ref={this.link} style={getStyleBox(this.props.open, width, position, offsetLeft, offsetRight)}>
          {this.props.children}
        </div>
      </>
    )
  }

}

Drawer.defaultProps = {
  width: 350,
  position: 'right',
  offsetLeft: 70,
  offsetRight: 0
}


export default Drawer;