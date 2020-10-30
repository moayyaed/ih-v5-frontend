import React from 'react';
import { DefaultPortLabel, PortWidget } from 'storm-react-diagrams';


class $PortWidget extends PortWidget {

  getClassName() {
    const l = Object.keys(this.props.node.ports[this.props.name].links).length ? 'link' : 'null';
    return `port port-${l} ${super.getClassName() + (this.state.selected ? this.bem('--selected') : '')}`;
  }

  render() {
    return (
      <div
        {...this.getProps()}
        onMouseEnter={() => {
          this.setState({ selected: true });
        }}
        onMouseLeave={() => {
          this.setState({ selected: false });
        }}
        data-name={this.props.name}
        data-nodeid={this.props.node.getID()}
      />
    );
  }
}

class $DefaultPortLabel extends DefaultPortLabel {
  render() {
    const port = <$PortWidget node={this.props.model.getParent()} name={this.props.model.name} />;
    const label = <div className="name">{this.props.model.label}</div>;

    return (
      <div {...this.getProps()}>
        {this.props.model.in ? port : label}
        {this.props.model.in ? label : port}
      </div>
    );
  }
}

export default $DefaultPortLabel;
