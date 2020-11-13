import elements from './elements';
import widgets from './widgets';
import dynamic from './dynamic';

import contents from './contents';


const scheme = {
  ...elements,
  ...widgets,
  ...contents,
  
  dynamic,
  listActions: [
    'singleClickLeft', 'doubleClickLeft', 'longClickLeft', 
    'mouseDownLeft', 'mouseUpLeft', 'singleClickRight',
  ],
}


export default scheme;