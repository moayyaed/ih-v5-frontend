import React, { PureComponent } from 'react';

import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import core from 'core';


function handleClick(e, position, item) {
  if (item.command !== undefined) {
    item.position = position;
    core.event('contextmenu', item.command, item);
  }
}

function getItemType(item, position, data) {
  switch(item.type) {
    case 'divider':
      return <MenuDivider key={item.id} { ...item} />
    case 'item':
        return <MenuItem key={item.id} { ...item} onClick={(e) => handleClick(e, position, item)} />
    case 'items':
        return (
          <MenuItem key={item.id} { ...item} >
            {data[item.childs].map(i => getItemType(i, position, data))}
          </MenuItem>
        );
    default:
      return null;
  }
}

class AppContextMenu extends PureComponent {

  render({ position, data } = this.props) {
    return (
      <Menu className={Classes.ELEVATION_1}>
        {this.props.data.main.map(i =>
          getItemType(i, position, data)
        )}
      </Menu>
    );
  } 
}


export default AppContextMenu;