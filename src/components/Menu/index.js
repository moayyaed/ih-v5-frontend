import React from 'react';

import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";


function _Menu(props) {
  return (
    <Menu className={Classes.ELEVATION_1}>
      {props.scheme.main.map(i => 
        <MenuItem 
          key={i.id} 
          text={i.title} 
          disabled={i.disabled} 
          onClick={i.click}
        />)}
    </Menu>
  )
}


export default _Menu;
