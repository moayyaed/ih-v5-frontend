import move from './move';


const circle  = {
  main: [
    {  
      prop: '_', 
      type: 'divider',
    },
    { 
      bind: false,
      lang: 'pdf_background_color',
      prop: 'backgroundColor', 
      type: 'color',
    },
    { 
      bind: false,
      lang: 'pdf_border_color',
      prop: 'borderColor', 
      type: 'color',
    },
  ],
  move: move 
}


export default circle;