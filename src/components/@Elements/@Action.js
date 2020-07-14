import React, { PureComponent } from 'react';
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

const MOUSE_INPUT_MAP = {
  mousedown: Hammer.INPUT_START,
  mousemove: Hammer.INPUT_MOVE,
  mouseup: Hammer.INPUT_END
};


Hammer.inherit(Hammer.MouseInput, Hammer.Input, {
  handler: function MEhandler(ev) {
      var eventType = MOUSE_INPUT_MAP[ev.type];

      //modified to handle all buttons
      //left=0, middle=1, right=2
      if (eventType & Hammer.INPUT_START) {
          //firefox sends button 0 for mousemove, so store it here
          if(this.pressed === false) this.button = ev.button;
          this.pressed = true;
      }

      if (eventType & Hammer.INPUT_MOVE && ev.which === 0) {
          eventType = Hammer.INPUT_END;
      }
      // mouse must be down, and mouse events are allowed (see the TouchMouse input)
      if (!this.pressed || !this.allow) {
          return;
      }

      if (eventType & Hammer.INPUT_END) {
          this.pressed = false;
          this.button = false;
      }

      this.callback(this.manager, eventType, {
                      button: this.button,
          pointers: [ev],
          changedPointers: [ev],
          pointerType: 'mouse',
          srcEvent: ev
      });
  }
});



class Action extends PureComponent {

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
  }

  handleDoubleTap = () => {
    console.log('handleDoubleTap');
  }

  handleLongTap = () => {
    console.log('handlePress');
  }

  handlePressDown = () => {
    console.log('handlePressDown');
  }

  handlePressUp = () => {
    console.log('handlePressUp');
  }

  handlePress = (e) => {
    if (e.isFinal) {
      this.handlePressDown(e);
    } else {
      this.handlePressUp(e);
    }
  }

  linked = (e) => {
    this.link = e;
  } 

  render() {
    if (this.props.mode === 'user') {
      return (
        <div ref={this.linked} style={styles.user} />
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