import React from 'react';

import components from './types';


function Form(props) {
  return (
    <div style={props.settings.style}>
      {props.settings.schema.map(item => components(item, props.settings.data[item.prop]))}
    </div>
  )
}


export default Form;