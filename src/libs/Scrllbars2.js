import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';


class CustomScrollbars extends Component {

  renderViewDefault = (props) => {
    return <div 
      {...props} 
      style={{ 
        ...props.style,
        marginBottom: this.props.scrollX ? props.style.marginBottom : 'unset',
        marginRight: this.props.scrollY ? props.style.marginRight : 'unset',
        overflowX: this.props.scrollX ? 'scroll': 'hidden', 
        overflowY: this.props.scrollY ? 'scroll': 'hidden', 
      }} 
    />;
  }

  renderThumbHorizontalDefault = ({ style, ...props }) => {
    const finalStyle = {
        ...style,
        display: this.props.scrollX ? 'block': 'none',
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)',
        zIndex: 10001
    };
    return <div style={finalStyle} {...props} />;
  }

  renderThumbVerticalDefault = ({ style, ...props }) => {
    const finalStyle = {
        ...style,
        display: this.props.scrollY ? 'block': 'none',
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)',
        zIndex: 10001
    };
    return <div style={finalStyle} {...props} />;
  }

  render() {
    return (
      <Scrollbars
        
        renderThumbHorizontal={this.renderThumbHorizontalDefault}
        renderThumbVertical={this.renderThumbVerticalDefault}
        renderView={this.renderViewDefault}
       >
        {this.props.children}
      </Scrollbars>
    );
  }
}


export default CustomScrollbars;