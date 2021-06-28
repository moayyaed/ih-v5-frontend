import React, { Component } from 'react';
import { transform } from './tools';

import { Timeline, DataSet } from "vis-timeline/standalone";


const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
}

class ChartTimeline extends Component {
  componentDidMount() {
    const items = new DataSet([
      {id: 1, group:1, content: '', start: '2014-04-01', end: '2014-04-08', style: "color: green; background-color: green;"},
      {id: 2, group:1, content: '', start: '2014-04-08', end: '2014-04-14', style: "color: yellow; background-color: yellow;"},
      {id: 3, group:1, content: '', start: '2014-04-14', end: '2014-04-22', style: "color: blue; background-color: blue;"},
      {id: 4, group:1, content: '', start: '2014-04-22', end: '2014-04-27', style: "color: black; background-color: black;"},
      {id: 5, group:1, content: '', start: '2014-04-27', end: '2014-04-30', style: "color: red; background-color: red;"},

      {id: 6, group:2, content: 'item 1', start: '2014-03-01'},
      {id: 7, group:2, content: 'item 2', start: '2014-03-10'},
      {id: 8, group:2, content: 'item 3', start: '2014-03-15'},
      {id: 9, group:2, content: 'item 4', start: '2014-03-20', end: '2014-04-24'},
      {id: 10, group:2, content: 'item 5', start: '2014-03-25'},

      {id: 11, group:3, content: 'item 1', start: '2014-01-01'},
      {id: 12, group:3, content: 'item 2', start: '2014-01-10'},
      {id: 13, group:3, content: 'item 3', start: '2014-01-15'},
      {id: 14, group:3, content: 'item 4', start: '2014-01-20', end: '2014-04-24'},
      {id: 15, group:3, content: 'item 5', start: '2014-01-25', type: 'point'},
    ]);

    const groups = [
      { id: 1, content: 'Lamp 1' },
      { id: 2, content: 'Lamp 2' },
      { id: 3, content: 'Lamp 3' },
    ];
  
    const options = {
      width: '100%',
      height: '100%',
      stack: false,
      groupHeightMode: 'fixed'
    };

    this.timeline = new Timeline(this.link, items, groups, options);
  }

  linked = (e) => {
    this.link = e;
  }

  render(props = this.props) {
    return (
      <div
        style={{
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
          background: 'grey',
          border: `${props.item.borderSize.value * (props.scale || 1)}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
          borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value * (props.scale || 1),
          opacity: props.item.opacity.value / 100,
          boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
          transform: transform(props.item),
          // animation: props.item.animation.active ? props.item.animation.value : 'unset',
          overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
          visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
        }}
      >
        <div ref={this.linked} style={styles.root} />
      </div>
    )
  }
}


export default ChartTimeline;