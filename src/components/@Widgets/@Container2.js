import React, { Component } from 'react';
import core from 'core';

import ReactResizeDetector from 'react-resize-detector';
import elemets from 'components/@Elements';


const styles = {
  root: {
    width: 100,
    height: 100,
  }
}


class Container2 extends Component {

  handleRender = (id, item) => {
    const elements = this.props.global.containers[this.props.params.containerId.id].elements;
    const templates = this.props.global.templates;

    if (item.type === 'group') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x,
            top: item.y,
            width: item.w,
            height: item.h,
          }}
        >
          {item.elements.map(cid => this.handleRender(cid, elements[cid]))}
        </div>
      )
    }
    if (item.type === 'template') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x,
            top: item.y,
            width: item.w,
            height: item.h,
          }}
        >
          {elemets(id, item, templates[item.templateId])}
        </div>
      )
    }
    return (
      <div
        key={id}
        style={{ 
          position: 'absolute', 
          left: item.x,
          top: item.y,
          width: item.w,
          height: item.h,
        }}
      >
        {elemets(id, elements[id], null)}
      </div>
    )
  }

  render({ params, global } = this.props) {
    const { list, settings, elements } = global.containers[params.containerId.id];
    return (
      <ReactResizeDetector handleWidth handleHeight>
        {({ width, height }) => {
          if (width && settings.w) {
            const scale = Math.min((width) / settings.w, (height) / settings.h);
            return (
              <div style={{ position: 'relative', width: settings.w, height: settings.h, zoom: scale }}>
                {list.map(id => this.handleRender(id, elements[id]))}
              </div>
            )
          }
          return <div />;
        }}
      </ReactResizeDetector>
    )
  }
}

/*
function Container2(props) {
  const { list, settings, elements } = props.global.containers[props.params.containerId.id];
  return (
    <ReactResizeDetector handleWidth handleHeight>
      {({ width, height }) => {
        if (width && settings.w) {
          const scale = Math.min((width) / settings.w, (height) / settings.h);
          return (
            <div style={{ position: 'relative', width: settings.w, height: settings.h, zoom: scale }}>
              {list.map(id => this.handleRender(id, elements[id]))}
            </div>
          )
        }
        return <div />;
      }}
    </ReactResizeDetector>
  )
}
*/


export default Container2;