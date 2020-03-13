import React, { Component } from 'react';
import core from 'core';

import Typography from '@material-ui/core/Typography';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import SplitButton from './SplitButton';


const styles = {
  root: {
    width: '100%',
    height: 60,
    display: 'flex', 
    alignItems: 'center', 
    paddingLeft: 20, 
    paddingRight: 20, 
    backgroundColor: '#f5f5f5',
  },
  breadcrumbs: { 
    paddingLeft: 5,
    width: 'calc(100% - 175px)',
  },
  text: {
    fontSize: 14,
  }
}


class Breadcrumbs extends Component {
  handleChangeRoute = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    const { route } = this.props;
  
    const componentid = item.component;

    if (componentid) {
      const params = core.cache.componentsParams[componentid] ?  
      '/' + core.cache.componentsParams[componentid] :
      '/' + core.options.componentsScheme[componentid].defaultTab;
    
      core.route(`${route.menuid}/${route.rootid}/${componentid}/${item.id}${params}`);
    } else {
      core.actions.app.alertOpen('warning', 'Navigation is not supported, component not found!');
    }
  }

  render({ data } = this.props) {
    return (
      <MuiBreadcrumbs style={styles.breadcrumbs} >
        {data.map((item, key) => {
          if (data.length - 1 !== key) {
            return (
              <Link key={item.id} style={styles.text} color="inherit" onClick={(e) => this.handleChangeRoute(e, item)} >
                {item.title}
              </Link>
            )
          }
          return <Typography key={item.id} style={styles.text} color="textPrimary">{item.title}</Typography>;
        })}
      </MuiBreadcrumbs>
    );
  }
}


function Toolbar(props) {
  return (
    <div style={styles.root}>
      <Breadcrumbs route={props.route} data={props.breadcrumbs}/>
      <SplitButton disabled={!props.save} onClick={props.onClick} />
    </div>
  )
}


export default Toolbar;