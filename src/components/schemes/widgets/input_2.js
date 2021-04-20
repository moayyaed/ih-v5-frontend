import { main } from '../elements';
import move from '../elements/move';


const input = {
  main: main,
  element: [
    { 
      title: 'Input', 
      prop: 'input', 
      type: 'divider',
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
      title: 'Placeholder', 
      prop: 'placeholder', 
      type: 'inputlink',
    },
    { 
      title: 'Text Size', 
      prop: 'textSize', 
      type: 'number',
    },
    { 
      title: 'Text Color', 
      prop: 'textColor', 
      type: 'color',
    },
    { 
      title: 'Base Color', 
      prop: 'normalColor', 
      type: 'color',
    },
    { 
      title: 'Hover Color', 
      prop: 'hoverColor', 
      type: 'color',
    },
    { 
      title: 'Active Color', 
      prop: 'activeColor', 
      type: 'color',
    },
  ],
  move: move,
  link: [],
};


export default input;
