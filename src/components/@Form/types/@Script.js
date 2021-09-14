import React, { PureComponent } from 'react';

import AceEditor from 'react-ace';
import ReactResizeDetector from 'react-resize-detector';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
} from 'react-mosaic-component';

import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-markdown';

import 'react-mosaic-component/react-mosaic-component.css';
import './@Code/code.css';


const scheme = 'script'


const EMPTY_ARRAY = [];


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
  }
}

function createHideFunction(string) {
  return new Function('data', 'return ' + string);
}



class Script extends PureComponent { 

  renderButtons = (id) => {
    return []
  }

  renderComponent = (id) => {
    const { props, state } = this;
    const disabled = typeof props.options.disabled === 'function' ? props.options.disabled(props.global) : props.options.disabled;
    if (id === 'script') {
      return (
        <ReactResizeDetector key={id} handleWidth handleHeight>
          {({ width, height }) => 
            <AceEditor
              mode={this.props.options.mode || 'javascript'}
              theme={this.props.options.theme ||  'tomorrow'}
              width={width || '100%'}
              height={height || '100%'}
              name={id}
              fontSize={14}
              value={props.data}
              setOptions={{ useWorker: false }}
              readOnly={disabled}
              setOptions={{ 
                useWorker: false,
                tabSize: 2,
                useSoftTabs: true
              }}
              onChange={(value) => props.onChange(props.id, props.options, null, value)}
            />}
        </ReactResizeDetector>
      )
    }
    return null;
  }

  render() {
    return (
      <div style={styles.root}>
        <Mosaic
          className="mosaic-blueprint-theme"
          initialValue={scheme}
          renderTile={(id, path, x) => {
            return (
              <MosaicWindow
                key={id}
                draggable={true}
                title={this.props.options.title}
                additionalControls={EMPTY_ARRAY}
                path={path}
                renderToolbar={null}
                toolbarControls={this.renderButtons(id)}
              >
                {this.renderComponent(id)}
              </MosaicWindow>
            )
          }}
        />
      </div>
    )
  }   
}


export default Script;