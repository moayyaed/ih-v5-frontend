import chart from './chart';
import chart_multi from './chartmulti';

import expand from './expand';

import input from './input';
import input2 from './input_2';
import input3 from './input_3';
import slider from './slider';
import checkbox from './checkbox';

import devicelog from './devicelog';
import devicesettings from './devicesettings';

import container from './container';
import journal from './journal';
import alertlog from './alertlog';


const widgets = {
  chart,
  chart_multi,
  expand,
  expander: expand,
  input,
  input_classic: input,
  input_modern: input2,
  input_filled: input3,
  input_outlined: input2,
  slider,
  slider_android: slider,
  slider_ios: slider,
  slider_pretto: slider,
  slider_airbnb: slider,
  checkbox,
  devicelog,
  devicesettings,
  
  container,
  journal,
  alertlog: alertlog, 
};


export default widgets;