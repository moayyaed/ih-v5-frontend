import React, { useState } from 'react';

import Box1 from './Box1';


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
  return (
    <div onClick={() => setCount(count + 1)} style={styles.root}>
      <Box1 id="test1" />
      <Box1 id="test2" />
    </div>
  );
}


export default Test;