import React from 'react';

import components from './types';


function Form(props) {
  return (
    <div style={props.settings.style}>
      {props.settings.schema.map((item, key) => components(key, item, props.settings.data[item.prop]))}
    </div>
  )
}


export default Form;