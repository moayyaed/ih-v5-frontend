import React from 'react';

import LogoIH from './LogoIH';
import LogoIH2 from './LogoIH_2';
import LogoIH3 from './LogoIH_3';
import AccessIcon from './Access';
import AnalyticsIcon from './Analytics';
import DatabaseIcon from './Database';
import DatasourceIcon from './Datasource';
import DevIcon from './Dev';
import ResourcesIcon from './Resources';
import ScriptsIcon from './Scripts';
import VisIcon from './Vis';



function icon(name, style) {
  switch(name) {
    case 'logo':
      return React.createElement(LogoIH, { style })
    case 'logo2':
      return React.createElement(LogoIH2, { style })
    case 'logo3':
      return React.createElement(LogoIH3, { style })
    case 'access':
      return React.createElement(AccessIcon, { style })
    case 'analytics':
      return React.createElement(AnalyticsIcon, { style })
    case 'database':
      return React.createElement(DatabaseIcon, { style })
    case 'datasource':
      return React.createElement(DatasourceIcon, { style })
    case 'dev':
      return React.createElement(DevIcon, { style })
    case 'resources':
      return React.createElement(ResourcesIcon, { style })
    case 'scripts':
      return React.createElement(ScriptsIcon, { style })
    case 'vis':
      return React.createElement(VisIcon, { style })
    default:
      return null;
  }
}


export default icon;