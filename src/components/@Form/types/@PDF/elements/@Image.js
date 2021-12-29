import React, { Component } from 'react';
import shortid from 'shortid';


function getImageStyle(props, state) {
  const img = window.__ihp2p ? state.img : props.img.value || '';
  const src = img.indexOf('://') !== -1 ? `url(${encodeURI(img)})` : `url(/images/${encodeURI(img)})`

  return {
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundImage: src,
  }
}


class Image extends Component {
  state = { name: '', img: '' }

  componentDidMount() {
    if (window.__ihp2p) {
      this.uuid = shortid.generate();
      window.__ihp2p.image(this.uuid, this.props.item.img.value, this.handleLoadImage);
    }
  }

  componentWillUnmount() {
    if (this.uuid) {
      window.__ihp2p.image(this.uuid, null);
      this.uuid = null;
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.item.img.value !== prevProps.item.img.value) {
      if (window.__ihp2p) {
        window.__ihp2p.image(this.uuid, this.props.item.img.value, this.handleLoadImage);
      }
    }
  }

  handleLoadImage = (name, url) => {
    this.setState({ name, img: url })
  }

  render(props = this.props) {
    return (
      <div 
        style={{
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
        }}
      >
        <div
          style={getImageStyle(props.item, this.state)}
        />
      </div>
    );
  }
}



export default Image;