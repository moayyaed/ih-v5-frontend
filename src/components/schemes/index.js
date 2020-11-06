import elements from './elements';
import widgets from './widgets';

import contents from './contents';


const scheme = {
  ...elements,
  ...widgets,
  ...contents,
  listActions: [
    'singleClickLeft', 'doubleClickLeft', 'longClickLeft', 
    'mouseDownLeft', 'mouseUpLeft', 'singleClickRight',
  ],
}


export default scheme;