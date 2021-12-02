import React from 'react';

import Table from './variants/Table';
import From from './variants/Form';

function RigtPanel(props) {
  if (props.component === 'table') {
    return React.createElement(Table, props); 
  }
  return React.createElement(From, props);
}


export default RigtPanel;