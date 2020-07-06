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
      props.onChange(props.id, props.options, null, value)
  }

  const open = Boolean(anchorEl);

  return (
    <div style={styles.root}>
      <div style={{ ...styles.title, ...props.getStyle(props)}}>{props.options.title}</div>
      <div style={styles.button} onClick={handleClick}>
        <div style={{ ...styles.buttonBackround2, backgroundColor: props.data }}/>
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
          value={props.data}
          onChange={handleChange}
        />
      </Popover>
    </div>
  );
}


export default React.memo(Shadow);


/*
 
*/