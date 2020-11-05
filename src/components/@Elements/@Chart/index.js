import React from 'react';

import ChartOld from './old';

import { transform } from './../tools';


const styles = {
  root: {

  },
};

const propsOld = JSON.parse('{"id":"temp_1553524861450","type":"WIDGET_CHARTS_CANVAS","settings":{"w":600,"h":235,"zIndex":100,"itemId":"5","x":110,"y":185},"containerStyle":{"shadowSize":0,"shadowColor":"rgba(0, 0, 0, 1)","borderStyle":"solid","shadowBlur":0,"opacity":100,"backgroundColor":"rgba(0, 0, 0, 0.25)","borderColor":"rgba(177, 177, 177, 1)","borderWidth":1,"borderRadius":0},"elementStyle":{"buttonDate":false,"chartPoints":false,"buttonsColor":"rgba(64, 144, 181, 1)","buttonNavigate":false,"chartInterval":"1970","chartRealtime":false,"buttonDiscrete":false,"buttonSync":false,"buttonHome":false,"chartLegendHeight":10,"buttonSize":64,"chartTextColor":"rgba(231, 231, 231, 1)","chartGridColor":"rgba(191, 191, 191, 1)","chartPositionCurentTime":90},"params":{"chartid":"23"}}')
const data1 = JSON.parse('{"data":[{"id":"23","decdig":0,"leftaxis_title":"Положение каретки","rightaxis_max":500,"calc_type":"sum","name":"Станок ПСТ80 - каретка/давление ","leftaxis_max":300,"order":0,"data_type":"trend","dbtable":"","txt":"","rightaxis_min":-10,"widget_type":"charts","rightaxis_title":"Давление","discrete":"day","leftaxis_min":-10,"chart_type":"step","rightaxis":true,"andfilter":"","pluginchart":"","plugin":""}],"items":[{"id":"54","hide":false,"rtperiod":0,"dn":"PST_Analog_Pressure_Power_Cylinder","name":"Давление","legend":"Давление, бар","order":0,"lineColor":"rgba(245, 149, 81, 1)","chartid":"23","rightaxis":false,"txt":"","icon":""},{"id":"58","hide":false,"rtperiod":0,"dn":"PST_Analog_Position_Carriage","name":"Положение каретки","legend":"Положение каретки, мм","order":0,"lineColor":"rgba(126, 211, 33, 1)","txt":"","icon":"","chartid":"23","rightaxis":true}]}');

propsOld.fetch = (type, options) => {
  console.log(type, options)
  return new Promise((resolve, reject) => {
    resolve({ set: data1 });
  });
}


const temp = {}


function Chart(props) {
  const data = props.mode === 'user' ? props.item.data : temp;
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
        // animation: props.item.animation.active ? props.item.animation.value : 'unset',
        overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
        visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
      }}
    >
      {React.createElement(ChartOld, propsOld)}
    </div>
  );
}


export default Chart;