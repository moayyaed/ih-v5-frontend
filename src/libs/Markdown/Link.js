/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

import clsx from 'clsx';

import MuiLink from '@material-ui/core/Link';


function Link(props) {
  const {
    activeClassName,
    className: classNameProps,
    innerRef,
    naked,
    role: roleProp,
    router,
    ...other
  } = props;


  const className = clsx(classNameProps, {

  });


  // catch role passed from ButtonBase. This is definitely a link
  const role = roleProp === 'button' ? undefined : roleProp;

  return (
    <MuiLink className={className} ref={innerRef} role={role} {...other} />
  );
}


Link.defaultProps = {
  activeClassName: 'active',
};


export default React.forwardRef((props, ref) => <Link {...props} innerRef={ref} />);
