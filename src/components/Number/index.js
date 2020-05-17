import React, { Component } from 'react';


import './main.css';


const styles = {
  root: {
    display: 'flex',
    border: '1px solid #BDBDBD',
    height: 18,
    width: 55,
    borderRadius: 4,
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    height: '100%',
    border: 'unset',
    backgroundColor: 'unset',
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  arrows: {
    display: 'flex',
    flexDirection: 'column',
    width: 18,
    flexShrink: 0,
    // backgroundColor: 'blue',
    borderLeft: '1px solid #BDBDBD',
  },
  buttonLeft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 14,
    borderRight: '1px solid #BDBDBD',
    flexShrink: 0,
    cursor: 'pointer',
  },
  buttonRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 14,
    borderLeft: '1px solid #BDBDBD',
    flexShrink: 0,
    cursor: 'pointer',
  },
}

class Number extends Component {

  handleClickLeftArrow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onChange(this.props.value - 1);
  }

  handleClickRightArrow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onChange(this.props.value + 1);
  }

  handleClickStub = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleChangeValue = () => {

  }

  render() {
    return (
      <div 
        style={{ 
          ...styles.root, 
          ...this.props.style,
          opacity: this.props.disabled ? 0.3 : 1,
          pointerEvents: this.props.disabled ? 'none' : 'all'
        }}
      >
        <div style={styles.buttonLeft} className="numberButtonUp" onMouseDown={this.handleClickStub} onDoubleClick={this.handleClickStub} onClick={this.handleClickLeftArrow}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M7.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71l-4 4C5.11 7.47 5 7.72 5 8c0 .28.11.53.29.71l4 4a1.003 1.003 0 001.42-1.42L7.41 8z" fill="#5c7080"/>
          </svg>
        </div>
        <input value={this.props.value} className="number" style={styles.input} type="number" />
        <div style={styles.buttonRight} className="numberButtonUp" onMouseDown={this.handleClickStub} onDoubleClick={this.handleClickStub} onClick={this.handleClickRightArrow}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M10.71 7.29l-4-4a1.003 1.003 0 00-1.42 1.42L8.59 8 5.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l4-4c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z" fill="#5c7080"/>
          </svg>
        </div>
      </div>
      
    )
  }
}

export default Number;
