import React, { Component } from 'react';
import core from 'core';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SelectIcon from '@material-ui/icons/CheckCircleOutline';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import Checkbox from '@material-ui/core/Checkbox';

import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import { Scrollbars } from 'react-custom-scrollbars';


const styles = {
  root: {
    margin: 12,
    width: 'calc(100% - 24px)',
  },
  root2: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#9E9E9E',
  },
  container1: {
    height: '70%',
    padding: 20,
  },
  container2: {
    height: '30%',
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
  body1: {
    padding: 20,
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
  },
  paper: {
    height: '100%',
  },
  paper2: {
    height: '100%',
    padding: 16,
  }
}


function handleClickCheckBox(item, select) {
  if (item.did === select.did && item.prop === select.prop) {
    core.actions.appdialog.select({ did: null, prop: null, title: null } );
  } else {
    core.actions.appdialog.select({ did: item.value.did, prop: item.value.prop, title: item.title });
  }
}

function Row(props) {
  return (
    <div style={styles.row}>
      <Typography variant="subtitle2" >
        {props.params.prop.toUpperCase()}
      </Typography>
      <div style={styles.select}>{props.params.select ? <SelectIcon style={styles.selectIcon} /> : null}</div>
      <div style={styles.body}>
        <div style={styles.text}>{props.params.link}</div>
        <div style={styles.buttons}>
        <Checkbox
          checked={(props.params.result.did === props.select.did && props.params.result.prop === props.select.prop)}
          color="primary"
          edge="start"
          tabIndex={-1}
          disableRipple
          onClick={() => handleClickCheckBox(props.params.result, props.select)}
        />
        </div>
      </div>
    </div>
  )
}

class Setvalue extends Component {
  componentDidMount() {
    console.log('!', this.props.state.template)
    this.request();
  }

  request = () => {
    const props = this.props.state.template;
    const params = this.props.state.component;
    params.dialogid = this.props.state.template.id;
    const { state } = this.props;
    
    core
      .request({ method: 'appdialog_setvalue', props, params })
      .ok((res) => {
        const select = { 
          did: state.template.selectnodeid, 
          prop: state.template.selectId, 
          func: state.component.select.func ? state.component.select.func : state.template.func,
          title: state.template.title,
        }

        const index = res.data.properties.findIndex(i => i.result.value.did === select.did && i.result.value.prop === select.prop)

        core.actions.appdialog.component({ res:1, list: res.data.properties, select });

        if (this.link && index !== -1) {
          this.link.scrollTop(index * 50)
        }
      });
  }

  handleClickOk = (item) => {
    core.transfer.send(this.props.state.transferid, item);
  }

  handleChangeScript = (a, b, c, value) => {
    const { state } = this.props;
    core.actions.appdialog.select({  func: value });
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
                {state.component.list.map(i => 
                  <Row 
                    key={i.prop}
                    params={i}
                    select={state.component.select}
                    onClickUnlink={this.handleClickUnlink}
                    onClickOk={this.handleClickOk}
                  />
                )}
              </div>
            </Scrollbars>
          </Paper>
        </div>
        <div style={styles.container2}>
          <Paper style={styles.paper2}>
            <TextField
              label="Value"
              style={styles.root}
              InputLabelProps={{ shrink: true }} 
              value={0}
              onChange={(e) => {}}
            />
          </Paper>
        </div>
      </>
    )
  }
}


export default Setvalue;