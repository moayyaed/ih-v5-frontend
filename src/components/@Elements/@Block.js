import React from 'react';
import { transform } from './tools';

  /*
let keyframes1 =`
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
`;

let keyframes2 =`
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
`;

let keyframes3 =`
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;

let styleSheet = document.styleSheets[0];

try {
  styleSheet.insertRule(keyframes1, styleSheet.cssRules.length);
} catch {

}
try {
  styleSheet.insertRule(keyframes2, styleSheet.cssRules.length);
} catch {

}
try {
  styleSheet.insertRule(keyframes3, styleSheet.cssRules.length);
} catch {

}
*/



function Block(props) {
  return (
    <div 
      style={{
        // animation: 'spin 4s linear infinite',
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize.value}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
        borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value,
        opacity: props.item.opacity.value / 100,
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: transform(props.item),
      }}
    />
  );
}


export default Block;