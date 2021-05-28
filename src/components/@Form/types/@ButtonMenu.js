import React from 'react';
import core from 'core';

import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MoreVertIcon from '@material-ui/icons/MoreVert';


const styles = {
  buttonMini2: {
    width: 22,
    height: 22,
  },
  root: {
    display: 'flex',
  },
  divider: {
    borderLeft: '1px solid #d8e1e8',
    margin: '4px 6px'
  },
  divideroff: {
    margin: '4px 2px'
  }
}


function ButtonMenu(props) {
  const [state, setState] = React.useState(null);

  const handleLink = () => {
    setState(null);
    props.onChange();
  }

  const handleUnlink = () => {
    setState(null);
    props.onClear();
  }

  const handleClick = (event) => {
    setState(event.currentTarget);
  };

  const handleClose = () => {
    setState(null);
  }
  

  if (props.mode !== 'vars' && props.enabled !== false) {
    return (
      <div style={styles.root}>
        <Menu
          anchorEl={state}
          keepMounted
          open={Boolean(state)}
          onClose={handleClose}
        >
          <MenuItem key="1" onClick={handleLink}>Link</MenuItem>
          <MenuItem key="2" onClick={handleUnlink}>Unlink</MenuItem>
        </Menu>
        <div style={props.dividerOff ? styles.divideroff : styles.divider} />
        <IconButton className="nb" style={styles.buttonMini2} onClick={(e) => handleClick(e, props.icon)} size="small" >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </div>
    );
    
  }
  return null;
}


export default ButtonMenu;