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

const mainSection = [
  { 
    title: 'Background Color', 
    prop: 'backgroundColor', 
    type: 'color',
  },
  { 
    title: 'Border Color', 
    prop: 'borderColor', 
    type: 'color',
  },
  { 
    title: 'Border Size', 
    prop: 'borderSize', 
    type: 'slider',
  }
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
  }
];

const imageSection = [
  { 
    title: 'Image URL', 
    prop: 'img', 
    type: 'url',
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


const scheme = {
  block: {
    main: mainSection,
    move: moveSection,
  },
  text: {
    main: mainSection,
    text: textSection,
    move: moveSection,
  },
  image: {
    main: mainSection,
    image: imageSection,
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