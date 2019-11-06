import React, { Component } from 'react';
import context from 'context';

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
    const x = Array(29).fill(null).map((x,i) => i);
    x.forEach(i => {
      const s = new Date(2019, 10, i + 1, 0, 0, 0, 0).getTime();
      const e = new Date(2019, 10, i + 1, 23, 59, 59, 999).getTime();
      context.network.fetch(`http://localhost:8080/trend?id=${i}&uuid=0&chartid=12&dn=UPS_1_Input_V_L1,UPS_1_Input_V_L2,UPS_1_Input_V_L3&start=${s}&end=${e}&alias=&discrete=`);
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