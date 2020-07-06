const BLOCK = {
  borderSize: 1,
  borderRadius: 0,
  borderStyle: { id: 'solid', title: 'Solid' },
  borderColor: 'rgba(0,0,0,1)',
  backgroundColor: 'transparent',
  boxShadow: 'unset',
  zIndex: 100,
  opacity: 100,
}

const RECTANGLE = {
  borderSize: 1,
  borderRadius: 0,
  borderStyle: { id: 'solid', title: 'Solid' },
  borderColor: 'rgba(0,0,0,1)',
  backgroundColor: 'transparent',
  boxShadow: 'unset',
  zIndex: 100,
  opacity: 100,
}

const CIRCLE = {
  borderSize: 1,
  borderRadius: 100,
  borderStyle: { id: 'solid', title: 'Solid' },
  borderColor: 'rgba(0,0,0,1)',
  backgroundColor: 'transparent',
  boxShadow: 'unset',
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
  backgroundColor: 'transparent',
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
  backgroundColor: 'transparent',
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
  backgroundColor: 'transparent',
  singleClickLeft: 'TOGGLE',
  doubleClickLeft: '',
  longClickLeft: 'DEVICEMENU',
  singleClickRight: '',
  doubleClickRight: '',
  longClickRight: '',
  boxShadow: 'unset',
  zIndex: 100,
  opacity: 100,
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
    case 'template':
    case 'container':
    case 'group':
      return GROUP;
    default:
      return BLOCK;
  }
}


export default getDefaultParams;