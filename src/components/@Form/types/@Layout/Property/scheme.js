const backgroundSection = [
  { 
    title: 'Background', 
    prop: 'background', 
    type: 'divider',
  },
  { 
    title: 'Color', 
    prop: 'backgroundColor', 
    type: 'color2',
  },
  { 
    title: 'Image', 
    prop: 'backgroundImage', 
    type: 'input',
  },
]

const borderSection = [
  { 
    title: 'Border', 
    prop: 'border', 
    type: 'divider',
  },
  { 
    title: 'Color', 
    prop: 'borderColor', 
    type: 'color',
  },
  { 
    title: 'Size', 
    prop: 'borderSize', 
    type: 'number',
    min: 0,
    max: 5000,
  },
  { 
    title: 'Radius', 
    prop: 'borderRadius', 
    type: 'number',
    step: 10,
    min: 0,
    max: 100,
  },
  { 
    title: 'Style', 
    prop: 'borderStyle', 
    type: 'droplistlink',
    data: [
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
]

const decorationSection = [
  { 
    title: 'Decoration', 
    prop: 'decoration', 
    type: 'divider',
  },
  { 
    title: 'Shadow', 
    prop: 'boxShadow', 
    type: 'shadow',
  },
  { 
    title: 'Opacity', 
    prop: 'opacity', 
    type: 'number',
    step: 5,
    min: 0,
    max: 100,
  },
];

const textSection = [
  { 
    title: 'Text', 
    prop: 'dividertext', 
    type: 'divider',
  },
  { 
    title: 'Value', 
    prop: 'text', 
    type: 'inputlink',
  },
  { 
    title: 'Color', 
    prop: 'textColor', 
    type: 'color',
  },
  { 
    title: 'Size', 
    prop: 'textSize', 
    type: 'number',
    min: 0,
    max: 5000,
  },
  { 
    title: 'Bold', 
    prop: 'textBold', 
    type: 'cb',
  },
  { 
    title: 'Italic', 
    prop: 'textItalic', 
    type: 'cb',
  },
  { 
    title: 'Font', 
    prop: 'textFontFamily',
    type: 'droplistlink',
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
    title: 'Horizontal',
    type: 'droplistlink',
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
    title: 'Vertical',
    type: 'droplistlink',
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
    title: 'Rotate', 
    prop: 'textRotate', 
    type: 'number',
    step: 10,
    min: 0,
    max: 360,
  }
];

const imageSection = [
  { 
    title: 'Image', 
    prop: 'image', 
    type: 'divider',
  },
  { 
    title: 'URL', 
    prop: 'img', 
    type: 'input',
  },
  { 
    title: 'Color', 
    prop: 'imgColor', 
    type: 'color',
  },
  { 
    title: 'Size', 
    prop: 'imgSize', 
    type: 'number',
    min: -100,
    max: 100,
  },
  { 
    title: 'Rotate', 
    prop: 'imgRotate', 
    type: 'number',
    step: 10,
    min: 0,
    max: 360,
  }
];

const actionsSection = [
  { 
    title: 'Mouse Left', 
    prop: 'mouseleft', 
    type: 'divider',
  },
  { 
    title: 'Single Click', 
    prop: 'singleClickLeft', 
    type: 'input',
  },
  { 
    title: 'Double Click', 
    prop: 'doubleClickLeft', 
    type: 'input',
  },
  { 
    title: 'Long Click', 
    prop: 'longClickLeft', 
    type: 'input',
  },
  { 
    title: 'Mouse Down', 
    prop: 'mouseDownLeft', 
    type: 'input',
  },
  { 
    title: 'Mouse Up', 
    prop: 'mouseUpLeft', 
    type: 'input',
  },
  { 
    title: 'Mouse Right', 
    prop: 'mouseright', 
    type: 'divider',
  },
  { 
    title: 'Single Click', 
    prop: 'singleClickRight', 
    type: 'input',
  },
  { 
    title: 'Effect ', 
    prop: 'effect', 
    type: 'divider',
  },
  { 
    title: 'Color Ripple', 
    prop: 'colorRipple', 
    type: 'color',
  },
];

const moveSection = [
  { 
    title: 'Position', 
    prop: 'position', 
    type: 'divider',
  },
  { 
    title: 'X', 
    prop: 'x', 
    type: 'number',
  },
  { 
    title: 'Y', 
    prop: 'y', 
    type: 'number',
  },
  { 
    title: 'W', 
    prop: 'w', 
    type: 'number',
  },
  { 
    title: 'H', 
    prop: 'h', 
    type: 'number',
  },
  { 
    title: 'Z-index', 
    prop: 'zIndex', 
    type: 'number',
    min: -100,
    max: 5000,
  },
  { 
    title: 'Transform', 
    prop: 'transform', 
    type: 'divider',
  },
  { 
    title: 'Flip H', 
    prop: 'flipH', 
    type: 'cb',
  },
  { 
    title: 'Flip V', 
    prop: 'flipV', 
    type: 'cb',
  },
  { 
    title: 'Rotate', 
    prop: 'rotate', 
    type: 'number',
    step: 10,
    min: 0,
    max: 360,
  },
  { 
    title: 'Transform-origin', 
    prop: 'transformOrigin', 
    type: 'droplistlink',
    data: [
      {
        id: 'center',
        title: 'Center'
      },
      {
        id: 'top',
        title: 'Top'
      },
      {
        id: 'bottom',
        title: 'Bottom'
      },
      {
        id: 'left',
        title: 'Left'
      },
      {
        id: 'right',
        title: 'Right'
      }
    ]
  }
];

const groupSettings = {
  main: [
    { 
      title: 'Decoration', 
      prop: 'decoration', 
      type: 'divider',
    },
    { 
      title: 'Opacity', 
      prop: 'opacity', 
      type: 'number',
      step: 5,
      min: 0,
      max: 100,
    },
  ],
  move: [
    { 
      title: 'Position', 
      prop: 'position', 
      type: 'divider',
    },
    { 
      title: 'X', 
      prop: 'x', 
      type: 'number',
    },
    { 
      title: 'Y', 
      prop: 'y', 
      type: 'number',
    },
    { 
      title: 'W', 
      prop: 'w', 
      type: 'text',
    },
    { 
      title: 'H', 
      prop: 'h', 
      type: 'text',
    },
    { 
      title: 'Z-index', 
      prop: 'zIndex', 
      type: 'number',
      min: -100,
      max: 5000,
    },
  ],
}

const containerSettings = {
  main: [
    { 
      title: 'Decoration', 
      prop: 'decoration', 
      type: 'divider',
    },
    { 
      title: 'Opacity', 
      prop: 'opacity', 
      type: 'number',
      step: 5,
      min: 0,
      max: 100,
    },
  ],
  move: [
    { 
      title: 'Position', 
      prop: 'position', 
      type: 'divider',
    },
    { 
      title: 'X', 
      prop: 'x', 
      type: 'number',
    },
    { 
      title: 'Y', 
      prop: 'y', 
      type: 'number',
    },
    { 
      title: 'W', 
      prop: 'w', 
      type: 'number',
    },
    { 
      title: 'H', 
      prop: 'h', 
      type: 'number',
    },
    { 
      title: 'Z-index', 
      prop: 'zIndex', 
      type: 'number',
      min: -100,
      max: 5000,
    },
  ],
}


const scheme = {
  block: {
    main: [
      ...backgroundSection,
      ...borderSection,
      ...decorationSection,
    ],
    move: moveSection,
  },
  rectangle: {
    main: [
      ...backgroundSection,
      ...borderSection,
      ...decorationSection,
    ],
    move: moveSection,
  },
  circle: {
    main: [
      ...backgroundSection,
      ...borderSection,
      ...decorationSection,
    ],
    move: moveSection,
  },
  text: {
    main: [
      ...backgroundSection,
      ...borderSection,
      ...textSection,
      ...decorationSection,
    ],
    move: moveSection,
  },
  image: {
    main: [
      ...backgroundSection,
      ...borderSection,
      ...imageSection,
      ...decorationSection,
    ],
    move: moveSection,
  },
  text_image: {
    main: [
      ...backgroundSection,
      ...borderSection,
      ...textSection,
      ...imageSection,
      ...decorationSection,
    ],
    move: moveSection,
  },
  button: {
    main: [
      ...backgroundSection,
      ...borderSection,
      ...textSection,
      ...imageSection,
      ...decorationSection,
    ],
    actions: actionsSection,
    move: moveSection,
  },
  template: {
    link: [],
    actions: [],
    ...groupSettings,
  },
  action: {
    move: [
      { 
        title: 'Position', 
        prop: 'position', 
        type: 'divider',
      },
      { 
        title: 'X', 
        prop: 'x', 
        type: 'number',
      },
      { 
        title: 'Y', 
        prop: 'y', 
        type: 'number',
      },
      { 
        title: 'W', 
        prop: 'w', 
        type: 'number',
      },
      { 
        title: 'H', 
        prop: 'h', 
        type: 'number',
      },
    ],
    actions: actionsSection,
  },
  content: {
    move: [
      { 
        title: 'Position', 
        prop: 'position', 
        type: 'divider',
      },
      { 
        title: 'X', 
        prop: 'x', 
        type: 'number',
      },
      { 
        title: 'Y', 
        prop: 'y', 
        type: 'number',
      },
      { 
        title: 'W', 
        prop: 'w', 
        type: 'number',
      },
      { 
        title: 'H', 
        prop: 'h', 
        type: 'number',
      },
      { 
        title: 'Settings', 
        prop: 'settings', 
        type: 'divider',
      },
      { 
        title: 'Scale', 
        prop: 'scale', 
        type: 'number',
        step: 0.1,
        min: 0.1,
        max: 8,
      },
      { 
        title: 'Grid', 
        prop: 'grid', 
        type: 'number',
        step: 1,
        min: 1,
        max: 100,
      },
    ],
  },
  group: groupSettings,
  container: containerSettings,
  listActions: [
    'singleClickLeft', 'doubleClickLeft', 'longClickLeft', 
    'mouseDownLeft', 'mouseUpLeft', 'singleClickRight',
  ],
}


export default scheme;