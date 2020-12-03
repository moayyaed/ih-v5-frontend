import { main } from '../elements';
import move from '../elements/move';


const slider = {
  main: main,
  element: [
    { 
      title: 'Input', 
      prop: 'input', 
      type: 'divider',
    },
    { 
      title: 'Variant', 
      prop: 'variant', 
      type: 'droplistlink',
      data: [
        {
          id: 'minimal',
          title: 'Minimal'
        },
        {
          id: 'standard',
          title: 'Standard'
        },
        {
          id: 'filled',
          title: 'Filled'
        },
        {
          id: 'outlined',
          title: 'Outlined'
        },
      ]
    },
    { 
      title: 'Label', 
      prop: 'label', 
      type: 'inputlink',
    },
    { 
      title: 'Placeholder', 
      prop: 'placeholder', 
      type: 'inputlink',
    },
    { 
      title: 'Start Adornment', 
      prop: 'startAdornment', 
      type: 'inputlink',
    },
    { 
      title: 'End Adornment', 
      prop: 'endAdornment', 
      type: 'inputlink',
    },
    { 
      title: 'Size', 
      prop: 'size', 
      type: 'droplistlink',
      data: [
        {
          id: 'small',
          title: 'Small'
        },
        {
          id: 'medium',
          title: 'Medium'
        },
      ]
    },
    { 
      title: 'Full Width', 
      prop: 'fullWidth', 
      type: 'cb',
    },
    { 
      title: 'Full Height', 
      prop: 'fullHeight', 
      type: 'cb',
    },
    { 
      title: 'Save Mode', 
      prop: 'saveMode', 
      type: 'droplistlink',
      data: [
        {
          id: 'permanent',
          title: 'Permanent'
        },
        {
          id: 'outfocus',
          title: 'Out Focus'
        },
        {
          id: 'button',
          title: 'Button Confirm'
        },
      ]
    },
  ],
  move: move,
  link: [],
};


export default slider;
