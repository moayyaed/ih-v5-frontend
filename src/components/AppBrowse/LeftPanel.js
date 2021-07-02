import React, { Component } from 'react';

import SubTree from './variants/SubTree';
import Fields from './variants/Fields';


function LeftPannel(props) {
  if (props.params && props.params.variant === 'subtree') {
    return React.createElement(SubTree, props);
  }
  return React.createElement(Fields, props);
}


export default LeftPannel;