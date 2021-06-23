import React, { PureComponent } from 'react';
import core from 'core';

import Paper from '@material-ui/core/Paper';
import { Scrollbars } from 'react-custom-scrollbars';

import shortid from 'shortid';

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gridGap: '2vw',
    padding: 24,
  },
  imgContainer: {
    height: 170,
    cursor: 'pointer',
  },
  imgBody: {
    height: 136,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 120,
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },
  imgBody2: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 34,
  },
  imgTitle: {
    paddingLeft: 14,
    height: 34,
    fontSize: 12,
    display: 'grid',
    alignItems: 'center',
    lineHeight: '16px',
    overflow: 'hidden',
  }
}

function handleClick(id) {
  core.route(`vis/images/imageview/${id}/tabImageView`)
}

class Image extends PureComponent {

  state = { name: '', img: '' }

  componentDidMount() {
    if (window.__ihp2p) {
      this.uuid = shortid.generate();
      window.__ihp2p.image(this.uuid, this.props.path, this.handleLoadImage);
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

  render(props = this.props) {
    return (
      <Paper style={styles.imgContainer} onClick={() => props.onClick(props.path)} >
        <div style={styles.imgBody} >
          <div style={{ backgroundImage: window.__ihp2p ? `url(${this.state.img})` : `url(/images/${encodeURI(props.path)})`, ...styles.img }} />
        </div>
        <div style={styles.imgBody2}>
          <div style={styles.imgTitle}>{props.path}</div>
        </div>
      </Paper>
    )
  }
}


function Images(props) {
  return (
    <Scrollbars >
      <div style={styles.root}>
        {props.data
          .map((i, key)=> 
            <Image key={i} path={i} onClick={handleClick} />
        )}
      </div>
    </Scrollbars>
  )
}


export default React.memo(Images);