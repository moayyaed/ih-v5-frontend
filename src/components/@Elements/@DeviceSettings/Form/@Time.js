import React from 'react';

import TimePicker from 'rc-time-picker';
import moment from 'moment';

import 'rc-time-picker/assets/index.css';

const styles = {
  root: {
    width: 65,
  },
  container: {
    display: 'flex',
    height: 38,
    width: '100%',
    alignItems: 'center',
  },
  container2: {
    display: 'flex',
    height: 38,
    width: '100%',
    alignItems: 'center',
  },
}

function getAlign(v) {
  switch(v) {
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    case 'center':
      return 'center';
    default:
      return 'flex-start';
  }
}


function Time(props) {
  return (
    <div style={styles.container}>
      <div style={{ 
        flexShrink: 0, 
        color: props.item.titleColor, 
        fontSize: props.item.titleSize,
        textAlign: props.item.titleAlign,
        fontWeight: props.item.titleBold ? 600 : 'unset',
        fontStyle: props.item.titleItalic ? 'italic' : 'unset',
        marginTop: props.item.offsetTop,
        marginBottom: props.item.offsetBottom, 
        width: props.item.proportion, 
        ...props.item.style 
      }}>
        {props.item.title}
      </div>
      <div style={{ ...styles.container2, ...props.item.style2 }}>
        <TimePicker
          allowEmpty={false}
          format={'HH:mm:ss'}
          style={styles.root}
          defaultValue={moment.utc((props.data || 0) * 1000)}
          onChange={() => {}}
        />
      </div>
    </div>
  );
}


export default Time;