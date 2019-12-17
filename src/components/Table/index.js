import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import { Button, Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";


const styles = {
  box: {
    width: '100%',
    height: '100%',
  },
};

const classes = theme => ({
  root: {
  },
});

class Table extends Component {
  componentDidMount() {
  }

  render({ id, state, match, classes, onClick } = this.props) {
    return (
      <div style={styles.box}>
        <Popover content={
           <Menu>
           <MenuItem icon="graph" text="Graph" />
           <MenuItem icon="map" text="Map" />
           <MenuItem icon="th" text="Table" shouldDismissPopover={false} />
           <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
           <MenuDivider />
           <MenuItem icon="cog" text="Settings...">
               <MenuItem icon="add" text="Add new application" disabled={true} />
               <MenuItem icon="remove" text="Remove application" />
           </MenuItem>
       </Menu>
        } position={Position.RIGHT_TOP}>
          <Button icon="share" text="Open in..." />
        </Popover>
      </div>
    );
  }
}



export default core.connect(withStyles(classes)(Table));