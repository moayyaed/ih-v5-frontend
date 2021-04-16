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
      title: 'Input Type', 
      prop: 'inputMode', 
      type: 'droplistlink',
      data: [
        {
          id: 'any',
          title: 'Any'
        },
        {
          id: 'number',
          title: 'Number'
        },
      ]
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
    { 
      title: 'Text Color', 
      prop: 'textColor', 
      type: 'color',
    },
    { 
      title: 'Label Color', 
      prop: 'labelColor', 
      type: 'color',
    },
    { 
      title: 'Label Color Hover', 
      prop: 'labelColorHover', 
      type: 'color',
    },
    { 
      title: 'Underline Color', 
      prop: 'underlineColor', 
      type: 'color',
    },
    { 
      title: 'Underline Color Hover', 
      prop: 'underlineColorHover', 
      type: 'color',
    },
    { 
      title: 'Underline Color Select', 
      prop: 'underlineColorSelect', 
      type: 'color',
    },
    { 
      title: 'Input Color', 
      prop: 'baseColor', 
      type: 'color',
    },
    { 
      title: 'Input Color Hover', 
      prop: 'baseColorHover', 
      type: 'color',
    },
  ],
  move: move,
  link: [],
};


export default slider;
