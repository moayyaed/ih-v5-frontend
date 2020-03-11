import React from 'react';

import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";


function itemMenu(i) {
  if (i.type === 'divider') {
    return <MenuDivider  key={i.id} />;
  }
  return (
    <MenuItem 
      key={i.id} 
      text={i.title} 
      disabled={i.disabled} 
      onClick={i.click}
    />
  )
}

function _Menu(props) {
  return (
    <Menu className={Classes.ELEVATION_1}>
      {props.scheme.main.map(itemMenu)}
    </Menu>
  )
}


export default _Menu;
