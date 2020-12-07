import React from 'react';

import components from './types';


function Form(props) {
  return (
    <div style={props.style}>
      {props.schema.map((item, key) => components(key, item, props.data[item.prop], props.onChange))}
    </div>
  )
}


export default Form;