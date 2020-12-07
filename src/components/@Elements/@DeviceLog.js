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
  { title: '31.12.2020 23:59:59.002', message: 'Значение: 2'},
  { title: '31.12.2020 23:59:58.001', message: 'Значение: 1'},
  { title: '31.12.2020 23:59:57.000', message: 'Значение: 0'},
];


function DeviceLog(props) {
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
        visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
      }}
    >
      <Scrollbars2
        scrollX={props.mode === 'user'}
        scrollY={props.mode === 'user'}
      >
        <Stepper style={styles.stepper} activeStep={-1} orientation="vertical">
          {data.map((item, key) =>
            <Step key={key} style={styles.step} active>
              <StepLabel icon={<StepIcon icon=" "/>}  style={{ ...styles.steplabel }}>{item.title}</StepLabel>
              <StepContent style={styles.stepcontent}><p>{item.message}</p></StepContent>
            </Step>
          )}
        </Stepper>
      </Scrollbars2>
    </div>
  );
}


export default DeviceLog;