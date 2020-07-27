import React from 'react';
import core from 'core';

import IconButton from '@material-ui/core/IconButton';
import CheckboxMui from '@material-ui/core/Checkbox';
import TuneIcon from '@material-ui/icons/Tune';

import ButtonMenu from 'components/@Form/types/@ButtonMenu';


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
  container: {
    top: 64, 
    width: '100%', 
    height: 'calc(100% - 64px)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    padding: 18,
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
  },
  text: {
    margin: 12,
    width: 'calc(100% - 24px)',
  }
}


const options = {
  spacing: 10,
  grid: [
    {
      id: 'p0',
      xs: 2,
      class: 'main',
    },
    {
      id: 'p1',
      xs: 10,
      class: 'main',
    },
    {
      id: 'p2',
      xs: 12,
      class: 'main',
      height: "fill",
      calc: -130,
      padding: 4,
    },
  ],
  p0: [
    {
      prop: 'active',
      title: 'Enabled',
      type: 'cb'
    },
  ],
  p1: [
    {
      prop: 'animation',
      title: 'Animation',
      type: 'input'
    },
  ],
  p2: [
    {
      prop: 'keyframes',
      title: '@Keyframes',
      type: 'script',
      mode: 'css',
      theme: 'tomorrow',
    },
  ],
}

const defaultAnimation = 'spin 4s linear infinite'
const defaultKeyframes = `
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`


function Animation(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    core.actions.appdialog.data({
      id: 'test', 
      open: true, 
      transferid: 'form_dialog',
      template: {
        type: 'form',
        options: options,
        data: { 
          p0: { active: 0 },
          p1: { animation: props.data.active ? props.data.animation : defaultAnimation }, 
          p2: { keyframes: props.data.active ? props.data.keyframes : defaultKeyframes },
        },
        cache: { p0: {}, p1: {}, p2: {} },
      },
    });
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
      </div>
      <ButtonMenu 
        enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
        icon={props.data._bind} 
        onChange={handleClickButton} 
      />
    </>
  );
}


export default React.memo(Animation);
