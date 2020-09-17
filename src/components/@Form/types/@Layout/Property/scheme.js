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
    title: 'Animation', 
    prop: 'animation', 
    type: 'animation',
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

const effectSection = [
  { 
    title: 'Color Hover', 
    prop: 'colorHover', 
    type: 'color',
  },
  { 
    title: 'Color Ripple', 
    prop: 'colorRipple', 
    type: 'color',
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
    title: 'Source', 
    prop: 'img', 
    type: 'img',
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
    title: 'Color Hover', 
    prop: 'colorHover', 
    type: 'color',
  },
  { 
    title: 'Color Ripple', 
    prop: 'colorRipple', 
    type: 'color',
  },
  
];

const actionsSection2 = [
  { type: 'actions', prop: 'actions' },
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
    title: 'Width From Right', 
    prop: 'w2', 
    type: 'number',
  },
  { 
    title: 'Height From Bottom', 
    prop: 'h2', 
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
    title: 'Crop', 
    prop: 'overflow', 
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
];

const templateSettings = {
  main: [
    { 
      title: 'Decoration', 
      prop: 'decoration', 
      type: 'divider',
    },
    { 
      title: 'Animation', 
      prop: 'animation', 
      type: 'animation',
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
      title: 'Crop', 
      prop: 'overflow', 
      type: 'cb',
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

const groupSettings = {
  main: [
    { 
      title: 'Decoration', 
      prop: 'decoration', 
      type: 'divider',
    },
    { 
      title: 'Animation', 
      prop: 'animation', 
      type: 'animation',
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
      title: 'Width', 
      prop: 'w', 
      type: 'text',
    },
    { 
      title: 'Height', 
      prop: 'h', 
      type: 'text',
    },
    { 
      title: 'Crop', 
      prop: 'overflow', 
      type: 'cb',
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
      title: 'Animation', 
      prop: 'animation', 
      type: 'animation',
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
      title: 'Z-index', 
      prop: 'zIndex', 
      type: 'number',
      min: -100,
      max: 5000,
    },
    { 
      title: 'Crop', 
      prop: 'overflow', 
      type: 'cb',
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
      ...textSection,
      ...backgroundSection,
      ...borderSection,
      ...decorationSection,
    ],
    move: moveSection,
  },
  image: {
    main: [
      ...imageSection,
      ...backgroundSection,
      ...borderSection,
      ...decorationSection,
    ],
    move: moveSection,
  },
  text_image: {
    main: [
      ...textSection,
      ...imageSection,
      ...backgroundSection,
      ...borderSection,
      ...decorationSection,
    ],
    move: moveSection,
  },
  button: {
    main: [
      ...textSection,
      ...imageSection,
      ...backgroundSection,
      ...borderSection,
      ...decorationSection,
      ...effectSection,
    ],
    link: actionsSection2,
    move: moveSection,
  },
  action2: {
    main: [
      ...effectSection,
    ],
    link: actionsSection2,
    move: moveSection,
  },
  template: {
    link: [],
    ...templateSettings,
  },
  devicelog: {
    main: [
      ...backgroundSection,
      ...borderSection,
      ...decorationSection,
    ],
    move: moveSection,
    link: [],
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
        bind: false,
      },
      { 
        title: 'Y', 
        prop: 'y', 
        type: 'number',
        bind: false,
      },
      { 
        title: 'Width', 
        prop: 'w', 
        type: 'number',
        bind: false,
      },
      { 
        title: 'Height', 
        prop: 'h', 
        type: 'number',
        bind: false,
      },
    ],
    actions: actionsSection,
  },
  content: {
    main: [
      { 
        title: 'Background', 
        prop: 'background', 
        type: 'divider',
      },
      { 
        title: 'Color', 
        prop: 'backgroundColor', 
        type: 'color2',
        bind: false,
      },
      { 
        title: 'Image', 
        prop: 'backgroundImage', 
        type: 'img',
        bind: false,
      },
      { 
        title: 'Decoration', 
        prop: 'decoration2', 
        type: 'divider',
      },
      { 
        title: 'Overlay Color', 
        prop: 'overlayColor', 
        type: 'color2',
        bind: false,
      },
    ],
    move: [
      { 
        title: 'Position', 
        prop: 'position', 
        type: 'divider',
      },
      { 
        title: 'Width', 
        prop: 'w', 
        type: 'number',
        bind: false,
      },
      { 
        title: 'Height', 
        prop: 'h', 
        type: 'number',
        bind: false,
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
        bind: false,
      },
      { 
        title: 'Grid', 
        prop: 'grid', 
        type: 'number',
        step: 1,
        min: 1,
        max: 100,
        bind: false,
      },
    ],
  },
  content2: {
    main: [
      { 
        title: 'Background', 
        prop: 'background', 
        type: 'divider',
      },
      { 
        title: 'Color', 
        prop: 'backgroundColor', 
        type: 'color2',
        bind: false,
      },
      { 
        title: 'Image', 
        prop: 'backgroundImage', 
        type: 'img',
        bind: false,
      },
      { 
        title: 'Decoration', 
        prop: 'decoration2', 
        type: 'divider',
      },
      { 
        title: 'Overlay Color', 
        prop: 'overlayColor', 
        type: 'color2',
        bind: false,
      },
    ],
    move: [
      { 
        title: 'Position', 
        prop: 'position', 
        type: 'divider',
      },
      { 
        title: 'Width', 
        prop: 'w', 
        type: 'number',
        bind: false,
      },
      { 
        title: 'Height', 
        prop: 'h', 
        type: 'number',
        bind: false,
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
        bind: false,
      },
      { 
        title: 'Grid', 
        prop: 'grid', 
        type: 'number',
        step: 1,
        min: 1,
        max: 100,
        bind: false,
      },
      { 
        title: 'Align', 
        prop: 'align', 
        type: 'divider',
      },
      {
        prop: 'alignW',
        title: 'Horizontal',
        type: 'droplistlink',
        bind: false,
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
        prop: 'alignH',
        title: 'Vertical',
        type: 'droplistlink',
        bind: false,
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
        title: 'Fit', 
        prop: 'fit', 
        type: 'divider',
      },
      { 
        title: 'Width', 
        prop: 'fitW', 
        type: 'cb',
        bind: false,
      },
      { 
        title: 'Height', 
        prop: 'fitH', 
        type: 'cb',
        bind: false,
      },
      { 
        title: 'Scroll', 
        prop: 'scroll', 
        type: 'divider',
      },
      { 
        title: 'Horizontal', 
        prop: 'scrollX', 
        type: 'cb',
        bind: false,
      },
      { 
        title: 'Vertical', 
        prop: 'scrollY', 
        type: 'cb',
        bind: false,
      },
    ],
  },
  content3: {
    main: [
      { 
        title: 'Background', 
        prop: 'background', 
        type: 'divider',
      },
      { 
        title: 'Color', 
        prop: 'backgroundColor', 
        type: 'color2',
        bind: false,
      },
      { 
        title: 'Image', 
        prop: 'backgroundImage', 
        type: 'img',
        bind: false,
      },
      { 
        title: 'Decoration', 
        prop: 'decoration2', 
        type: 'divider',
      },
      { 
        title: 'Overlay Color', 
        prop: 'overlayColor', 
        type: 'color2',
        bind: false,
      },
    ],
    move: [
      { 
        title: 'Dialog', 
        prop: 'dialog', 
        type: 'divider',
      },
      {
        prop: 'position',
        title: 'Position',
        type: 'droplistlink',
        bind: false,
        data: [
          {
            id: 'center',
            title: 'Center'
          },
          {
            id: 'left',
            title: 'Left'
          },
          {
            id: 'right',
            title: 'Right'
          },
          {
            id: 'top',
            title: 'Top'
          },
          {
            id: 'bottom',
            title: 'Bottom'
          }
        ]
      },
      { 
        title: 'Outside Close', 
        prop: 'outsideClose', 
        type: 'cb',
        bind: false,
      },
      { 
        title: 'Position', 
        prop: 'dposition', 
        type: 'divider',
      },
      { 
        title: 'Width', 
        prop: 'w', 
        type: 'number',
        bind: false,
      },
      { 
        title: 'Height', 
        prop: 'h', 
        type: 'number',
        bind: false,
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
        bind: false,
      },
      { 
        title: 'Grid', 
        prop: 'grid', 
        type: 'number',
        step: 1,
        min: 1,
        max: 100,
        bind: false,
      }
    ],
  },
  group: groupSettings,
  expand: {
    main: [],
    move: [
      { 
        title: 'Y', 
        prop: 'y', 
        type: 'number',
        bind: false,
      },
    ],
  },
  container: containerSettings,
  listActions: [
    'singleClickLeft', 'doubleClickLeft', 'longClickLeft', 
    'mouseDownLeft', 'mouseUpLeft', 'singleClickRight',
  ],
}


export default scheme;