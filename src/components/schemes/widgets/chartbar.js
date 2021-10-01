import { main } from '../elements';
import move from '../elements/move';


const chart = {
  element: [
    { 
      
      prop: '_buttons', 
      type: 'divider',
    },
    { 
      
      prop: 'buttonSync', 
      type: 'cb',
    },
    { 
      
      prop: 'buttonHome', 
      type: 'cb',
    },
    { 
      
      prop: 'buttonDate', 
      type: 'cb',
    },
    { 
      
      prop: 'buttonNavigate', 
      type: 'cb',
    },
    { 
      
      prop: 'buttonSize', 
      type: 'number',
    },
    { 
      
      prop: 'buttonsColor', 
      type: 'color',
    },
  ],
  main: main,
  move: move,
};


export default chart;
