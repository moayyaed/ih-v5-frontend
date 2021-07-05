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
        title: 'Левая кнопка мыши', 
        prop: 'mouseleft', 
        type: 'divider',
      },
      { 
        title: 'Одиночный клик', 
        prop: 'singleClickLeft', 
        type: 'input',
      },
      { 
        title: 'Двойной клик', 
        prop: 'doubleClickLeft', 
        type: 'input',
      },
      { 
        title: 'Долгое нажатие', 
        prop: 'longClickLeft', 
        type: 'input',
      },
      { 
        title: 'Кнопка нажата', 
        prop: 'mouseDownLeft', 
        type: 'input',
      },
      { 
        title: 'Кнопка отпущена', 
        prop: 'mouseUpLeft', 
        type: 'input',
      },
      { 
        title: 'Правая кнопка мыши', 
        prop: 'mouseright', 
        type: 'divider',
      },
      { 
        title: 'Одиночный клик', 
        prop: 'singleClickRight', 
        type: 'input',
      },
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