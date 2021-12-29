import React from 'react';


function Table(props) {
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%',
        border: '1px solid black', 
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ border: '1px solid black', padding: 6, flexShrink: 0 }}>Column 1</div>
        <div style={{ border: '1px solid black', padding: 6, flexShrink: 0 }}>Column 2</div>
        <div style={{ border: '1px solid black', padding: 6, flexShrink: 0 }}>Column 3</div>
      </div>
    </div>
  );
}


export default Table;