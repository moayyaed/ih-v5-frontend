import React, { PureComponent } from 'react';
import ReactResizeDetector from 'react-resize-detector';

import Line from './Line';
import MultiLine from './MultiLine';


import { transform } from './../tools';


const styles = {
  root: {

  },
};

const data = JSON.parse('{"data":[{"id":"89","decdig":0,"leftaxis_title":"","rightaxis_max":1,"calc_type":"sum","pluginchart":"","name":"Датчики температуры Серверная (1площадка)","leftaxis_max":40,"order":0,"andfilter":"","data_type":"trend","dbtable":"","txt":"","rightaxis_min":0,"plugin":"","widget_type":"charts","rightaxis_title":"","discrete":"day","leftaxis_min":0,"chart_type":"step","rightaxis":false}],"items":[{"id":"201","hide":false,"rtperiod":0,"dn":"DT_ServerRoom","name":"Серверная (1 площадка)","legend":"Температура, ºC","order":0,"andfilter":"","lineColor":"rgba(255, 175, 74, 1)","chartid":"89","rightaxis":false,"txt":"","icon":""}]}');

function fetch (type, options) {
  return new Promise((resolve, reject) => {
    resolve({ set: data });
  });
}


const temp = {}


class Chart extends PureComponent {
  state = { data : {} }

  componentDidMount() {
  }

  render() {
    const props = this.props; 
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
                  background: props.item.backgroundColor.value,
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
                  fetch, mode: 
                  props.mode, 
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