import core from 'core';


function transformData(tree, options) {
  const body = options.common && options.common.popup ? options.common.popup : null;

  return {
    contextmenu: tree.reduce((p, c) => {
      if (options[c.root] && options[c.root]) {
        return {
          ...p,
          [c.id]: {
            parent: options[c.root].parent.popup,
            child: options[c.root].child.popup,
          }
        }
      }
      return { ...p, [c.id]: null }
    }, { body })
  }
}


core.network.request('nav', (send, context) => {
  send([
    { method: 'get', type: 'tree', id: context.params.menuid },
    { method: 'getmeta', type: 'tree', id: context.params.menuid },
  ]);
})


core.network.response('nav', (answer, res, context) => {
  const transform = transformData(res[0].data, res[1].data);

  answer({ 
    loading: false,
    selectid: context.params.navid,
    list: res[0].data, 
    contextmenu: transform.contextmenu
  });
})


core.network.response('#nav', (answer, res, context) => {
  answer({ 
    loading: false,
    selectid: context.params.navid,
    list: [
      { id: 'test', title: 'Test', 
        children: [
          { id: 'item1', title: 'item1', component: 'table' },
          { id: 'item2', title: 'item2', component: 'table' },
          { id: 'item3', title: 'item3', component: 'table' },
        ]
      }
    ], 
    contextmenu: {
      body: {
        main: [
          { id: '1', type: 'item', text: 'create' }
        ]
      },
      test: {
        main: [
          { id: '1', type: 'item', text: 'rename', command: 'rename' }
        ]
      },
    }
  });
})


