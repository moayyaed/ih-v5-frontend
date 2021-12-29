import rectangle from './rectangle';
import circle from './circle';
import image from './image';
import text from './text';

const move = [
  { 
    
    prop: '_position', 
    type: 'divider',
  },
  { 
    
    prop: 'x', 
    type: 'number',
  },
  { 
    
    prop: 'y', 
    type: 'number',
  },
  { 
    
    prop: 'w', 
    type: 'number',
  },
  { 
    
    prop: 'h', 
    type: 'number',
  },
];

const content2 = {
  main: [],
  move: [
    { 
      
      prop: '_position', 
      type: 'divider',
    },
    { 
      
      prop: 'w', 
      type: 'number',
      bind: false,
    },
    { 
      
      prop: 'h', 
      type: 'number',
      bind: false,
    },
  ],
};


const scheme = {
  rectangle,
  circle,
  image,
  text,

  settings: [
    { 
      
      prop: '_settings_dev', 
      type: 'divider',
    },
    { 
      
      prop: 'grid', 
      type: 'number',
      step: 1,
      min: 1,
      max: 100,
      bind: false,
    },
    { 
      
      prop: 'scale', 
      type: 'number',
      step: 0.1,
      min: 0.1,
      max: 8,
      bind: false,
    },
  ],
  table: { 
    main: [],
    move: move 
  },
  group: { 
    main: [],
    move: move 
  },
  content2,
}


export default scheme;