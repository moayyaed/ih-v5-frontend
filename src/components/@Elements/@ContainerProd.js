import React, { Component, PureComponent } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Scrollbars2 from 'libs/Scrllbars2';
import elemets from 'components/@Elements';

import shortid from 'shortid';

const method = window.document.body.style.zoom === undefined;


function getScale(item, settings, scaleW, scaleH, mode) {
  if (item.fitW.value && item.fitH.value) {
    return Math.min((item.w.value * scaleW) / settings.w.value, (item.h.value * scaleH) / settings.h.value);
  }

  if (item.fitW.value) {
    return (item.w.value * scaleW) / settings.w.value
  }

  if (item.fitH.value) {
    return (item.h.value * scaleH) / settings.h.value;
  }

  return 1;
}


class ContainerProd extends PureComponent {

  state = { name: '', img: '' }

  componentDidMount() {
    if (window.__ihp2p) {
      this.uuid = shortid.generate();
    }
  }

  componentWillUnmount() {
    if (this.uuid) {
      window.__ihp2p.image(this.uuid, null);
      this.uuid = null;
    }
  }

  handleLoadImage = (name, url) => {
    this.setState({ name, img: url })
  }

  handleRender = (id, item, mode) => {
    const scale = getScale(this.props.item, this.props.container.settings, this.props.scaleW, this.props.scaleH, mode)
    if (item.type === 'group') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x.value * scale,
            top: item.y.value * scale,
            width: item.w.value * scale,
            height: item.h.value * scale,
            zIndex: item.zIndex.value,
            opacity: item.opacity.value / 100,
            animation: item.animation && item.animation.active ? item.animation.value : 'unset',
            overflow: item.overflow && item.overflow.value ? 'hidden' : 'unset',
            visibility: item.visible && item.visible.value == false ? 'hidden' : 'unset',
          }}
        >
          {item.elements.map(cid => this.handleRender(cid, this.props.elements[cid], mode))}
        </div>
      )
    }
    if (item.type === 'template') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x.value * scale,
            top: item.y.value * scale,
            width: item.w.value * scale,
            height: item.h.value * scale,
            zIndex: item.zIndex.value,
            animation: item.animation && item.animation.active ? item.animation.value : 'unset',
          }}
        >
          {elemets(this.props.elements[id].type, { 
            id, 
            containerId: this.props.item.widgetlinks.link.id, 
            layoutId: this.props.layoutId, 
            mode: this.props.mode, 
            item: { 
              ...this.props.elements[id],
              x: { value: item.x.value * scale },
              y: { value: item.y.value * scale },
              w: { value: item.w.value * scale },
              h: { value: item.h.value * scale },
            }, 
            template: this.props.templates[item.templateId],
            elements: this.props.elements,
          })}
        </div>
      )
    }
    return (
      <div
        key={id}
        style={{ 
          position: 'absolute', 
          left: item.x.value * scale,
          top: item.y.value * scale,
          width: item.w.value * scale,
          height: item.h.value * scale,
          zIndex: item.zIndex.value,
          animation: item.animation && item.animation.active ? item.animation.value : 'unset',
        }}
      >
        {elemets(this.props.elements[id].type, { 
          id, 
          dialogId: this.props.item.dialogId, 
          scale, 
          containerId: this.props.item.widgetlinks && this.props.item.widgetlinks.link.id, 
          layoutId: this.props.layoutId, 
          mode: this.props.mode, 
          item: this.props.elements[id], 
        })}
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    if (window.__ihp2p) {
      const prevImg = prevProps.container && prevProps.container.settings && prevProps.container.settings.backgroundImage && prevProps.container.settings.backgroundImage.value || 'unset'
      const nowImg = this.props.container && this.props.container.settings && this.props.container.settings.backgroundImage && this.props.container.settings.backgroundImage.value || 'unset'
  
      if (prevImg !== nowImg) {
        window.__ihp2p.image(this.uuid, this.props.container.settings.backgroundImage.value, this.handleLoadImage);
      } 
    }
  }

  render() {
    const img = window.__ihp2p ? this.state.img : this.props.container.settings.backgroundImage.value;
    const scale = getScale(this.props.item, this.props.container.settings, this.props.scaleW, this.props.scaleH, this.props.mode)
    const type = this.props.container.settings.backgroundColor.type;
    const color = type === 'fill' ? '' : ', ' + this.props.container.settings.backgroundColor.value;
    const src =  img.indexOf('://') !== -1 ? img : '/images/' + img;
    return (
      <div
        style={{
          width: '100%', 
          height: '100%',
          opacity: this.props.item.opacity.value / 100,
          backgroundColor: this.props.container.settings.backgroundColor.value,
          backgroundImage:  `url(${encodeURI(src)})${color}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          boxShadow: this.props.item.boxShadow && this.props.item.boxShadow.active ? this.props.item.boxShadow.value : 'unset',
          visibility: this.props.item.visible && this.props.item.visible.value == false ? 'hidden' : 'unset',
        }}
      >
        <Scrollbars2
          scrollX={this.props.mode === 'user' && this.props.item.scrollX ? this.props.item.scrollX.value : 0}
          scrollY={this.props.mode === 'user' && this.props.item.scrollX ? this.props.item.scrollY.value : 0}
        > 
          <div 
            style={{
              width: '100%', 
              height: '100%', 
              display: 'flex',
              position: 'absolute',
              justifyContent: this.props.item.alignW.value.id,
              alignItems: this.props.item.alignH.value.id,
              background: this.props.container.settings.overlayColor.value,
              // overflow: this.props.item.overflow && this.props.item.overflow.value ? 'hidden' : 'unset',
            }}
          >
            <div
              style={{
                position: 'relative', 
                width: this.props.container.settings.w.value * scale, 
                height: this.props.container.settings.h.value * scale,
                //// transform: method ? `scale(${scale})` : 'unset',
                // transformOrigin: method ? '0 0' : 'unset',
                //// zoom:  scale,
                flexShrink: 0,
              }}
            >
              {this.props.item.list.map(id => this.handleRender(id, this.props.elements[id], this.props.mode))}
            </div>
          </div>
        </Scrollbars2>
      </div>
    )
  }
}

export default ContainerProd;