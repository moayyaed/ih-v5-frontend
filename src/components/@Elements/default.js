const BLOCK = {
  borderSize: 1,
  borderRadius: 0,
  borderStyle: { id: 'solid', title: 'Solid' },
  borderColor: 'rgba(0,0,0,1)',
  backgroundColor: { 
    type: 'fill', 
    value: 'transparent', 
    fill: 'transparent',
    angle: 90,
    shape: 'circle',
    positionX: 50,
    positionY: 50,
    extent: 'closest-side',
    palette: [{ offset: '0.00', color: '#4A90E2', opacity: 1 }, { offset: '1.00', color: '#9013FE', opacity: 1 }]
  },
  boxShadow: 'unset',
  zIndex: 100,
  opacity: 100,
}

const RECTANGLE = {
  borderSize: 1,
  borderRadius: 0,
  borderStyle: { id: 'solid', title: 'Solid' },
  borderColor: 'rgba(0,0,0,1)',
  backgroundColor: { 
    type: 'fill', 
    value: 'transparent', 
    fill: 'transparent',
    angle: 90,
    shape: 'circle',
    positionX: 50,
    positionY: 50,
    extent: 'closest-side',
    palette: [{ offset: '0.00', color: '#4A90E2', opacity: 1 }, { offset: '1.00', color: '#9013FE', opacity: 1 }]
  },
  boxShadow: 'unset',
  zIndex: 100,
  opacity: 100,
}

const CIRCLE = {
  borderSize: 1,
  borderRadius: 100,
  borderStyle: { id: 'solid', title: 'Solid' },
  borderColor: 'rgba(0,0,0,1)',
    backgroundColor: { 
    type: 'fill', 
    value: 'transparent', 
    fill: 'transparent',
    angle: 90,
    shape: 'circle',
    positionX: 50,
    positionY: 50,
    extent: 'closest-side',
    palette: [{ offset: '0.00', color: '#4A90E2', opacity: 1 }, { offset: '1.00', color: '#9013FE', opacity: 1 }]
  },
  boxShadow: { active: false, value: 'unset' },
  zIndex: 100,
  opacity: 100,
}

const TEXT = {
  text: 'Text 1',
  textSize: 14,
  textBold: 0,
  textItalic: 0,
  textFontFamily: { id: 'Arial', title: 'Arial' },
  textAlignH: { id: 'center', title: 'Center' },
  textAlignV: { id: 'center', title: 'Center' },
  textRotate: 0,
  textColor: 'rgba(0,0,0,1)',
  borderSize: 1,
  borderRadius: 0,
  borderStyle: { id: 'solid', title: 'Solid' },
  borderColor: 'rgba(0,255,0,1)',
    backgroundColor: { 
    type: 'fill', 
    value: 'transparent', 
    fill: 'transparent',
    angle: 90,
    shape: 'circle',
    positionX: 50,
    positionY: 50,
    extent: 'closest-side',
    palette: [{ offset: '0.00', color: '#4A90E2', opacity: 1 }, { offset: '1.00', color: '#9013FE', opacity: 1 }]
  },
  boxShadow: 'unset',
  zIndex: 100,
  opacity: 100,
}

const IMAGE = {
  img: 'https://ih-systems.com/wp-content/uploads/2018/08/lamp210.svg',
  imgColor: 'transparent',
  imgSize: 0,
  imgRotate: 0,
  borderSize: 1,
  borderRadius: 0,
  borderStyle: { id: 'solid', title: 'Solid' },
  borderColor: 'rgba(0,0,255,1)',
    backgroundColor: { 
    type: 'fill', 
    value: 'transparent', 
    fill: 'transparent',
    angle: 90,
    shape: 'circle',
    positionX: 50,
    positionY: 50,
    extent: 'closest-side',
    palette: [{ offset: '0.00', color: '#4A90E2', opacity: 1 }, { offset: '1.00', color: '#9013FE', opacity: 1 }]
  },
  boxShadow: 'unset',
  zIndex: 100,
  opacity: 100,
}

const TEXT_IMAGE = {
  text: 'Text 1',
  textSize: 14,
  textBold: 0,
  textItalic: 0,
  textFontFamily: { id: 'Arial', title: 'Arial' },
  textAlignH: { id: 'center', title: 'Center' },
  textAlignV: { id: 'center', title: 'Center' },
  textRotate: 0,
  textColor: 'rgba(0,0,0,1)',
  img: 'https://ih-systems.com/wp-content/uploads/2018/08/lamp210.svg',
  imgColor: 'transparent',
  imgSize: 0,
  imgRotate: 0,
  borderSize: 1,
  borderRadius: 0,
  borderStyle: { id: 'solid', title: 'Solid' },
  borderColor: 'rgba(0,255,0,1)',
    backgroundColor: { 
    type: 'fill', 
    value: 'transparent', 
    fill: 'transparent',
    angle: 90,
    shape: 'circle',
    positionX: 50,
    positionY: 50,
    extent: 'closest-side',
    palette: [{ offset: '0.00', color: '#4A90E2', opacity: 1 }, { offset: '1.00', color: '#9013FE', opacity: 1 }]
  },
  singleClickLeft: 'TOGGLE',
  doubleClickLeft: '',
  longClickLeft: 'DEVICEMENU',
  singleClickRight: '',
  doubleClickRight: '',
  longClickRight: '',
  mouseDown: '',
  mouseUp: '',
  boxShadow: 'unset',
  zIndex: 100,
  opacity: 100,
}

const BUTTON = {
  text: 'Text 1',
  textSize: 14,
  textBold: 0,
  textItalic: 0,
  textFontFamily: { id: 'Arial', title: 'Arial' },
  textAlignH: { id: 'center', title: 'Center' },
  textAlignV: { id: 'center', title: 'Center' },
  textRotate: 0,
  textColor: 'rgba(0,0,0,1)',
  img: 'https://ih-systems.com/wp-content/uploads/2018/08/lamp210.svg',
  imgColor: 'transparent',
  imgSize: 0,
  imgRotate: 0,
  borderSize: 1,
  borderRadius: 0,
  borderStyle: { id: 'solid', title: 'Solid' },
  borderColor: 'rgba(0,255,0,1)',
    backgroundColor: { 
    type: 'fill', 
    value: 'transparent', 
    fill: 'transparent',
    angle: 90,
    shape: 'circle',
    positionX: 50,
    positionY: 50,
    extent: 'closest-side',
    palette: [{ offset: '0.00', color: '#4A90E2', opacity: 1 }, { offset: '1.00', color: '#9013FE', opacity: 1 }]
  },
  colorRipple: 'rgba(255,255,255,1)',
  singleClickLeft: 'TOGGLE',
  doubleClickLeft: '',
  longClickLeft: 'DEVICEMENU',
  singleClickRight: '',
  doubleClickRight: '',
  longClickRight: '',
  mouseDownLeft: '',
  mouseUpLeft: '',
  mouseDownLeft: '',
  mouseUpLeft: '',
  boxShadow: 'unset',
  zIndex: 100,
  opacity: 100,
}

const ACTION = {
  colorRipple: 'rgba(255,255,255,1)',
  singleClickLeft: 'TOGGLE',
  doubleClickLeft: '',
  longClickLeft: 'DEVICEMENU',
  singleClickRight: '',
  doubleClickRight: '',
  longClickRight: '',
  mouseDownLeft: '',
  mouseUpLeft: '',
  mouseDownLeft: '',
  mouseUpLeft: '',
  zIndex: 10000,
}

const GROUP = {
  zIndex: 100,
  opacity: 100,
}


function getDefaultParams(type) {
  switch (type) {
    case 'rectangle':
      return RECTANGLE;
    case 'circle':
      return CIRCLE
    case 'text':
      return TEXT;
    case 'image':
      return IMAGE;
    case 'button':
      return BUTTON;
    case 'text_image':
      return TEXT_IMAGE;
    case 'template':
    case 'container':
    case 'group':
      return GROUP;
    case 'action':
      return ACTION;
    default:
      return BLOCK;
  }
}


export default getDefaultParams;