import React from 'react';
import Scrollbars2 from 'libs/Scrllbars2';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import StepIcon from '@material-ui/core/StepIcon';

import { transform } from './tools';


const styles = {
  root: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  stepper: {
    background: 'unset',
  },
  step: {
    // marginTop: -34,
  },
  steplabel: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 600,
  },
  stepcontent: {
    whiteSpace: 'pre-line',
  },
  stepicon: {
    color: 'rgb(158, 158, 158)',
  },
};


const temp = [
  {time: '16.09 12:09:34', text: ' Value: 12Value: 12Value: 12Value: 12Value: 12Value: 12Value: 12\r\nValue: 12Value: 12Value: 12Value: 12Value: 12Value: 12Value: 12Value: 12Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
  {time: '16.09 12:09:34', text: ' Value: 12'},
]

function DeviceLog(props) {
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
      <Scrollbars2
        scrollX={props.mode === 'user'}
        scrollY={props.mode === 'user'}
      >
        <Stepper style={styles.stepper} activeStep={-1} orientation="vertical">
          {temp.map((item, key) =>
            <Step key={key} style={styles.step} active>
              <StepLabel icon={<StepIcon icon=" "/>}  style={{ ...styles.steplabel }}>{item.time}</StepLabel>
              <StepContent style={styles.stepcontent}><p>{item.text}</p></StepContent>
            </Step>
          )}
        </Stepper>
      </Scrollbars2>
    </div>
  );
}


export default DeviceLog;