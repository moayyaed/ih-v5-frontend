const mainSection = [
  { 
    title: 'Background Color', 
    prop: 'backgroundColor', 
    type: 'color',
  },
  { 
    title: 'Opacity', 
    prop: 'opacity', 
    type: 'number',
  },
  { 
    title: 'Z-index', 
    prop: 'zIndex', 
    type: 'number',
  },
];

const borderSection = [
  { 
    title: 'Border Color', 
    prop: 'borderColor', 
    type: 'color',
  },
  { 
    title: 'Border Size', 
    prop: 'borderSize', 
    type: 'number',
  },
  { 
    title: 'Border Radius', 
    prop: 'borderRadius', 
    type: 'number',
  },
  { 
    title: 'Border Style', 
    prop: 'borderStyle', 
    type: 'droplist',
    data: [
      {
        id: 'hidden',
        title: 'Hidden'
      },
      {
        id: 'dotted',
        title: 'Dotted'
      },
      {
        id: 'dashed',
        title: 'Dashed'
      },
      {
        id: 'solid',
        title: 'Solid'
      },
      {
        id: 'groove',
        title: 'Groove'
      },
      {
        id: 'ridge',
        title: 'Ridge'
      },
      {
        id: 'inset',
        title: 'Inset'
      },
      {
        id: 'outset',
        title: 'Outset'
      },
    ]
  },
];

const textSection = [
  { 
    title: 'Text', 
    prop: 'text', 
    type: 'input',
  },
  { 
    title: 'Text Size', 
    prop: 'textSize', 
    type: 'input',
  },
  { 
    title: 'Text Bold', 
    prop: 'textBold', 
    type: 'cb',
  },
  { 
    title: 'Text Italic', 
    prop: 'textItalic', 
    type: 'cb',
  },
  { 
    title: 'Text Font', 
    prop: 'textFontFamily',
    type: 'droplist',
    data: [
      {
        id: 'Arial',
        title: 'Arial'
      },
      {
        id: 'Serif',
        title: 'Serif'
      },
      {
        id: 'Sans-serif',
        title: 'Sans-serif'
      },
      {
        id: 'Monospace',
        title: 'Monospace'
      }
    ]
  },
  {
    prop: 'textAlignH',
    title: 'Horizontal Alignment',
    type: 'droplist',
    data: [
      {
        id: 'flex-start',
        title: 'Left'
      },
      {
        id: 'center',
        title: 'Center'
      },
      {
        id: 'flex-end',
        title: 'Right'
      }
    ]
  },
  {
    prop: 'textAlignV',
    title: 'Vertical Alignment',
    type: 'droplist',
    data: [
      {
        id: 'flex-start',
        title: 'Top'
      },
      {
        id: 'center',
        title: 'Center'
      },
      {
        id: 'flex-end',
        title: 'Bottom'
      }
    ]
  },
  { 
    title: 'Text Rotate', 
    prop: 'textRotate', 
    type: 'slider',
    min: 0,
    max: 360,
  }
];

const imageSection = [
  { 
    title: 'Image URL', 
    prop: 'img', 
    type: 'url',
  },
  { 
    title: 'Image Color', 
    prop: 'imgColor', 
    type: 'color',
  },
  { 
    title: 'Image Size', 
    prop: 'imgSize', 
    type: 'slider',
    min: -100,
    max: 100,
  },
  { 
    title: 'Image Rotate', 
    prop: 'imgRotate', 
    type: 'slider',
    min: 0,
    max: 360,
  }
];

const actionsSection = [
  { 
    title: 'Single Click Left', 
    prop: 'singleClickLeft', 
    type: 'input',
  },
  { 
    title: 'Double Click Left', 
    prop: 'doubleClickLeft', 
    type: 'input',
  },
  { 
    title: 'Long Click Left', 
    prop: 'longClickLeft', 
    type: 'input',
  },
  { 
    title: 'Single Click Right', 
    prop: 'singleClickRight', 
    type: 'input',
  },
  { 
    title: 'Double Click Right', 
    prop: 'doubleClickRight', 
    type: 'input',
  },
  { 
    title: 'Long Click Right', 
    prop: 'longClickRight', 
    type: 'input',
  },
];

const moveSection = [
  { 
    title: 'Position X', 
    prop: 'x', 
    type: 'number',
  },
  { 
    title: 'Position Y', 
    prop: 'y', 
    type: 'number',
  },
  { 
    title: 'Width', 
    prop: 'w', 
    type: 'number',
  },
  { 
    title: 'Height', 
    prop: 'h', 
    type: 'number',
  },
];


const scheme = {
  block: {
    main: mainSection,
    border: borderSection,
    move: moveSection,
  },
  rectangle: {
    main: mainSection,
    border: borderSection,
    move: moveSection,
  },
  circle: {
    main: mainSection,
    border: borderSection,
    move: moveSection,
  },
  text: {
    main: mainSection,
    border: borderSection,
    text: textSection,
    move: moveSection,
  },
  image: {
    main: mainSection,
    border: borderSection,
    image: imageSection,
    move: moveSection,
  },
  button: {
    main: mainSection,
    border: borderSection,
    text: textSection,
    image: imageSection,
    actions: actionsSection,
    move: moveSection,
  },
  template: {
    link: [],
    move: moveSection,
  },
  content: {
    move: moveSection,
  },
  group: {},
}


export default scheme;