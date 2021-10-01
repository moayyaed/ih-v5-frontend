import { main } from '../elements';
import move from '../elements/move';


const input = {
  main: main,
  element: [
    { 
      
      prop: '_input', 
      type: 'divider',
    },
    { 
      
      prop: 'fullWidth', 
      type: 'cb',
    },
    { 
      
      prop: 'fullHeight', 
      type: 'cb',
    },
    { 
      
      prop: 'inputMode', 
      type: 'droplistlink',
      data: [
        {
          id: 'any',
         
        },
        {
          id: 'number',
         
        },
      ]
    },
    { 
      
      prop: 'saveMode', 
      type: 'droplistlink',
      data: [
        {
          id: 'permanent',
         
        },
        {
          id: 'outfocus',
         
        },
        {
          id: 'button',
         
        },
      ]
    },
    { 
      
      prop: 'startAdornment', 
      type: 'inputlink',
    },
    { 
      
      prop: 'endAdornment', 
      type: 'inputlink',
    },
    { 
      
      prop: 'placeholder', 
      type: 'inputlink',
    },
    { 
      
      prop: 'textSize', 
      type: 'number',
    },
    { 
      
      prop: 'textColor', 
      type: 'color',
    },

  ],
  move: move,
  link: [],
};


export default input;
