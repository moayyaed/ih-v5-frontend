import { DefaultLinkModel, DefaultNodeModel, DefaultPortModel, Toolkit } from 'storm-react-diagrams';
import * as _ from 'lodash';

export class $DefaultLinkModel extends DefaultLinkModel {
  getTargetPort() {
    return this.targetPort || { type: 'fake', addLink: () => {}, removeLink: () => {} };
  }
}

export class $DefaultPortModel extends DefaultPortModel {

  deSerialize(object, engine) {
    super.deSerialize(object, engine);
    this.in = object.in;
    this.label = object.label;
    this.max = object.max;
    this.portname = object.portname;
  }

  serialize() {
    return _.merge(super.serialize(), {
      in: this.in,
      label: this.label,
      max: this.max,
      portname: this.portname,
    });
  }

  canLinkToPort(port) {
    if (port.type === 'fake') {
      return false;
    }
    if (port.in === false) {
      Object.keys(port.links)
        .forEach(key => {
          const item = port.links[key];
          if (item.targetPort.type === 'fake') {
            item.remove();
          }
        });
      return false;
    }
    if (port.in) {
      Object.keys(port.links).forEach(key => {
        const item = port.links[key];
        if (item.targetPort.type === 'fake') {
          item.remove();
        }
      });
    }
    if (port.in && port.max) {
      const l = Object.keys(port.links).length;
      if (l > port.max) {
        return false;
      }
    } else {
      const check = Object.keys(port.links).some((key) => {
        const item = port.links[key].sourcePort;
        if (item.in && item.max) {
          const l = Object.keys(item.links).length;
          if (l > item.max) {
            return true;
          }
        }
        return false;
      });
      if (check) {
        return false;
      }
    }

    if (port instanceof DefaultPortModel) {
      return this.in !== port.in;
    }
    return true;
  }

  _getTargetPort() {
    return this.targetPort || { type: 'fake', addLink: () => {}, removeLink: () => {} };
  }

  createLinkModel() {
    const link = super.createLinkModel();
    if (link) {
      link.getTargetPort = this._getTargetPort;
    }
    return link || new $DefaultLinkModel();
  }
}

class BlockNodeModel extends DefaultNodeModel {
  addInPort(label) {
    return this.addPort(new $DefaultPortModel(true, Toolkit.UID(), label));
  }

  addOutPort(label) {
    return this.addPort(new $DefaultPortModel(false, Toolkit.UID(), label));
  }
}

export default BlockNodeModel;
