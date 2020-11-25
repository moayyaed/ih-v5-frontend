import elements from './elements';
import widgets from './widgets';
import dynamic from './dynamic';
import dynamic_dialog from './dynamic_dialog';

import contents from './contents';


const scheme = {
  ...elements,
  ...widgets,
  ...contents,
  
  dynamic,
  dynamic_dialog,
  listActions: [
    'singleClickLeft', 'doubleClickLeft', 'longClickLeft', 
    'mouseDownLeft', 'mouseUpLeft', 'singleClickRight',
  ],
}


export default scheme;