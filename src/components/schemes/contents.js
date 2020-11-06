const content = {
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
  ],
};

const content2 = {
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
};

const content3 = {
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
  ], main: [
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
  ],
}

const contents = {
  content,
  content2,
  content3,
}

export default contents;