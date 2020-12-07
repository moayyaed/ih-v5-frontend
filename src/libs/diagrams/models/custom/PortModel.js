/* eslint-disable class-methods-use-this */

import { PortModel, DefaultLinkModel } from 'storm-react-diagrams';

class $PortModel extends PortModel {
  constructor(position, id, name) {
    super(id, 'diamond');
    this.position = position;
    this.label = name || 'NO NAME';
  }

  createLinkModel() {
    return new DefaultLinkModel();
  }
}


export default $PortModel;
