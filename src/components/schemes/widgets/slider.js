import { main } from '../elements';
import move from '../elements/move';


const slider = {
  main: main,
  element: [
    { 
      title: 'Slider', 
      prop: 'slider', 
      type: 'divider',
    },
    { 
      title: 'Auto Hide Label', 
      prop: 'autoHideLabel', 
      type: 'cb',
    },
    { 
      title: 'Label Seize', 
      prop: 'labelSize', 
      type: 'number',
    },
    { 
      title: 'Label Color', 
      prop: 'labelColor', 
      type: 'color',
    },
    { 
      title: 'Track Color Left', 
      prop: 'trackColorLeft', 
      type: 'color',
    },
    { 
      title: 'Track Color Right', 
      prop: 'trackColorRight', 
      type: 'color',
    },
    { 
      title: 'Thumb Color', 
      prop: 'thumbColor', 
      type: 'color',
    },
  ],
  move: move,
  link: [],
};


export default slider;
