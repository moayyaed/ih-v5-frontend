import React from 'react';
import core from 'core';

import shortid from 'shortid';

import Scrollbars2 from 'libs/Scrllbars2';

import Form from './Form';
import { transform } from '../tools';


const styles = {
  root: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
};

const temp = {
  style: {
    margin: 8,
    padding: 16,
  },
  schema: [
    { type: 'text', title: 'Text', titleSize: 14, titleColor: 'black', titleBold: true, titleItalic: true },
    { type: 'divider', size: 1, color: 'grey', offsetTop: 8, offsetBottom: 12 },

    { type: 'text', title: 'Text Align: left', titleAlign: 'left' },
    { type: 'text', title: 'Text Align: center', titleAlign: 'center' },
    { type: 'text', title: 'Text Align: right', titleAlign: 'right' },

    { type: 'text', title: 'Text Color: red', titleColor: 'red' },
    { type: 'text', title: 'Text Size: 24', titleSize: 24 },

    { type: 'text', title: 'Number', titleSize: 14, titleColor: 'black', titleBold: true, titleItalic: true, offsetTop: 18 },
    { type: 'divider', size: 1, color: 'grey', offsetTop: 8, offsetBottom: 12 },

    { prop: 'number1', type: 'number'},
    { prop: 'number2', type: 'number', title: 'Number title:' },
    { prop: 'number3', type: 'number', title: 'Number title: 55%', proportion: '55%' },
    { prop: 'number4', type: 'number', title: 'Number range: 0-100', proportion: '55%', min: 0, max: 100 },
    { prop: 'number5', type: 'number', title: 'Number step: 10', proportion: '55%', step: 10 },

    { prop: 'number6', type: 'number', title: 'Number', proportion: '35%', align: 'left', size: 14, },
    { prop: 'number6', type: 'number', title: 'Number', proportion: '35%', align: 'center', size: 18, },
    { prop: 'number6', type: 'number', title: 'Number', proportion: '35%', align: 'right', size: 24, },

    { prop: 'number6', type: 'number', title: 'Number', proportion: '75%', titleAlign: 'left' },
    { prop: 'number6', type: 'number', title: 'Number', proportion: '75%', titleAlign: 'center' },
    { prop: 'number6', type: 'number', title: 'Number', proportion: '75%', titleAlign: 'right' },

    { prop: 'number6', type: 'number', title: 'Number', proportion: '75%', titleColor: 'red' },
    { prop: 'number6', type: 'number', title: 'Number', proportion: '75%', titleSize: 24 },
  
    { type: 'text', title: 'Checkbox', titleSize: 14, titleColor: 'black', titleBold: true, titleItalic: true,  offsetTop: 18 },
    { type: 'divider', size: 1, color: 'grey', offsetTop: 8, offsetBottom: 12 },
    
    { prop: 'checkbox1', type: 'cb', align: 'left' },
    { prop: 'checkbox1', type: 'cb', align: 'center'  },
    { prop: 'checkbox1', type: 'cb', align: 'right'  },

    { prop: 'checkbox2', type: 'cb', title: 'Checkbox title:' },
    { prop: 'checkbox2', type: 'cb', title: 'Checkbox title: 55%', proportion: '55%', align: 'left' },
    { prop: 'checkbox2', type: 'cb', title: 'Checkbox title: 55%', proportion: '55%', align: 'center' },
    { prop: 'checkbox2', type: 'cb', title: 'Checkbox title: 55%', proportion: '55%', align: 'right' },

    { prop: 'checkbox3', type: 'cb', title: 'Checkbox title: 85%', proportion: '85%', align: 'left', size: 14 },
    { prop: 'checkbox3', type: 'cb', title: 'Checkbox title: 85%', proportion: '85%', align: 'center', size: 18 },
    { prop: 'checkbox3', type: 'cb', title: 'Checkbox title: 85%', proportion: '85%', align: 'right', size: 24 },

    { prop: 'checkbox4', type: 'cb', title: 'Checkbox', proportion: '75%', titleAlign: 'left' },
    { prop: 'checkbox4', type: 'cb', title: 'Checkbox', proportion: '75%', titleAlign: 'center' },
    { prop: 'checkbox4', type: 'cb', title: 'Checkbox', proportion: '75%', titleAlign: 'right' },

    { prop: 'checkbox4', type: 'cb', title: 'Checkbox', proportion: '75%', titleColor: 'red' },
    { prop: 'checkbox4', type: 'cb', title: 'Checkbox', proportion: '75%', titleSize: 24 },

    { type: 'text', title: 'Slider', titleSize: 14, titleColor: 'black', titleBold: true, titleItalic: true,  offsetTop: 18 },
    { type: 'divider', size: 1, color: 'grey', offsetTop: 8, offsetBottom: 12 },

    { prop: 'slider1', type: 'slider' },

    { prop: 'slider2', type: 'slider', title: 'Slider 35%', proportion: '35%' },
    { prop: 'slider2', type: 'slider', title: 'Range: 0-100', proportion: '35%', min: 0, max: 100 },
    { prop: 'slider2', type: 'slider', title: 'Step: 10', proportion: '35%', step: 10, min: 0, max: 100 },
    { prop: 'slider2', type: 'slider', title: 'Marks: 10', proportion: '35%', step: 10, marks: true, min: 0, max: 100},

    { prop: 'slider3', type: 'slider', title: 'Slider', proportion: '60%', titleAlign: 'left' },
    { prop: 'slider4', type: 'slider', title: 'Slider', proportion: '60%', titleAlign: 'center' },
    { prop: 'slider5', type: 'slider', title: 'Slider', proportion: '60%', titleAlign: 'right' },

    { prop: 'slider6', type: 'slider', title: 'Slider', proportion: '60%', titleColor: 'red' },
    { prop: 'slider6', type: 'slider', title: 'Slider', proportion: '60%', titleSize: 24 },

    { type: 'text', title: 'Time', titleSize: 14, titleColor: 'black', titleBold: true, titleItalic: true,  offsetTop: 18 },
    { type: 'divider', size: 1, color: 'grey', offsetTop: 8, offsetBottom: 12 },

    { prop: 'time1', type: 'time' },
    { prop: 'time1', type: 'time', title: 'Time 0%' },
    { prop: 'time2', type: 'time', title: 'Time 45%', proportion: '45%'},
    { prop: 'time3', type: 'time', title: 'Time', proportion: '45%', align: 'left' },
    { prop: 'time3', type: 'time', title: 'Time', proportion: '45%', align: 'center' },
    { prop: 'time3', type: 'time', title: 'Time', proportion: '45%', align: 'right' },
  ],
  data: {
    number1: 0,
    number2: 10,
    number3: 30,
    number4: 50,
    number5: 50,
    number6: 0,
    checkbox1: false,
    checkbox2: true,
    checkbox3: false,
    checkbox4: false,
    slider1: 25,
    slider2: 50,
    slider3: 25,
    slider4: 50,
    slider5: 75,
    slider6: 45,
    time1: 0,
    time2: 10,
    time3: 30,
  },
};


function Devicesettings(props) {
  const settings = props.mode === 'user' ? props.item.data : temp

  const onChange = (type, item, value) => {
    if (item.did !== undefined && item.prop !== undefined) {
      core.tunnel.command({
        uuid: shortid.generate(),
        method: 'action',
        type:'command',
        command: 'setval',
        did: item.did,
        prop: item.prop,
        value,
      });
    }
  }
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize.value * (props.scale || 1)}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
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
        <Form
          key={props.dialogId}
          style={settings.style} 
          schema={settings.schema} 
          data={settings.data} 
          onChange={onChange} 
        />
      </Scrollbars2>
    </div>
  );
}


export default Devicesettings;