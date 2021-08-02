import core from 'core';


export function layoutCommand(data) {
  if (data.command === 'gotolayout') {
    const prevlayoutid = this.props.state.layoutid;
    const nextlayoutid = data.id;

    if (prevlayoutid === nextlayoutid) {
      this.requestChangeContainer(data.context)
    }
  }
}

