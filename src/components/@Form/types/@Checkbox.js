import React from 'react';
import core from 'core';

import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';
import CheckboxMui from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';


const styles = {
  root: {
    margin: 12,
    marginBottom: 0,
  },
  label: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
  },
  rootMini: {
    width: 16,
    height: 16,
    padding: 0,
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
  buttonMini: {
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
        <IconButton className="nb" style={styles.buttonMini} onClick={(e) => handleClick(e, props.icon)} size="small" >
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


function Checkbox(props) {
  const handleClickButton = (title, id, value) => {
    if (title === null) {
      props.onChange(props.id, props.options, null, { _bind: null, title: null, cb: null, value: props.data.cb || 0 })
    } else {
      props.onChange(props.id, props.options, null, { _bind: id, title, value, cb: props.data.value })
    }
  };
  if (props.mini) {
    return (
      <>
        {props.data._bind ? 
        <input
          className="core"
          style={styles.rootMini2} 
          disabled={true}
          value={props.data.title}
        />
        :
        <CheckboxMui
          size="small"
          color="primary"
          style={styles.rootMini}
          checked={Boolean(props.data.value)}
          onChange={(e) => props.onChange(props.id, props.options, null, { ...props.data, value: Number(e.target.checked)})} 
        />}
        <ButtonMenu 
          enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
          icon={props.data._bind} 
          onChange={handleClickButton} 
        />
      </>
    )
  }
  return (
    <FormControl style={styles.root} component="fieldset">
      <FormLabel style={styles.label}>{props.options.title}</FormLabel>
      <FormControlLabel
        label=""
        labelPlacement="end"
        value="end"
        control={
          <CheckboxMui 
            color="primary"
            checked={Boolean(props.data)}
            onChange={(e) => props.onChange(props.id, props.options, null, Number(e.target.checked))} 
          />
        }
      />
    </FormControl>
  )
}


export default React.memo(Checkbox);