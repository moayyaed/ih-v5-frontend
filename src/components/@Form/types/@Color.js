import React from 'react';
import core from 'core';

import Popover from '@material-ui/core/Popover';

import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';

import { SketchPicker } from 'react-color';

const PRESET_COLORS = [
  'transparent',
  '#D0021B', '#F5A623', '#F8E71C',
  '#8B572A', '#7ED321', '#417505',
  '#BD10E0', '#9013FE', '#4A90E2',
  '#50E3C2', '#B8E986', '#000000',
  '#4A4A4A', '#9B9B9B', '#FFFFFF',
];

const styles = {
  root: {
    margin: 12,
  },
  rootMini: {},
  title: {
    marginBottom: 6,
  },
  titleMini: {
    display: 'none',
  },
  button: {
    width: 28,
    height: 28,
    border: '1px solid #999',
    borderRadius: 2,
    padding: 2,
    boxShadow: '0 0 0 2px #fff inset',
    cursor: 'pointer',
    position: 'relative',
  },
  2: {
    width: 16,
    height: 16,
    border: '1px solid #999',
    borderRadius: 2,
    cursor: 'pointer',
    position: 'relative',
  },
  buttonBackround: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 2,
    left: 2,
    background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) center center',
  },
  buttonBackroundMini: {
    width: 14,
    height: 14,
    position: 'absolute',
    background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) center center',
  },
  buttonBackround2: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 2,
    left: 2,
  },
  buttonBackround2Mini: {
    width: 14,
    height: 14,
    position: 'absolute',
  },
  buttonMini: {
    width: 16,
    height: 16,
    border: '1px solid #999',
    borderRadius: 2,
    cursor: 'pointer',
    position: 'relative',
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

function Color(props) {
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

  const handleChange = (colors, e) => {
    e.preventDefault();
    e.stopPropagation();

    const { r, g, b, a } = colors.rgb;
    const v = props.mini ? props.data.value : props.data;
    
    if (v === 'transparent') {
      const value = props.mini ? { value: `rgba(${r},${g},${b},1)` } : `rgba(${r},${g},${b},1)`;
      props.onChange(props.id, props.options, null, value)
    } else {
      const value = props.mini ? { value: `rgba(${r},${g},${b},${a})` } : `rgba(${r},${g},${b},${a})`;
      props.onChange(props.id, props.options, null, value)
    }
  }

  const handleClickButton = (title, id, value) => {
    if (title === null) {
      props.onChange(props.id, props.options, null, { _bind: null, title: null, color: null, value: props.data.color || '' })
    } else {
      props.onChange(props.id, props.options, null, { _bind: id, title, value, color: props.data.value })
    }
  };

  const open = Boolean(anchorEl);
  const s = {};

  if (props.mini) {
    s.root = styles.rootMini;
    s.title = styles.titleMini;
    s.button = styles.buttonMini;
    s.buttonBackround = styles.buttonBackroundMini;
    s.buttonBackround2 = styles.buttonBackround2Mini;
    s.data = props.data.value;
  } else {
    s.root = styles.root;
    s.title = styles.title;
    s.button = styles.button;
    s.buttonBackround = styles.buttonBackround;
    s.buttonBackround2 = styles.buttonBackround2;
    s.data = props.data;
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
      <div style={s.root}>
        <div style={{ ...s.title, ...props.getStyle(props)}}>{props.options.title}</div>
        <div style={s.button} onClick={handleClick}>
          <div style={s.buttonBackround}/>
          <div style={{ ...s.buttonBackround2, backgroundColor: s.data }}/>
        </div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <SketchPicker
            color={s.data}
            presetColors={PRESET_COLORS}
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


export default React.memo(Color);