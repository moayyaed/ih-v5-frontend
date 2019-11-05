import React, { useState } from 'react';

import Example from 'components/Example';


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }
};


function Test(props) {
  const [count, setCount] = useState(0);
  console.log('render main');
  return (
    <div onClick={() => setCount(count + 1)} style={styles.root}>
      <Example id="test1" />
      <Example id="test2" />
      {count}
    </div>
  );
}


export default Test;