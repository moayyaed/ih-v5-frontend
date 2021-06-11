import React, { PureComponent } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import core from 'core';

import Line from './Line';
import MultiLine from './MultiLine';


import { transform } from './../tools';


const styles = {
  root: {

  },
};


class Chart extends PureComponent {
  state = { data : {} }

  componentDidMount() {
  }

  render() {
    const props = this.props; 
    if (props.item.type !== 'chart' && !core.cache.modules.multichart) {
      return (
        <div 
          style={{
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            border: `${props.item.borderSize.value}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
            borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value,
            opacity: props.item.opacity.value / 100,
            boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
            transform: transform(props.item),
            overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
            visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
          }}
        >
          У вас нет лицензии, необходимой для использования этого элемента!
        </div>
      )
    }

    return (
      <ReactResizeDetector handleWidth handleHeight>
        {({ width, height }) => {
          if (height) {
            return (
              <div 
                style={{
                  position: 'absolute', 
                  width: '100%', 
                  height: '100%', 
                  border: `${props.item.borderSize.value}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
                  borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value,
                  opacity: props.item.opacity.value / 100,
                  boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
                  transform: transform(props.item),
                  overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
                  visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
                }}
              >
                {React.createElement(props.item.type === 'chart' ? Line : MultiLine, { 
                  id: props.id, 
                  layoutId: props.layoutId, 
                  containerId: props.containerId || null,
                  dialogId: props.dialogId || null,
                  mode: props.mode, 
                  item: props.item, 
                  h: height 
                })}
              </div>
            );
          }
          return <div />;
        }}
      </ReactResizeDetector>
    );
  }
}


export default Chart;