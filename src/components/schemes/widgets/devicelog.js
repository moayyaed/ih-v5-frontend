import { main } from '../elements';
import move from '../elements/move';


const devicelog = {
  main: main,
  move: move.concat([
    { 
      title: 'Expand', 
      prop: 'expand', 
      type: 'cb',
      bind: false,
    },
  ]),
  link: [],
};


export default devicelog;