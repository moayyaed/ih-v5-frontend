const action = {
  move: [
    { 
      title: 'Позиция', 
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
      title: 'Ширина', 
      prop: 'w', 
      type: 'number',
      bind: false,
    },
    { 
      title: 'Высота', 
      prop: 'h', 
      type: 'number',
      bind: false,
    },
  ],
  actions: [
      { 
        title: 'Эффекты', 
        prop: 'effect', 
        type: 'divider',
      },
      { 
        title: 'Цвет наведении', 
        prop: 'colorHover', 
        type: 'color',
      },
      { 
        title: 'Цвет пульсации', 
        prop: 'colorRipple', 
        type: 'color',
      },
    ],
  }


export default action;