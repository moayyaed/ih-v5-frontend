import { main } from '../elements';
import move from '../elements/move';


const slider = {
  main: main,
  element: [
    { 
      title: 'Checkbox', 
      prop: 'checkbox', 
      type: 'divider',
    },
    { 
      title: 'Label', 
      prop: 'label', 
      type: 'inputlink',
    },
    { 
      title: 'Label Placement', 
      prop: 'labelPlacement', 
      type: 'droplistlink',
      data: [
        {
          id: 'none',
          title: 'None'
        },
        {
          id: 'top',
          title: 'Top'
        },
        {
          id: 'start',
          title: 'Left'
        },
        {
          id: 'end',
          title: 'Right'
        },
        {
          id: 'bottom',
          title: 'Bottom'
        },
      ]
    },
  ],
  move: move,
  link: [],
};


export default slider;
