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
    fontSize: 12,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: '#3f51b5',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',
  },
  button: {
    width: 16,
    height: 16,
    border: '1px solid #999',
    borderRadius: 2,
    cursor: 'pointer',
    position: 'relative',
  },
  buttonBackround: {
    width: 14,
    height: 14,
    position: 'absolute',
    background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) center center',
  },
  buttonBackround2: {
    width: 14,
    height: 14,
    position: 'absolute',
  }
}

function handleChange(e, colors, props) {
  e.preventDefault();
  e.stopPropagation();

  const id = props.container.props.id;
  const options = props.container.props.options;
  const column = props.column;
  const row = props.rowData;
  

  const { r, g, b, a } = colors.rgb;
  const v = props.cellData;
  
  if (v === 'transparent') {
    const value =  `rgba(${r},${g},${b},1)`;
    props.container.props.onChange(id, options, { op: 'edit', column, row }, value)
  } else {
    const value =  `rgba(${r},${g},${b},${a})`;
    props.container.props.onChange(id, options, { op: 'edit', column, row }, value)
  }
}


function TableColorComponent(props) {
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

  const open = Boolean(anchorEl);

  return (
    <div style={styles.root}>
      <div style={styles.button} onClick={handleClick}>
        <div style={styles.buttonBackround}/>
        <div style={{ ...styles.buttonBackround2, backgroundColor: props.cellData }}/>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SketchPicker
          color={props.cellData}
          presetColors={PRESET_COLORS}
          onChange={(colors, e) => handleChange(e, colors, props)}
        />
      </Popover>
    </div>
  )
}


export default TableColorComponent; 