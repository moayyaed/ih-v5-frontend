import React, { Component } from 'react';
import context from 'context';
import shortid from 'shortid';


import Example from 'components/Example';


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }
};

class Test extends Component {
  state = { count: 0 }

  componentDidMount() {
    console.log('Test');
  }
  
  handleClick = () => {
    this.setState((state) => {
      return { state, count: state.count + 1 };
    });
  }

  render() {
    console.log('render main');
    return (
      <div style={styles.root}>
        Test
      </div>
    );
  }
}


export default Test;