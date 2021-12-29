
const BLOCK = {

}

const RECTANGLE = {
  backgroundColor: { value: 'transparent' },
  borderColor: { value: 'rgba(0,0,0,1)' } ,
  borderSize: { value: 1 },
  borderRadius: { value: 0 },
  borderStyle: { value: { id: 'solid', title: 'Solid' } },
}

const CIRCLE = {
  backgroundColor: { value: 'transparent' },
  borderColor: { value: 'rgba(0,0,0,1)' } ,
  borderSize: { value: 1 },
  borderRadius: { value: 100 },
  borderStyle: { value: { id: 'solid', title: 'Solid' } },
}

const TEXT = {
  text: { value: 'Text 1'},
  textSize: { value: 14 },
  textBold: { value: 0 },
  textItalic: { value: 0 },
}

const IMAGE = {
  img: { folder: 'imgsystem', value: 'noimage.svg' },
}

const TABLE = {

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
    case 'table':
      return TABLE;
    default:
      return BLOCK;
  }
}


export default getDefaultParams;