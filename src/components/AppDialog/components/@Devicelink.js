import React, { Component } from 'react';
import core from 'core';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SelectIcon from '@material-ui/icons/CheckCircleOutline';


const styles = {
  root: {
    padding: 20,
  },
  row: {
    position: 'relative',
    height: 50,
    borderBottom: '2px dotted #E0E0E0',
    paddingBottom: 4,
    marginBottom: 12,
  },
  body: {
    display: 'flex'
  },
  text: {
    width: '100%',
    marginLeft: 8,
    paddingLeft: 20,
    color: '#9E9E9E',
  },
  buttons: {
    top: -21,
    position: 'relative',
    flexShrink: 0,
  },
  buttonUnlink: {
    marginRight: 18,
    height: 36,
  },
  buttonOk: {
    
  },
  icon: {
    marginLeft: 8,
  },
  select: {
    position: 'absolute',
    top: 22,
    left: 0,
  },
  selectIcon: {
    height: 18,
    color: '#607d8b',
  }
}


function Row(props) {
  console.log(props)
  return (
    <div style={styles.row}>
      <Typography variant="subtitle2" >
        {props.params.prop.toUpperCase()}
      </Typography>
      <div style={styles.select}>{props.params.select ? <SelectIcon style={styles.selectIcon} /> : null}</div>
      <div style={styles.body}>
        <div style={styles.text}>{props.params.link}</div>
        <div style={styles.buttons}>
          <Button 
            variant="contained" 
            color="primary" 
            disabled={!props.params.enable} 
            style={styles.buttonOk}
            onClick={() => props.onClickOk(props.params)} 
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  )
}

class Devicelink extends Component {
  componentDidMount() {
    this.request();
  }

  request = () => {
    const props = this.props.state.template;
    const params = this.props.state.component;

    core
    .request({ method: 'appdialog_devlink', props, params })
    .ok((res) => {
      core.actions.appdialog.component({ list: res.data.properties});
    });
  }

  handleClickOk = (item) => {
    core.transfer.send(this.props.state.transferid, item.result);
  }
  

  render({ state } = this.props) {
    return (
      <div style={styles.root} >
        {state.component.list.map(i => 
          <Row 
            key={i.prop} 
            params={i}
            onClickUnlink={this.handleClickUnlink}
            onClickOk={this.handleClickOk}
          />
        )}
      </div>
    )
  }
}


export default Devicelink;