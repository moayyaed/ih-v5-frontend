import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Dimensions from 'react-dimensions'


function Item(props) {
  return (
    <Draggable position={{ x: props.x, y: props.y }}>
      < div style={{  position: 'absolute', border: `2px solid ${props.color}`, width: props.w, height: props.h }} >
        {props.text}
      </div>
    </Draggable>
  )
}

/*
<div style={{ position: 'absolute', width: '100%', height: '100%' }} >
  <Item  color="red"/>
</div>

//<Item x={10} y={10} color="#3F51B5"/>
*/
function size(i, ww, w, s) {
  return (ww - (w * s)) / 2 + (i * s)
}

function sizey(i, ww, w, s) {
  return 0+ (i * s)
}

function Mnemo(props) {
  
  const w = 78;
  const h = 486;
  const ww = props.containerWidth;
  const wh = props.containerHeight;

  const s = Math.min(
     ww / w,    
     100
  );


//<Item x={10} y={80} w={50} h={50} color="#9C27B0" text="2" />
// <Item x={10} y={150} w={50} h={50} color="#9C27B0" text="3"/>
// <Item x={10} y={220} w={50} h={50} color="#9C27B0" text="4"/>

//  
// this.pos.x + this.pos.w * (this.pos.s-1) / 2;
    
  return (
    <>
      <Item x={size(10, ww, w, s)} y={sizey(10, wh, h, s)} w={50 * s} h={50 * s} color="#9C27B0" text="1" />
      <Item x={size(10, ww, w, s)} y={sizey(80, wh, h, s)} w={50 * s} h={50 * s} color="#9C27B0" text="2" />
      <Item x={size(10, ww, w, s)} y={sizey(150, wh, h, s)} w={50 * s} h={50 * s} color="#9C27B0" text="3" />
      <Item x={size(10, ww, w, s)} y={sizey(220, wh, h, s)} w={50 * s} h={50 * s} color="#9C27B0" text="4" />
      <Item x={size(0, ww, w, s)} y={sizey(0, wh, h, s)} w={w * s} h={h * s} color="#009688" text="" />
    </>
  )
}

function Mnemo2(props) {
  
  const w = 78;
  const h = 486;
  const ww = props.containerWidth;
  const wh = props.containerHeight;

  const s = Math.min(
     ww / w,    
     wh / h,
  );


//<Item x={10} y={80} w={50} h={50} color="#9C27B0" text="2" />
// <Item x={10} y={150} w={50} h={50} color="#9C27B0" text="3"/>
// <Item x={10} y={220} w={50} h={50} color="#9C27B0" text="4"/>

//  
// this.pos.x + this.pos.w * (this.pos.s-1) / 2;
    
  return (
    <>
      <Item x={size(10, ww, w, s)} y={size(10, wh, h, s)} w={50 * s} h={50 * s} color="#9C27B0" text="1" />
      <Item x={size(10, ww, w, s)} y={size(80, wh, h, s)} w={50 * s} h={50 * s} color="#9C27B0" text="2" />
      <Item x={size(10, ww, w, s)} y={size(150, wh, h, s)} w={50 * s} h={50 * s} color="#9C27B0" text="3" />
      <Item x={size(10, ww, w, s)} y={size(220, wh, h, s)} w={50 * s} h={50 * s} color="#9C27B0" text="4" />
      <Item x={size(0, ww, w, s)} y={size(0, wh, h, s)} w={w * s} h={h * s} color="#009688" text="" />
    </>
  )
}

const Container = Dimensions()(Mnemo)
const Container2 = Dimensions()(Mnemo2)

class Test extends Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' }} >
        <div style={{ width: '100%', flexShrink: 0, height: '7%', backgroundColor: 'cadetblue' , border: '1px solid #000000' }} />
        <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: 'blue' }} >
          <div style={{ display: 'flex', flexShrink: 0, width: '10%', height: '100%', backgroundColor: 'orange', border: '1px solid #000000' }} >
            <div style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '100%', border: '1px solid #3F51B5' }} >
              <Container />
            </div>
          </div>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#9E9E9E', border: '1px solid #000000' }} >
            <Container2 />
          </div>
          <div style={{ width: '20%', height: '100%', backgroundColor: '#795548', border: '1px solid #000000' }} >
          </div>
        </div>
      </div>
    );
  }
}


export default Test;