const BLOCK = {
  borderSize: 1,
  borderColor: 'rgba(255,0,0,1)',
  backgroundColor: 'transparent',
}

const TEXT = {
  text: 'Text 1',
  textSize: 14,
  textColor: 'rgba(0,0,0,1)',
  borderSize: 1,
  borderColor: 'rgba(0,255,0,1)',
  backgroundColor: 'transparent',
}

const IMAGE = {
  img: 'default.svg',
  borderSize: 1,
  borderColor: 'rgba(0,0,255,1)',
  backgroundColor: 'transparent',
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