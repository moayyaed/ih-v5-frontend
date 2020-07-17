import React from 'react';

import Popover from '@material-ui/core/Popover';
import { ShadowPicker } from 'react-shadow-picker';

const styles = {
  root: {
    margin: 12,
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
  },
  buttonBackround2Mini: {
    width: 16,
    height: 16,
    position: 'absolute',
  }
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
      props.onChange(props.id, props.options, null, { ...props.data, value})
  }

  const open = Boolean(anchorEl);
  const s = {};

  if (props.mini) {
    s.root = styles.rootMini;
    s.title = styles.titleMini;
    s.button = styles.buttonMini;
    s.buttonBackround2 = styles.buttonBackround2Mini;
  } else {
    s.root = styles.root;
    s.title = styles.title;
    s.button = styles.button;
    s.buttonBackround2 = styles.buttonBackround2;
  }

  return (
    <div style={s.root}>
      <div style={{ ...s.title, ...props.getStyle(props)}}>{props.options.title}</div>
      <div style={s.button} onClick={handleClick}>
        <div style={{ ...s.buttonBackround2 }}/>
      </div>
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
  );
}


export default React.memo(Shadow);
