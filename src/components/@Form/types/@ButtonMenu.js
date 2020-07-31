import React from 'react';
import core from 'core';

import IconButton from '@material-ui/core/IconButton';


import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';


const styles = {
  buttonMini2: {
    width: 22,
    height: 22,
  },
}


function ButtonMenu(props) {

  const handleClick = (event, icon) => {
    if (icon) {
      props.onChange();
    } else {
      props.onChange()
    }
  };

  if (props.enabled) {
    return (
      <div>
        <IconButton className="nb" style={styles.buttonMini2} onClick={(e) => handleClick(e, props.icon)} size="small" >
          {props.icon ? <LinkOffIcon fontSize="small" /> : <LinkIcon fontSize="small" />}
        </IconButton>
      </div>
    );
    
  }
  return null;
}


export default ButtonMenu;