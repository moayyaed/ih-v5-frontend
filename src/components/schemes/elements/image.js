const image = [
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


export default image;