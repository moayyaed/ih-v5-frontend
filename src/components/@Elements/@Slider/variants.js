import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Slider from 'libs/Slider';
import Tooltip from '@material-ui/core/Tooltip';



export function ValueLabelComponent(props) {
  const { children, open, value } = props;
  
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value} zoom={props.zoom} >
      {children}
    </Tooltip>
  );
}

function getColor(str) {
  const temp = str.slice(5, str.length - 1).split(',');
  if (temp.length === 4) {
    temp[3] = '0.16';
    return 'rgba(' + temp.join(',') + ')';
  }
  return str;
}


const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';


export const IOSSlider = withStyles({
  root: props => ({
    color: props.item.trackColorLeft.value,
    height: 2,
    padding: '15px 0',
  }),
  thumb: props => ({
    height: 28,
    width: 28,
    backgroundColor: props.item.thumbColor.value,
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  }),
  valueLabel: props => ({
    left: 'calc(-50% + 12px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: props.item.labelColor.value,
      fontSize: props.item.labelSize.value,
    },
  }),
  track: {
    height: 2,
  },
  rail: props => ({
    height: 2,
    opacity: 0.5,
    backgroundColor: props.item.trackColorRight.value,
  }),
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

export const PrettoSlider = withStyles({
  root: props => ({
    color: props.item.trackColorLeft.value,
    height: 8,
  }),
  thumb: props => ({
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: `2px solid ${props.item.thumbColor.value}`,
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover': {
      boxShadow: 'inherit',
    },
  }),
  valueLabel: props => ({
    left: 'calc(-50% + 4px)',
        '& *': {
      background: props.item.thumbColor.value,
      color: props.item.labelColor.value,
      fontSize: props.item.labelSize.value,
    },
  }),
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: props => ({
    height: 8,
    borderRadius: 4,
    backgroundColor: props.item.trackColorRight.value,
  }),
})(Slider);

export const AirbnbSlider = withStyles({
  root: props => ({
    color: props.item.trackColorLeft.value,
    height: 3,
    padding: '13px 0',
  }),
  thumb: props => ({
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: `1px solid ${props.item.thumbColor.value}`,
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0 2px 2px',
    '&:focus, &:hover': {
      boxShadow: '#ccc 0 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: props.item.thumbColor.value,
      marginLeft: 1,
      marginRight: 1,
    },
  }),
  track: {
    height: 3,
  },
  rail: props => ({
    color: props.item.trackColorRight.value,
    opacity: 1,
    height: 3,
  }),
})(Slider);

const LightTooltip = withStyles((theme) => ({
  tooltip: props => {
    return {
      backgroundColor: props.item.thumbColor.value,
      color: props.item.labelColor.value,
      fontSize: props.item.labelSize.value,
      boxShadow: theme.shadows[1],
    }
  },
}))(Tooltip);

export function AirbnbThumbComponent(props) {
  return (
    <LightTooltip open={props.item.autoHideLabel.value ? null : true} item={props.item} enterTouchDelay={0} placement="top" title={props['aria-valuenow']} zoom={props.zoom} >
      <span {...props}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </span>
  </LightTooltip>
  );
}

export const MaterialSlider = withStyles({
  root: props => ({
    color: props.item.trackColorLeft.value,
  }),
  thumb: props => ({
    '&:hover': {
      boxShadow: `0px 0px 0px 8px ${getColor(props.item.thumbColor.value)}!important`
    },
    backgroundColor: props.item.thumbColor.value,
  }),
  focusVisible: props => ({
    boxShadow: `0px 0px 0px 8px ${getColor(props.item.thumbColor.value)}!important`
  }),
  rail: props => ({
    backgroundColor: props.item.trackColorRight.value,
  }),
  valueLabel: props => ({
    // left: 'calc(-50% + 12px)',
    top: -28,
    '& *': {
      background: 'transparent',
      color: props.item.labelColor.value,
      fontSize: props.item.labelSize.value,
    },
  }),
})(Slider);
