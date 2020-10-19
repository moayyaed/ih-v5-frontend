import React, { useState } from 'react';
import core from 'core';

import icon from 'components/icons';

import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PublishIcon from '@material-ui/icons/Publish';
import AdbIcon from '@material-ui/icons/Adb';

import SnapForm from './SnapForm';

import shortid from 'shortid';
// import html2canvas from 'html2canvas';
import domtoimage from 'libs/dom-to-image'; 


const styles = {
  box: {
    display: 'flex',
  },
  logo: {
    width: 60,
    height: 60,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    zIndex: 1000,
  },
  stub: {
    width: 60,
    height: 35,
    backgroundColor: '#607D8B',
    flexShrink: 0,
    zIndex: 101,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 35,
    backgroundColor: '#607D8B',
    boxShadow: 'rgba(0, 0, 0, 0.157) 0px 3px 10px, rgba(0, 0, 0, 0.227) 0px 3px 10px',
    overflow: 'hidden',
    zIndex: 100,
  },
  icon: {
    color: '#64b4d7',
    fontSize: 40,
  },
  button: {
    marginRight: 12,
    color: '#fafafa',
  },
};


function WebIcon(props) {
  return (
    <SvgIcon style={{ fontSize: 16 }}  viewBox="0 0 24 24"  {...props}>
      <path d="M12.281,0 C13.599,0.166 13.079,-0.037 13.908,0.408 L23.32,7.242 C23.756,7.554 24,8.007 24,8.489 C24,8.959 23.756,9.413 23.32,9.729 L13.908,16.564 C13.307,17 12.446,17.108 11.714,16.842 C10.983,16.57 10.507,15.975 10.507,15.323 L10.507,1.649 C10.507,0.997 10.983,0.402 11.714,0.13 L12.281,0 z"></path><path d="M9.028,2.958 L9.028,4.695 L1.393,4.695 L1.393,18.432 L22.402,18.432 L22.402,11.985 L24,10.875 L24,20.17 L-0,20.17 L-0,2.958 L9.028,2.958 z"></path>
      <path d="M8.13,24 L15.665,24 L14.716,22.129 L14.716,21.013 L9.023,21.013 L9.023,22.129 L8.13,24"></path>
    </SvgIcon>
  )
}

function handleUpload (props) {
  const data = new FormData();
  const input = document.createElement('input');
  const xhr = new XMLHttpRequest();
  const uuid = shortid.generate();
  
  input.type = 'file';
  input.accept=".ihpack"

  input.onchange = (e) => {
    const list = [];  

    Array
      .from(input.files)
      .forEach(i => {
        data.append('files', i);
        list.push({ name: i.name, size: (i.size / 1024 / 1024).toFixed(2) })
      })

    function handleLog(data) {
      if (data.status) {
        core.tunnel.unsub({ 
          method: 'unsub',
          type: 'watch',
          uuid: uuid,
        }, handleLog);
        if (data.status === 'complete') {
          core.actions.appprogress.log('\r\nComplete!')
          core.actions.appprogress.data({ stepComplete: true })
        }
        if (data.status === 'error') {
          core.actions.appprogress.log('\r\nError: ' + data.message);
          core.actions.appprogress.data({ stepError: true })
        }
      } else {
        core.actions.appprogress.log(data.message);
      }
    }

    function handleDialogClick({ complete, message, replace}) {
      if (message === 'submit') {
        core.tunnel.sub({ 
          method: 'sub',
          type: 'watch',
          uuid: uuid,
        }, handleLog);

        data.append('watch', true);
        data.append('uuid', uuid)
        
        xhr.setRequestHeader('token', core.cache.token);
        xhr.send(data);
      } else {
        if (!complete) {
          xhr.abort();
        }

        list.forEach(i => URL.revokeObjectURL(i.src));

        core.transfer.unsub('form_progress', handleDialogClick);
        core.actions.appprogress.data({ open: false, type: 'upload', list: [], progress: 0, complete: null, message: 'submit', step: 0, log: '', stepError: null, stepComplete: null })
      }
    }

    xhr.upload.onloadstart = function(e) {
      core.actions.appprogress.data({ message: 'uploding' })
    }
    
    xhr.upload.onprogress = (e) => {
      const progress = Math.round((e.loaded / e.total) * 100);
      core.actions.appprogress.data({ progress })
    }

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          try {
            core.actions.appprogress.data({ complete: true, message: 'install', console: true, step: 1 });
            if (props.menuid) {
              core
                .request({ method: 'appnav', props: { requestId: props.menuid } })
                .ok((res) => core.actions.appnav.merge('appnav', res));
            }
          } catch (e) {
            core.actions.appprogress.data({ message: 'error' })
            core.actions.app.alertOpen('warning', 'Error: ' + e.message);
          }
        } else {
          if (xhr.status !== 0) {
            core.actions.appprogress.data({ message: 'error' })
            core.actions.app.alertOpen('warning', xhr.responseText);
          }
        }
      }
    };
    
    xhr.upload.onload = () => {
   
    }
    
    xhr.upload.onerror = (e) => {
      core.actions.appprogress.data({ message: 'error' })
      core.actions.app.alertOpen('warning', 'Error: ' + e.message);
    }

    xhr.open('POST', '/import');

    core.transfer.sub('form_progress', handleDialogClick);
    core.actions.appprogress.data({ open: true, type: 'import', list, step: 0, log: '', stepError: false, stepComplete: false })
  }

  input.click();
}

function handleClick() {
  core.route('');
}

function handleClickUserInterface() {
  window.open('/', '_blank');
}

function handleClickSettings(menuid) {
  if (menuid === 'settings') {
    core.actions.apptabs.data({ list: [] });
    core.route('');
  } else {
    const lastid = menuid;
    const id = 'settings';

    const store = core.store.getState().apptabs;
    const curentPath = core.history.location.pathname.replace(`${core.options.routePrefix}/`, '');

    core.cache.tabs[lastid] = store.list;
    core.cache.navs[lastid] = curentPath;
    core.actions.apptabs.data({ list: [] });
    core.actions.appnav.clear('appnav');
    
    if (core.cache.tabs[id] !== undefined) {
      core.actions.apptabs.data({ list: core.cache.tabs[id] });
    }

    if (core.cache.navs[id] === undefined) {
      core.route(id)
    } else {
      core.route(core.cache.navs[id])
    }
  }
}

function handleClickExit() {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('rememberme');
  
  core.network.realtime.destroy();
  core.actions.app.auth(false);
  
  window.location.href = "/admin";
}

function AppBar(props) {
  const [state, setState] = useState({ open: false, data: null });

  const handleClose = () => {
    setState({ open: false, data: null });
  }

  const handleSnap = () => {
    setState({ open: true, data: null });
    /*
    html2canvas(document.body, { 
      foreignObjectRendering: false, 
      allowTaint: true,
    })
      .then(canvas => {
        setState({ open: true, data: canvas.toDataURL() });
      });
      */
     domtoimage.toPng(document.body)
      .then(function (dataUrl) {
        setState({ open: true, data: dataUrl });
      })
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
  }

  return (
    <>
      { state.open ? <SnapForm state={state} onClose={handleClose} /> : null}
      <div style={styles.box}>
        <div style={styles.stub}/>
        <div style={styles.logo}>
          <IconButton onClick={handleClick}>
            {icon('logo2', styles.icon)}
          </IconButton>
        </div>
        <div style={styles.container}>
          <IconButton style={styles.button} size="small" onClick={() => handleUpload(props)}>
            <PublishIcon fontSize="small" />
          </IconButton>
          <IconButton style={styles.button} size="small" onClick={handleSnap}>
            <AdbIcon fontSize="small" />
          </IconButton>
          <IconButton style={styles.button} size="small" onClick={handleClickUserInterface}>
            <WebIcon fontSize="small" />
          </IconButton>
          <IconButton style={styles.button} size="small" onClick={() => handleClickSettings(props.menuid)}>
            <SettingsIcon style={{ color: props.menuid === 'settings' ? '#03A9F4' : 'unset' }} fontSize="small" />
          </IconButton>
          <IconButton style={styles.button} size="small" onClick={handleClickExit}>
            <ExitToAppIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </>
  );
}


export default React.memo(AppBar);