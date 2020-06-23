const BLOCK = {
  borderSize: 1,
  borderColor: 'rgba(0,0,0,1)',
  backgroundColor: 'transparent',
  zIndex: 100,
}

const TEXT = {
  text: 'Text 1',
  textSize: 14,
  textAlignH: { id: 'center', title: 'Center' },
  textAlignV: { id: 'center', title: 'Center' },
  textColor: 'rgba(0,0,0,1)',
  borderSize: 1,
  borderColor: 'rgba(0,255,0,1)',
  backgroundColor: 'transparent',
  zIndex: 100,
}

const IMAGE = {
  img: 'https://ih-systems.com/wp-content/uploads/2018/08/lamp210.svg',
  imgSize: 0,
  imgRotate: 0,
  borderSize: 1,
  borderColor: 'rgba(0,0,255,1)',
  backgroundColor: 'transparent',
  zIndex: 100,
}


function getDefaultParams(type) {
  switch (type) {
    case 'text':
      return TEXT;
    case 'image':
      return IMAGE;
    default:
      return BLOCK;
  }
}


export default getDefaultParams;