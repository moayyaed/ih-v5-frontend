import React from 'react';
import core from 'core';

import Popover from '@material-ui/core/Popover';
import { ShadowPicker } from 'react-shadow-picker';

import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';

import CheckboxMui from '@material-ui/core/Checkbox';
import TuneIcon from '@material-ui/icons/Tune';

const styles = {
  root: {
    margin: 12,
  },
  rootMini2: {
    fontSize: 13,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: 'rgb(48, 84, 150)',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 6,
  },
  button: {
    width: 28,
    height: 28,
    border: '3px inset rgba(153, 153, 153, 0.7)',
    borderRadius: 2,
    padding: 2,
    boxShadow: '0 0 0 2px #fff inset',
    cursor: 'pointer',
    position: 'relative',
  },
  buttonBackround2: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 2,
    left: 2,
  },
  checkBox: {
    display: 'none',
  },
  checkBoxMini: {
    width: 16,
    height: 16,
    padding: 0,
  },
  rootMini: {},
  titleMini: {
    display: 'none',
  },
  buttonMini: {
    width: 16,
    height: 16,
    border: '3px inset rgba(153, 153, 153, 0.7)',
    borderRadius: 2,
    padding: 2,
    boxShadow: '0 0 0 2px #fff inset',
    cursor: 'pointer',
    position: 'relative',
    marginLeft: 12,
  },
  buttonBackround2Mini: {
    width: 16,
    height: 16,
    position: 'absolute',
  },
  buttonMini2: {
    width: 22,
    height: 22,
  }
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

function Shadow(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAnchorEl(null);
  };

  const handleChange = (value) => {
      props.onChange(props.id, props.options, null, { ...props.data, active: true, value})
  }

  const handleClickButton = (title, id, value) => {
    if (title === null) {
      props.onChange(props.id, props.options, null, { ...props.data.old, _bind: null, title: null, old: {} })
    } else {
      props.onChange(props.id, props.options, null, { _bind: id, title, value, old: props.data })
    }
  };

  const open = Boolean(anchorEl);
  const s = {};

  if (props.mini) {
    s.root = styles.rootMini;
    s.title = styles.titleMini;
    s.button = styles.buttonMini;
    s.buttonBackround2 = styles.buttonBackround2Mini;
    s.checkbox = styles.checkBoxMini
  } else {
    s.root = styles.root;
    s.title = styles.title;
    s.button = styles.button;
    s.buttonBackround2 = styles.buttonBackround2;
    s.checkbox = styles.checkBox;
  }

  if (props.data._bind) {
    return (
      <>
        <input
          className="core"
          style={styles.rootMini2} 
          disabled={true}
          value={props.data.title}
        />
        <ButtonMenu 
          enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
          icon={props.data._bind} 
          onChange={handleClickButton} 
        />
      </>
    )
  }
  
  return (
    <>
      <CheckboxMui
        size="small"
        color="primary"
        style={s.checkbox}
        checked={Boolean(props.data.active)}
        onChange={(e) => props.onChange(props.id, props.options, null, { ...props.data, active: Number(e.target.checked) })} 
      />
      <div style={s.root}>
        <div style={{ ...s.title, ...props.getStyle(props)}}>{props.options.title}</div>
        <IconButton size="small" onClick={handleClick}>
          <TuneIcon fontSize="inherit" />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <ShadowPicker
            className="custom-picker"
            value={props.data.value}
            onChange={handleChange}
          />
        </Popover>
      </div>
      <ButtonMenu 
        enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
        icon={props.data._bind} 
        onChange={handleClickButton} 
      />
    </>
  );
}


export default React.memo(Shadow);
