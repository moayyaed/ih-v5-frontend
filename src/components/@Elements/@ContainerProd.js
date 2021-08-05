import React, { Component, PureComponent } from 'react';

import Scrollbars2 from 'libs/Scrllbars2';
import element from 'components/@Elements';


function getScale(item, rw, rh) {
  if (item.fitW.value && item.fitH.value) {
    return Math.min((item.w.value * rw) / item.settings.w, (item.h.value * rh) / item.settings.h);
  }

  if (item.fitW.value) {
    return (item.w.value * rw) / item.settings.w;
  }

  if (item.fitH.value) {
    return (item.h.value * rh) / item.settings.h;
  }

  return 1;
}


class ContainerProd extends PureComponent {

  state = { name: '', img: '' }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentDidUpdate(prevProps) {

  }

  elementRender = (id) => {
    const scale = getScale(this.props.item, this.props.rw, this.props.rh);
    const elements = this.props.elements;
    const item = elements[id];

    const params = { id, mode: 'user', item: elements[id], scale };

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
            animation: item.animation.active ? item.animation.value : 'unset',
          }}
        >
          {item.list.map(this.elementRender)}
        </div>
      )
    }

    if (item.type === 'template') {
      params.scale = scale;
      params.item = item;
      params.template = this.props.templates[item.linkid];
      params.elements = elements;
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
          animation: item.animation.active ? item.animation.value : 'unset',
        }}
      >
        {element(elements[id].type, params)}
      </div>
    )

  }

  render({ item, elements } = this.props) {
    if (item.settings) {
      const scale = getScale(item, this.props.rw, this.props.rh);
      const img = window.__ihp2p ? this.state.img : elements['__' + item.uuid].image.value;
      const src =  img.indexOf('://') !== -1 ? img : '/images/' + img;
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: item.settings.colorback,
            backgroundImage:  `url(${encodeURI(src)})${item.settings.colorback2}`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            opacity: item.opacity.value / 100,
            boxShadow:  item.boxShadow.active ? item.boxShadow.value : 'unset',
            visibility: item.visible.value == false ? 'hidden' : 'unset',
          }}
        >
          <Scrollbars2
            scrollX={item.scrollX ? item.scrollX.value : 0}
            scrollY={item.scrollY ? item.scrollY.value : 0}
          > 
            <div 
              style={{
                width: '100%', 
                height: '100%', 
                display: 'flex',
                position: 'absolute',
                justifyContent: item.alignW.value.id,
                alignItems: item.alignH.value.id,
                background: item.settings.colorfront,
              }}
            >
              <div
                style={{
                  position: 'relative', 
                  width: item.settings.w * scale, 
                  height: item.settings.h * scale,
                  flexShrink: 0,
                }}
              >
               {item.list.map(this.elementRender)}
              </div>
            </div>
          </Scrollbars2>
        </div>
      );
    }
    return null;
  }
}

export default ContainerProd;