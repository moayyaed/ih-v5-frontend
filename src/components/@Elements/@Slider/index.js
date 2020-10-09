import React from 'react';
import Slider from '@material-ui/core/Slider';

import { makeStyles } from '@material-ui/core/styles';

import { 
  ValueLabelComponent, 
  IOSSlider, 
  AirbnbThumbComponent, 
  AirbnbSlider, 
  PrettoSlider 
} from './variants';

import { transform } from '../tools';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));



const temp = [

];

function getSlider(props) {
  switch(props.item.variant.value.id) {
    case 'ios':
      return <IOSSlider defaultValue={50} valueLabelDisplay="on" />;
    case 'pretto':
      return <PrettoSlider valueLabelDisplay="auto" defaultValue={50} />
    case 'airbnb':
      return <AirbnbSlider ThumbComponent={AirbnbThumbComponent} defaultValue={50} />
    default: 
      return <Slider ValueLabelComponent={ValueLabelComponent} defaultValue={50} />;
  }
}


function _Slider(props) {
  const data = props.mode === 'user' ? props.item.data : temp;
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize.value}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
        borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value,
        opacity: props.item.opacity.value / 100,
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: transform(props.item),
        // animation: props.item.animation.active ? props.item.animation.value : 'unset',
        overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
      }}
    >
      <div style={{ ...styles.root, pointerEvents: props.mode === 'user' ? 'all' : 'none' }}>
        {getSlider(props)}
      </div>
    </div>
  );
}


export default _Slider;