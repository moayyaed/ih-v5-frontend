import React, { Component } from 'react';


import './main.css';


const styles = {
  root: {
    display: 'flex',
    border: '1px solid #BDBDBD',
    height: 27,
    width: 70,
    borderRadius: 4,
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    height: '100%',
    minWidth: 0,
    border: 'unset',
    backgroundColor: 'unset',
    textAlign: 'center',
    fontSize: 14,
  },
  arrows: {
    display: 'flex',
    flexDirection: 'column',
    width: 18,
    flexShrink: 0,
    // backgroundColor: 'blue',
    borderLeft: '1px solid #BDBDBD',
  },
  buttonUp: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
    borderBottom: '1px solid #BDBDBD',
    flexShrink: 0,
    cursor: 'pointer',
  },
  buttonDown: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
    flexShrink: 0,
    cursor: 'pointer',
  },
}

class Number2 extends Component {

  handleClickUpArrow = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleClickDownArrow = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    return (
      <div style={styles.root}>
        <input value={this.props.value} className="number" style={styles.input} type="number" />
        <div style={styles.arrows}>
          <div style={styles.buttonUp} className="numberButtonUp" onClick={this.handleClickUpArrow}>
            <svg width="14" height="14" viewBox="0 0 16 16">
              <path d="M12.71 9.29l-4-4C8.53 5.11 8.28 5 8 5s-.53.11-.71.29l-4 4a1.003 1.003 0 001.42 1.42L8 7.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71z" fill="#5c7080"/>
            </svg>
          </div>
          <div style={styles.buttonDown} className="numberButtonDown" onClick={this.handleClickDownArrow}> 
            <svg width="14" height="14" viewBox="0 0 16 16">
              <path d="M12 5c-.28 0-.53.11-.71.29L8 8.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42l4 4c.18.18.43.29.71.29s.53-.11.71-.29l4-4A1.003 1.003 0 0012 5z" fill="#5c7080"/>
            </svg>
          </div>
        </div>
      </div>
      
    )
  }
}

export default Number2;
