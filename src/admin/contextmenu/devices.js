import core from 'core';


core.events.on('cm:app:nav:item', (e, params) => {
  core.app.contextmenu.show(e, {
    main: [
      { id: '1', type: 'divider', title: 'Edit' },
      { id: '2', type: 'item', icon: 'cut', text: 'Cut', label: '⌘X' },
      { id: '3', type: 'item', icon: 'duplicate', text: 'Copy', label: '⌘C' },
      { id: '4', type: 'item', icon: 'clipboard', text: 'Paste', label: '⌘V' },
    ],
  });
});
