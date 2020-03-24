import React, { Component } from 'react';
import core from 'core';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';



const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
}

const scheme = {
  direction: 'row',
  first: "tree",
  second: 'form',
  splitPercentage: 25,
}

const TITLES = {
  tree: 'Channels',
  form: 'Properties',
}

const EMPTY_ARRAY = [];


class PluginForm1 extends Component {
  
  renderButtons = (id) => {
    return []
  }

  renderComponent = (id) => {
    const { props, state } = this;
    
    return null;
  }

  render() {
    return (
      <div style={styles.root}>
        <Mosaic
          className="mosaic-blueprint-theme"
          initialValue={scheme}
          renderTile={(id, path, x) => {
            return (
              <MosaicWindow
                key={id}
                draggable={false}
                title={TITLES[id]}
                additionalControls={EMPTY_ARRAY}
                path={path}
                renderToolbar={null}
                toolbarControls={this.renderButtons(id)}
              >
                {this.renderComponent(id)}
              </MosaicWindow>
            )
          }}
        />
      </div>
    )
  }    
}


export default PluginForm1;