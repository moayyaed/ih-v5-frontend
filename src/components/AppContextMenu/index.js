import React, { Component } from 'react';
import core from 'core';

import Popper from '@material-ui/core/Popper';
import Popover from '@material-ui/core/Popover';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Divider from '@material-ui/core/Divider';
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import { withStyles } from '@material-ui/core/styles';


const styles = {
  submenuitem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const classes = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
});

function handleClickClose() {
  core.event('contextmenu', 'exit', null, null);
}
// setAnchorEl(e.target)
function SubMenuItem() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <React.Fragment>
      <MenuItem 
        style={styles.submenuitem}
        onClick={(e) => { setAnchorEl(e.currentTarget)}}
      >All <ArrowRightIcon />
      </MenuItem>
      <Menu
        key="test2"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        open={Boolean(anchorEl)}
        anchorElement={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem >Menu 4</MenuItem>
        <MenuItem >Menu 5</MenuItem>
      </Menu>
    </React.Fragment>
  );
}


function AppContextMenu(props) {
  return (
      <Menu 
        key="test1"
        open={props.state.open} 
        anchorEl={props.state.target} 
        onClose={handleClickClose} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem >Menu 1</MenuItem>
        <MenuItem >Menu 2</MenuItem>
        <Divider />
        <SubMenuItem />
      </Menu>
  );
}

export default core.connect(withStyles(classes)(AppContextMenu));