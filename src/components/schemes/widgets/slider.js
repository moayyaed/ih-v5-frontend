import { main } from '../elements';
import move from '../elements/move';


const slider = {
  main: [
    { 
      title: 'Slider', 
      prop: 'slider', 
      type: 'divider',
    },
    { 
      title: 'Variant', 
      prop: 'variant', 
      type: 'droplistlink',
      data: [
        {
          id: 'material',
          title: 'Material'
        },
        {
          id: 'ios',
          title: 'Ios'
        },
        {
          id: 'pretto',
          title: 'Pretto'
        },
        {
          id: 'airbnb',
          title: 'Airbnb'
        },
      ]
    },
    ...main,
  ],
  move: move,
  link: [],
};


export default slider;
