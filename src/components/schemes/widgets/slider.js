import { main } from '../elements';
import move from '../elements/move';


const slider = {
  main: main,
  element: [
    { 
      
      prop: '_slider', 
      type: 'divider',
    },
    { 
      
      prop: 'autoHideLabel', 
      type: 'cb',
    },
    { 
      
      prop: 'labelSize', 
      type: 'number',
    },
    { 
      
      prop: 'labelColor', 
      type: 'color',
    },
    { 
      
      prop: 'trackColorLeft', 
      type: 'color',
    },
    { 
      
      prop: 'trackColorRight', 
      type: 'color',
    },
    { 
      
      prop: 'thumbColor', 
      type: 'color',
    },
  ],
  move: move,
  link: [],
};


export default slider;
