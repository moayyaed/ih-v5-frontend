import React from 'react';

import Typography from '@material-ui/core/Typography';


const styles = {

}


function Header(props) {
  return (
    <Typography variant={props.options.size || 'h6'} >
      {props.options.title}
    </Typography>
  )
}


export default React.memo(Header);