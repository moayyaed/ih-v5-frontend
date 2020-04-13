import React, { PureComponent } from 'react';
import core from 'core';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  button: {
    border: '2px dashed #9E9E9E',
    textAlign: 'center',
    margin: '10px 5px',
  }
}


class Properties extends PureComponent {
  
  render() {
    return (
      <div style={styles.root}>
        <div style={styles.button}>
          TEXT
        </div>
        <div style={styles.button}>
          IMG
        </div>
      </div>
    );
  }
}


export default Properties;