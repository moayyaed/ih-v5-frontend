export const contextmenuExplorerBodyData = {
  main: [
    { id: '1', type: 'divider', title: 'Add' },
    { id: '2', type: 'item', icon: 'folder-close', text: 'Folder', label: '⌘F' },
    { id: '3', type: 'item', icon: 'document', text: 'Item', label: '⌘I' },
  ],
}

export const contextmenuExplorerItemData = {
  main: [
    { id: '1', type: 'divider', title: 'Edit' },
    { id: '2', type: 'item', icon: 'cut', text: 'Cut', label: '⌘X' },
    { id: '3', type: 'item', icon: 'duplicate', text: 'Copy', label: '⌘C' },
    { id: '4', type: 'item', icon: 'clipboard', text: 'Paste', label: '⌘V', disabled: true },
    { id: '5', type: 'divider', title: 'Text' },
    { id: '6', type: 'items', childs: 'aligment', disabled: true, icon: 'align-left', text: 'Alignment' },
    { id: '7', type: 'items', childs: 'style', icon: 'style', text: 'Style' },
    { id: '8', type: 'items', childs: 'miscellaneous', icon: 'asterisk', text: 'Miscellaneous' },
  ],
  aligment: [
    { id: '9', type: 'item', icon: 'align-left', text: 'Left' },
    { id: '10', type: 'item', icon: 'align-center', text: 'Center' },
    { id: '11', type: 'item', icon: 'align-right', text: 'Right' },
    { id: '12', type: 'item', icon: 'align-justify', text: 'Justify' },
  ],
  style: [
    { id: '13', type: 'item', icon: 'bold', text: 'Bold' },
    { id: '14', type: 'item', icon: 'italic', text: 'Italic' },
    { id: '15', type: 'item', icon: 'underline', text: 'Underline' },
  ],
  miscellaneous: [
    { id: '16', type: 'item', icon: 'badge', text: 'Badge' },
    { id: '17', type: 'item', icon: 'book', text: 'Long items will truncate when they reach max-width' },
    { id: '18', type: 'items', childs: 'other', icon: 'more', text: 'Look in here for even more items' },
  ],
  other: [
    { id: '19', type: 'item', icon: 'briefcase', text: 'Briefcase' },
    { id: '20', type: 'item', icon: 'calculator', text: 'Calculator' },
    { id: '21', type: 'item', icon: 'dollar', text: 'Dollar' },
    { id: '22', type: 'items', childs: 'shapes', icon: 'dot', text: 'Shapes'},
  ],
  shapes: [
    { id: '23', type: 'item', icon: 'full-circle', text: 'Full circle' },
    { id: '24', type: 'item', icon: 'heart', text: 'Heart' },
    { id: '25', type: 'item', icon: 'ring', text: 'Ring' },
    { id: '26', type: 'item', icon: 'square', text: 'Square' },
  ]
}

export const contextmenuTabData = {
  main: [
    { id: '1', type: 'divider', title: 'Tab' },
    { id: '2', type: 'item', icon: 'refresh', text: 'Refresh', label: '⌘R' },
    { id: '3', type: 'item', icon: 'delete', text: 'Close', label: '⌘Q' },
  ],
}

export const contextmenuPageData = {
  main: [
    { id: '1', type: 'divider', title: 'Page' },
    { id: '2', type: 'item', icon: 'clipboard', text: 'Paste', label: '⌘V', command: 'graph:paste' },
    { id: '3', type: 'item', icon: 'refresh', text: 'Refresh', label: '⌘R' },
    { id: '4', type: 'item', icon: 'properties', text: 'Properties', label: '⌘P' },
  ],
}

export const contextmenuGraphItemData  = {
  main: [
    { id: '1', type: 'divider', title: 'item' },
    { id: '2', type: 'item', icon: 'duplicate', text: 'Copy', label: '⌘C', command: 'graph:item:copy' },
    { id: '3', type: 'item', icon: 'group-objects', text: 'Group', label: '⌘G' },
    { id: '4', type: 'item', icon: 'social-media', text: 'Share', label: '⌘S' },
  ],
}

export const graphDataL = {
  type: 'layout',
  options: {
    position: {
      x: 10, y: 10,
    }
  },
  map: {
    1: {
      settings: {
        id: 1,
        x: 50,
        y: 50,
        w: 70,
        h: 70,
        color: 'red',
      }
    },
  },
}

export const graphDataL1 = {
  type: 'layout',
  settings: {
    x: 50, y: 50,
  },
  map: {
    1: {
      
      settings: {
        id: 1,
        x: 70,
        y: 75,
        w: 70,
        h: 70,
        color: '#2196F3',
      }
    },
    2: {
      settings: {
        id: 2,
        x: 175,
        y: 175,
        w: 70,
        h: 70,
        color: '#8BC34A',
      }
    },
    3: {
      settings: {
        id: 3,
        x: 350,
        y: 350,
        w: 70,
        h: 70,
        color: '#FFEB3B',
      }
    },
  },
}