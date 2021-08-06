import React, { Component } from 'react';
import core from 'core';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SelectIcon from '@material-ui/icons/CheckCircleOutline';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';

const styles = {
  root: {
    padding: 20,
  },
  root2: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#9E9E9E',
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
  return (
    <div style={styles.row}>
      <Typography variant="subtitle2" >
        {props.params.prop}
      </Typography>
      <div style={styles.select}>{props.params.select ? <SelectIcon style={styles.selectIcon} /> : null}</div>
      <div style={styles.body}>
        <div style={styles.text}>{props.params.link}</div>
        <div style={styles.buttons}>
          <Button 
            variant="contained" 
            color="primary" 
            disabled={props.params.link} 
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

class ChannelLink extends Component {
  componentDidMount() {
    this.request();
  }

  request = () => {
    const props = this.props.state.template;
    const params = this.props.state.component;
    params.dialogid = this.props.state.template.id;
    
    core
      .request({ method: 'appdialog_channellink', props, params })
      .ok((res) => {
        core.actions.appdialog.component({ res:1, list: res.data.properties});
      });
  }

  handleClickOk = (item) => {
    core.transfer.send(this.props.state.transferid, item, this.props.state);
  }
  

  render({ state, search } = this.props) {
    if (state.component.res && state.component.list.length === 0) {
      return (
        <div style={styles.root2} >
          <InboxOutlinedIcon style={{ fontSize: '6em', margin: 6, color: '#B0BEC5' }} />
          <Typography variant="h5">It's empty is here</Typography>
        </div>
      )
    }
    return (
      <div style={styles.root} >
        {state.component.list
        .filter(i => {
          if (search) {
            if (i.title2 && i.title2.indexOf(search) !== -1) {
              return true;
            }
            if (i.prop.indexOf(search) !== -1) {
              return true;
            }
            if (i.link.indexOf(search) !== -1) {
              return true;
            }
          } else {
            return true;
          }
          return false;
        })
        .map(i => 
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


export default ChannelLink;