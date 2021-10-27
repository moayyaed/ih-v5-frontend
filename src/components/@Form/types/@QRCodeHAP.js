import React, { Component } from 'react';
import qrcode from 'qrcode';


const QR_CODE_STRING_OPTIONS = {
  errorCorrectionLevel: 'quartile',
  margin: 0,
  type: 'svg',
  version: 2,
};

function createSetupUri(category, password, setupId) {
  const version = 0;
  const reserved = 0;
  const flags = 2;

  let payload = 0;

  payload = payload | (version & 0x7);

  payload = payload << 4;
  payload = payload | (reserved & 0xf); // reserved bits

  payload = payload << 8;
  payload = payload | (category & 0xff);

  payload = payload << 4;
  payload = payload | (flags & 0xf);

  payload = window.BigInt(payload) << window.BigInt(27);
  payload = window.BigInt(payload) | window.BigInt(Number(password.replace(/\-/g, '')) & 0x7fffffff);

  const payloadBase36 = payload.toString(36).toUpperCase().padStart(9, '0');

  return `X-HM://${payloadBase36}${setupId}`;
}

function getValue(v) {
  if (v && v.id !== undefined) {
    return v.id;
  }
  return 1;
}


class QRCodeHAP extends Component {
  state = { img: null, isLoading: true }

  componentDidMount() {
    const setupUri = createSetupUri(getValue(this.props.global.p1.category), this.props.global.p1.pincode,  this.props.global.p1.setupid);
    
    qrcode.toDataURL(setupUri, { scale: 20 }).then(img => {
      this.setState({ img, isLoading: false });
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.global.p1.category !== prevProps.global.p1.category ||
      this.props.global.p1.pincode !== prevProps.global.p1.pincode ||
      this.props.global.p1.setupid !== prevProps.global.p1.setupid
    ) {
      const setupUri = createSetupUri(getValue(this.props.global.p1.category), this.props.global.p1.pincode,  this.props.global.p1.setupid);
    
      qrcode.toDataURL(setupUri, { scale: 20 }).then(img => {
        this.setState({ img, isLoading: false });
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img style={{ width: 220, height: 220 }} src={this.state.img} />
      </div>
    )
  }
}

/*
function QRCodeHAP(props) {
  
  const img = qrcode.toDataURL(setupUri);


  img.then(res => {
    console.log(res);
  })
  return '';
}
*/


export default QRCodeHAP;