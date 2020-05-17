import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';


export function CollapseIcon(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 12, height: 12 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

export function ExpandIcon(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 12, height: 12 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

export function TypeIcon(props) {
  if (props.type === 'text') {
    return (
      <SvgIcon className="close" fontSize="inherit" style={{ width: 16, height: 16 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path>
      </SvgIcon>
    );
  }
  if (props.type === 'image') {
    return (
      <SvgIcon className="close" fontSize="inherit" style={{ width: 16, height: 16 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
      </SvgIcon>
    );
  }
  if (props.type === 'animation') {
    return (
      <SvgIcon className="close" fontSize="inherit" style={{ width: 16, height: 16 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
      </SvgIcon>
    );
  }
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 18, height: 18 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z"></path>
    </SvgIcon>
  );
}