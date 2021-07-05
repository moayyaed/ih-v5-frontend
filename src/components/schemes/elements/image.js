const image = [
  { 
    title: 'Изображение', 
    prop: 'image', 
    type: 'divider',
  },
  { 
    title: 'Путь', 
    prop: 'img', 
    type: 'img',
  },
  { 
    title: 'Цвет', 
    prop: 'imgColor', 
    type: 'color',
  },
  { 
    title: 'Размер', 
    prop: 'imgSize', 
    type: 'number',
    min: -100,
    max: 100,
  },
  { 
    title: 'Повернуть', 
    prop: 'imgRotate', 
    type: 'number',
    step: 10,
    min: 0,
    max: 360,
  },
];


export default image;