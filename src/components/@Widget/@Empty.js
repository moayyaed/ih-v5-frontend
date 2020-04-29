import React from 'react';


function Empty(props) {
  return (
    <>
      <div>{props.id}</div>
      <div>{props.params.type}</div>
    </>
  )
}


export default Empty;