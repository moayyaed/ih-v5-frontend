import React, { PureComponent } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Hammer from 'hammerjs';


const styles = {
  active: {
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
    border: '1px solid #F44336',
    background: 'repeating-linear-gradient(45deg, rgba(239, 83, 80, 0.2), rgba(239, 83, 80, 0.2) 10px, rgba(239, 154, 154, 0.2) 10px, rgba(239, 154, 154, 0.2) 20px)',
    opacity: 0.7
  },
  admin: {
    width: '100%', 
    height: '100%', 
  },
  user: {
    width: '100%', 
    height: '100%',
  }
}


class Action extends PureComponent {

  state = { type: '' }

  componentDidMount() {
    if (this.link) {
      
      this.mc = new Hammer.Manager(this.link);

      this.mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
      this.mc.add(new Hammer.Tap({ event: 'singletap', interval: this.props.item.doubleClickLeft === '' ? 100 : 200 }));
      this.mc.add(new Hammer.Press({ event: 'press', time: 400 }));
      this.mc.add(new Hammer.Press({ event: 'pressup' }));

      this.mc.get('doubletap').recognizeWith('singletap');
      this.mc.get('singletap').requireFailure('doubletap');
    
      this.mc.on('singletap', this.handleSingleTap);
      this.mc.on('doubletap', this.handleDoubleTap);
      this.mc.on('press', this.handleLongTap);
      this.mc.on('pressup', this.handlePress);
      
    }
  }

  handleSingleTap = () => {
    console.log('handleSingleTap');
    this.setState((state) => {
      return { type: 'single', color: 'green' }
    })
  }

  handleDoubleTap = () => {
    console.log('handleDoubleTap');
    this.setState((state) => {
      return { type: 'Double', color: 'orange' }
    })
  }

  handleLongTap = () => {
    console.log('handlePress');
    this.setState((state) => {
      return { type: 'Long', color: 'red' }
    })
  }

  handlePressDown = () => {
    console.log('handlePressDown');
    this.setState((state) => {
      return { type: 'Down', color: 'purple' }
    })
  }

  handlePressUp = () => {
    console.log('handlePressUp');
    this.setState((state) => {
      return { type: 'Up', color: '#795548' }
    })
    setTimeout(() => {
      this.setState((state) => {
        return { type: '', color: 'unset' }
      })
    }, 300)
  }

  handlePress = (e) => {
    if (e.isFinal) {
      this.handlePressUp(e);
    } else {
      this.handlePressDown(e);
    }
  }

  handleContextMenu = (e) => {
    e.preventDefault();
  }

  linked = (e) => {
    this.link = e;
  } 

  render() {
    if (this.props.mode === 'user') {
      return (
        <ButtonBase 
          ref={this.linked} 
          centerRipple 
          style={{ ...styles.user, color: this.props.item.colorRipple, background: this.state.color, fontSize: '30pt' }}
          onContextMenu={this.handleContextMenu}
        >
          {this.state.type}
        </ButtonBase>
      )
    }
    if (this.props.mode === 'admin') {
      return (
        <div style={styles.admin} />
      )
    }
    return <div style={styles.active} />
  }
}


export default Action;