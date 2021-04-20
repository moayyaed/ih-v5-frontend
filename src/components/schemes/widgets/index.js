import chart from './chart';
import chart_multi from './chartmulti';

import expand from './expand';

import input from './input';
import slider from './slider';
import checkbox from './checkbox';

import devicelog from './devicelog';
import devicesettings from './devicesettings';

import container from './container';
import journal from './journal';


const widgets = {
  chart,
  chart_multi,
  expand,
  expander: expand,
  input,
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
};


export default widgets;