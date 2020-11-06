
import background from './background';
import border from './border';
import text from './text';
import image from './image';
import decoration from './decoration';
import effects from './effects';
import move from './move';

import group from './group';
import action from './action';

import template from './template';
import container from './container';


export const main = [...background, ...border, ...decoration];


const elements = {
  block: { main: main, move: move },
  rectangle: { main: main, move: move },
  circle: { main: main, move: move },
  text: {
    main: [...text, ...main],
    move: move,
  },
  image: {
    main: [...image, ...main],
    move: move,
  },
  text_image: {
    main: [...text, ...image, ...main],
    move: move,
  },
  button: {
    main: [...text, ...image, ...main, ...effects],
    link: [{ type: 'actions', prop: 'actions' }],
    move: move,
  },
  group: group,
  action: action,
  action2: {
    main: [...effects],
    link: [{ type: 'actions', prop: 'actions' }],
    move: move,
  },
  template: {
    link: [],
    ...template,
  },
  container: container,
};


export default elements;