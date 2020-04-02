import React from 'react';


import Tree from './@Tree';
import Form from './@Form';


function getTemplateByType(type) {
  switch (type) {
    case 'tree':
      return Tree;
    case 'form':
      return Form;
    default:
      return null;
  }
}

function getTemplate(state) {
  const component = getTemplateByType(state.template.type);
  if (component) {
    return React.createElement(component, { state: state });
  }
  return null;
}


export default getTemplate;