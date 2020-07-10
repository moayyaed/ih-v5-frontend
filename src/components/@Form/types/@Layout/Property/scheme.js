const mainSection = [
  { 
    title: 'Background Color', 
    prop: 'backgroundColor', 
    type: 'color2',
  },
  { 
    title: 'Box Shadow', 
    prop: 'boxShadow', 
    type: 'shadow',
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
    title: 'Text Color', 
    prop: 'textColor', 
    type: 'color',
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
  { 
    title: 'Mouse Down Left', 
    prop: 'mouseDownLeft', 
    type: 'input',
  },
  { 
    title: 'Mouse Up Left', 
    prop: 'mouseUpLeft', 
    type: 'input',
  },
  { 
    title: 'Mouse Down Right', 
    prop: 'mouseDownRight', 
    type: 'input',
  },
  { 
    title: 'Mouse Up Right', 
    prop: 'mouseUpRight', 
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

const groupSettings = {
  main: [
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
  ],
  move: [
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
      type: 'text',
    },
    { 
      title: 'Height', 
      prop: 'h', 
      type: 'text',
    },
  ],
}

const containerSettings = {
  main: [
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
  ],
  move: [
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
  ],
}


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
  text_image: {
    main: mainSection,
    border: borderSection,
    text: textSection,
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
  action: {
    move: moveSection,
    actions: actionsSection,
  },
  template: {
    link: [],
    ...groupSettings,
  },
  content: {
    move: [
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
      { 
        title: 'Scale', 
        prop: 'scale', 
        type: 'number',
      },
      { 
        title: 'Grid', 
        prop: 'grid', 
        type: 'number',
      },
    ],
  },
  group: groupSettings,
  container: containerSettings,
}


export default scheme;