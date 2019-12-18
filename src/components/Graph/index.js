import React, { Component } from 'react';
import core from 'core';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { withStyles } from '@material-ui/core/styles';


const styles = {
  box: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  paper: {
    width: 550,
    height: 550,
    position: 'absolute',
    borderRadius: 0,
  },
  item: {
    position: 'absolute', 
    width: 70, 
    height: 70,
  }
};

const classes = theme => ({
  root: {
  },
});

class Graph extends Component {
  componentDidMount() {
  }

  handlePositionLayout = (e, data) => {
    core.components.graph.setPositionLayout(data.x, data.y);
  }

  handlePositionStartItem = (e, id, data) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handlePositionStopItem = (e, id, data) => {
    e.preventDefault();
    e.stopPropagation();
    core.components.graph.setPositionItem(id, data.x, data.y);
  }

  handleContextMenuItem = (e, params) => {
    e.preventDefault();
    e.stopPropagation();
    core.event('contextmenu', 'graph:item', e, params);
  }

  render({ id, state, match, classes, onClick } = this.props) {
    console.log(state)
    return (
      <div style={styles.box}>
        <Draggable position={state.options.position} onStop={this.handlePositionLayout}>
          <Paper
            ref={this.refList}
            elevation={2} 
            className="parent" 
            style={styles.paper}
          >
            {Object
            .keys(state.map)
            .map(key => {
              const item = state.map[key];
              return (
                <Draggable 
                  key={key.toString()} 
                  position={{ x: item.x, y: item.y }} 
                  bounds=".parent"
                  onStart={(e, data) => this.handlePositionStartItem(e, key, data)}
                  onStop={(e, data) => this.handlePositionStopItem(e, key, data)}
                >
                  <div 
                    style={{ ...styles.item, border: '2px solid ' + item.color }}
                    onContextMenu={(e) => this.handleContextMenuItem(e, item)}
                  />
                </Draggable>
              );
            })}
          </Paper>
        </Draggable>
      </div>
    );
  }
}



export default core.connect(withStyles(classes)(Graph));