import React, { Component } from 'react';
import core from 'core';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SelectIcon from '@material-ui/icons/CheckCircleOutline';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import Checkbox from '@material-ui/core/Checkbox';

import Paper from '@material-ui/core/Paper';
import { Scrollbars } from 'react-custom-scrollbars';

import Script from 'components/@Form/types/@Script';


const styles = {
  root2: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#9E9E9E',
  },
  container1: {
    height: '100%',
    padding: 20,
  },
  body1: {
    padding: 20,
  },
  paper: {
    height: '100%',
  }
}


function handleClickCheckBox(item, select, params) {
  if (item.did === select.did && item.prop === select.prop) {
    core.actions.appdialog.select({ did: null, prop: null, title: null } );
  } else {
    core.actions.appdialog.select({ did: item.value.did, prop: item.value.prop, title: item.title, local: params.local || null });
  }
}


class Imagegrid extends Component {
  componentDidMount() {
    this.request();
  }

  request = () => {
    const props = this.props.state.template;
    const params = this.props.state.component;
    params.dialogid = this.props.state.template.id;
    const { state } = this.props;
    
    core
      .request({ method: 'appdialog_imagegrid', props, params })
      .ok((res) => {
        const select = { 
          folder: state.template.selectnodeid, 
          value: state.template.selectId, 
        }

        // const index = res.data.properties.findIndex(i => i.result.value.did === select.did && i.result.value.prop === select.prop)

        core.actions.appdialog.component({ res:1, list: res.data, select });
        /*
        if (this.link && index !== -1) {
          this.link.scrollTop(index * 50)
        }
        */

      });
  }

  handleClickOk = (item) => {
    core.transfer.send(this.props.state.transferid, item);
  }

  linked = (e) => {
    this.link = e;
  }
  
  render({ state } = this.props) {
    if (state.component.res && state.component.list.length === 0) {
      return (
        <div style={styles.root2} >
          <InboxOutlinedIcon style={{ fontSize: '6em', margin: 6, color: '#B0BEC5' }} />
          <Typography variant="h5">It's empty is here</Typography>
        </div>
      )
    }
    return (
      <>
        <div style={styles.container1}>
          <Paper style={styles.paper}>
            <Scrollbars ref={this.linked} >
              <div style={styles.body1}>
                {state.component.list
                  .map((i, key)=> 
                    <div key={key} >{i}</div>
                )}
              </div>
            </Scrollbars>
          </Paper>
        </div>
      </>
    )
  }
}


export default Imagegrid;