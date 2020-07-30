import React from 'react';
import core from 'core';

import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';


const styles = {
  buttonMini2: {
    width: 22,
    height: 22,
  },
}


function ButtonMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [list, setList] = React.useState([]);

  const handleClick = (event, icon) => {
    if (icon) {
      props.onChange(null);
    } else {
      const store = core.store.getState().apppage.data.p1.template;
      setList(store.listState.map(id => ({ id, title: store.state[id].title, value: store.state[id].curent })));
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setList([]);
  };

  const handleChangeMenu = (item) => {
    setAnchorEl(null);
    setList([]);
    props.onChange(item.title, item.id, item.value);
  }

  if (props.enabled) {
    return (
      <div>
        <IconButton className="nb" style={styles.buttonMini2} onClick={(e) => handleClick(e, props.icon)} size="small" >
          {props.icon ? <LinkOffIcon fontSize="small" /> : <LinkIcon fontSize="small" />}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {list.map(i => 
            <MenuItem key={i.id} onClick={() => handleChangeMenu(i)}>{i.title}</MenuItem>
          )}
        </Menu>
      </div>
    );
    
  }
  return null;
}


export default ButtonMenu;