import React from 'react';

import Popover from '@material-ui/core/Popover';

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
  title: {
    marginBottom: 6,
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
  buttonBackround: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 2,
    left: 2,
    background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) center center',
  },
  buttonBackround2: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 2,
    left: 2,
  }
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
    
    if (props.data === 'transparent') {
      props.onChange(props.id, props.options, null, `rgba(${r},${g},${b},1)`)
    } else {
      props.onChange(props.id, props.options, null, `rgba(${r},${g},${b},${a})`)
    }
  }

  const open = Boolean(anchorEl);

  return (
    <div style={styles.root}>
      <div style={{ ...styles.title, ...props.getStyle(props)}}>{props.options.title}</div>
      <div style={styles.button} onClick={handleClick}>
        <div style={styles.buttonBackround}/>
        <div style={{ ...styles.buttonBackround2, backgroundColor: props.data }}/>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SketchPicker
          color={props.data}
          presetColors={PRESET_COLORS}
          onChange={handleChange}
        />
      </Popover>
    </div>
  );
}


export default React.memo(Color);