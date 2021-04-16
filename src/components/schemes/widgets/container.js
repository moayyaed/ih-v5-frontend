const container = {
  element: [
    { 
      title: 'Content Align', 
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
      title: 'Content Fit', 
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
      title: 'Content Scroll', 
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
    {
      title: 'Visible',
      prop: 'visible',
      type: 'cb',
    }
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
  link: [],
}


export default container