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
    const x = Array(90).fill(null).map((x,i) => i);
    x.forEach(i => {
      context.network.fetch('123');
    })
  }
  
  handleClick = () => {
    this.setState((state) => {
      return { state, count: state.count + 1 };
    });
  }

  render() {
    console.log('render main');
    return (
      <div onClick={this.handleClick} style={styles.root}>
        <Example id="test1" />
        <Example id="test2" />
        {this.state.count}
      </div>
    );
  }
}


export default Test;