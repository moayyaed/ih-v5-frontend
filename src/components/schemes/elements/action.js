const action = {
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
  actions: [
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
    ],
  }


export default action;