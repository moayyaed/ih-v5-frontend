import core from 'core';


core.network.on('nav', (res, data) => {
  setTimeout(() => {
    res([
      { id: 'lamp_1', component: 'table', title: 'lamp_1' },
      { id: 'lamp_2', component: 'table', title: 'lamp_2' },
      { id: 'lamp_3', component: 'table', title: 'lamp_3' },
    ]);
  }, 0)
});

core.network.on('nav:visualization', (res, data) => {
  setTimeout(() => {
    res([
      { id: 'layout', title: 'Экраны', 
        children: [
          { id: 'layout_1', component: 'layout', title: 'layout_1' },
          { id: 'layout_2', component: 'layout', title: 'layout_2' },
          { id: 'layout_3', component: 'layout', title: 'layout_3' },
        ]
      },
      { id: 'template', title: 'Шаблоны', 
        children: [
          { id: 'template_1', component: 'template', title: 'template_1' },
          { id: 'template_2', component: 'template', title: 'template_2' },
          { id: 'template_3', component: 'template', title: 'template_3' },
        ]
      }
    ]);
  }, 0);
});

core.network.on('nav:scripts', (res, data) => {
  res([
    { id: 'script_1', component: 'options', title: 'Main', 
      children: [
        { id: 'item_1', component: 'options', title: 'Hello' },
        { id: 'item_2', component: 'options', title: 'Subtree with children', children: [
          { id: 'item_3', component: 'options', title: 'Hello' },
          { id: 'item_4', component: 'options', title: 'Sub-subtree with children', children: [
            { id: 'item_5', component: 'options', title: 'Child 1' },
            { id: 'item_6', component: 'options', title: 'Child 2' },
            { id: 'item_7', component: 'options', title: 'Child 3', children: [
              { id: 'item_15', component: 'options', title: 'Child 1' },
              { id: 'item_16', component: 'options', title: 'Child 2' },
              { id: 'item_17', component: 'options', title: 'Child 3' },
            ] },
          ] },
          { id: 'item_8', component: 'options', title: 'Hello' },
        ] },
        { id: 'item_9', component: 'options', title: 'World' },
        { id: 'item_10', component: 'options', title: 'Something something' }
        
      ] 
    },
  ]);
});
