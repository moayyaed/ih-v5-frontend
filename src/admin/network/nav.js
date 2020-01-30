import core from 'core';


core.network.on('nav', (res, data) => {
  setTimeout(() => {
    res([
      { id: 'lamp_1', component: 'table', title: 'lamp_1' },
      { id: 'lamp_2', component: 'table', title: 'lamp_2' },
      { id: 'lamp_3', component: 'table', title: 'lamp_3' },
    ]);
  }, 4500)
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
  }, 4500);
});

core.network.on('nav:scripts', (res, data) => {
  res([
    { id: 'script_1', component: 'options', title: 'script_1', 
      children: [
        { id: 'item_1', component: 'options', title: 'item_1' },
        { id: 'item_2', component: 'options', title: 'item_2' },
        { id: 'item_3', component: 'options', title: 'item_3' }
      ] 
    },
    { id: 'script_2', component: 'options', title: 'script_2' },
    { id: 'script_3', component: 'options', title: 'script_3' },
    { id: 'script_4', component: 'options', title: 'script_4' },
    { id: 'script_5', component: 'options', title: 'script_5' },
  ]);
});
