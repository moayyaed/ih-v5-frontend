import { main } from '../elements';
import move from '../elements/move';


const slider = {
  main: main,
  element: [
    { 
      
      prop: '_checkbox', 
      type: 'divider',
    },
    { 
      
      prop: 'label', 
      type: 'inputlink',
    },
    { 
      
      prop: 'labelPlacement', 
      type: 'droplistlink',
      data: [
        {
          id: 'none',
         
        },
        {
          id: 'top',
         
        },
        {
          id: 'start',
         
        },
        {
          id: 'end',
         
        },
        {
          id: 'bottom',
         
        },
      ]
    },
  ],
  move: move,
  link: [],
};


export default slider;
