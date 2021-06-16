import { main } from '../elements';
import move from '../elements/move';


const chart = {
  element: [
    { 
      title: 'Buttons', 
      prop: 'buttons', 
      type: 'divider',
    },
    { 
      title: 'Sync', 
      prop: 'buttonSync', 
      type: 'cb',
    },
    { 
      title: 'Home', 
      prop: 'buttonHome', 
      type: 'cb',
    },
    { 
      title: 'Date', 
      prop: 'buttonDate', 
      type: 'cb',
    },
    { 
      title: 'Navigate', 
      prop: 'buttonNavigate', 
      type: 'cb',
    },
    { 
      title: 'Size', 
      prop: 'buttonSize', 
      type: 'number',
    },
    { 
      title: 'Color', 
      prop: 'buttonsColor', 
      type: 'color',
    },
  ],
  main: main,
  move: move,
};


export default chart;
