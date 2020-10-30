/* eslint-disable class-methods-use-this */

import { NodeModel } from 'storm-react-diagrams';
import PortModel from './PortModel';

class $NodeModel extends NodeModel {
  constructor() {
    super('diamond');
    this.addPort(new PortModel('out', 'on', 'ON'));
  }
}

export default $NodeModel;
