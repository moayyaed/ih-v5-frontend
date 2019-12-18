import React, { PureComponent } from 'react';

import { Classes, Icon, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

function getItemType(item, data) {
  switch(item.type) {
    case 'divider':
      return <MenuDivider key={item.id} { ...item} />
    case 'item':
        return <MenuItem key={item.id} { ...item} />
    case 'items':
        return (
          <MenuItem key={item.id} { ...item} >
            {data[item.childs].map(i => getItemType(i, data))}
          </MenuItem>
        );
    default:
      return null;
  }
}

class AppContextMenu extends PureComponent {

  render() {
    return (
      <Menu className={Classes.ELEVATION_1}>
        {this.props.data.main.map(i =>
          getItemType(i, this.props.data)
        )}
      </Menu>
    );
  } 
}


export default AppContextMenu;