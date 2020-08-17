import React, { Component, PureComponent } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import elemets from 'components/@Elements';


class CustomScrollbars extends Component {

  renderViewDefault = (props) => {
    return <div {...props} style={{ ...props.style }} />;
  }

  renderThumbHorizontalDefault = (props) => {
    const finalStyle = {
        ...props.style,
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


function getScale(item, settings, scaleW, scaleH) {
  if (settings.fitW.value && settings.fitH.value) {
    return Math.min((item.w.value * scaleW) / settings.w.value, (item.h.value * scaleH) / settings.h.value);
  }

  if (settings.fitW.value) {
    return (item.w.value * scaleW) / settings.w.value
  }

  if (settings.fitH.value) {
    return (item.h.value * scaleH) / settings.h.value;
  }

  return 1;
}


class Container extends PureComponent {

  handleRender = (id, item) => {
    if (item.type === 'group') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x.value,
            top: item.y.value,
            width: item.w.value,
            height: item.h.value,
            zIndex: item.zIndex.value,
            opacity: item.opacity.value / 100 ,
            animation: item.animation && item.animation.active ? item.animation.value : 'unset',
            overflow: item.overflow && item.overflow.value ? 'hidden' : 'unset',
          }}
        >
          {item.elements.map(cid => this.handleRender(cid, this.props.container.elements[cid]))}
        </div>
      )
    }
    if (item.type === 'template') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x.value,
            top: item.y.value,
            width: item.w.value,
            height: item.h.value,
            zIndex: item.zIndex.value,
            animation: item.animation && item.animation.active ? item.animation.value : 'unset',
          }}
        >
          {elemets(this.props.container.elements[id].type, { mode: this.props.mode, item: this.props.container.elements[id], template: this.props.templates[item.templateId] })}
        </div>
      )
    }
    return (
      <div
        key={id}
        style={{ 
          position: 'absolute', 
          left: item.x.value,
          top: item.y.value,
          width: item.w.value,
          height: item.h.value,
          zIndex: item.zIndex.value,
          animation: item.animation && item.animation.active ? item.animation.value : 'unset',
        }}
      >
        {elemets(this.props.container.elements[id].type, { mode: this.props.mode, item: this.props.container.elements[id] })}
      </div>
    )
  }

  render() {
    const scale = getScale(this.props.item, this.props.container.settings, this.props.scaleW, this.props.scaleH)
    return (
      <div
        style={{
          width: '100%', 
          height: '100%',
          opacity: this.props.item.opacity.value / 100,
          background: this.props.container.settings.backgroundColor.value,
          backgroundImage: this.props.container.settings.backgroundImage.value === 'unset' ? 'unset' : `url(${this.props.container.settings.backgroundImage.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <CustomScrollbars
          scrollX={this.props.container.settings.scrollX.value}
          scrollY={this.props.container.settings.scrollY.value}
        > 
          <div 
            style={{
              width: '100%', 
              height: '100%', 
              display: 'flex',
              position: 'absolute',  
              justifyContent: this.props.container.settings.alignW.value.id,
              alignItems: this.props.container.settings.alignH.value.id,
              backgroundColor: this.props.container.settings.overlayColor.value,
              // overflow: this.props.item.overflow && this.props.item.overflow.value ? 'hidden' : 'unset',
            }}
          >
            <div
              style={{
                position: 'relative', 
                width: this.props.container.settings.w.value, 
                height: this.props.container.settings.h.value,
                zoom: scale,
              }}
            >
              {this.props.container.list.map(id => this.handleRender(id, this.props.container.elements[id]))}
            </div>
          </div>
        </CustomScrollbars>
      </div>
    )
  }
}

export default Container;