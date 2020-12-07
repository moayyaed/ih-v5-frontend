import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import SliderMUI from '@material-ui/core/Slider';


const styles = {
  root: {
    margin: 12,
    
  },
}

const PrettoSlider = withStyles({
  root: {
    color: '#9E9E9E',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(SliderMUI);


function Slider(props) {
  return (
    <div style={styles.root}>
      <div style={props.getStyle(props)}>{props.options.title}</div>
      <PrettoSlider 
        valueLabelDisplay="auto" 
        value={props.data}
        min={props.options.min || 0}
        max={props.options.max || 20}
        onChange={(e, v) => props.onChange(props.id, props.options, null, v)} 
      />
    </div>

  )
}


export default React.memo(Slider);