import React from 'react';


import Tree from './@Tree';
import Form from './@Form';
import Options from './@Options';


function getTemplateByType(type) {
  switch (type) {
    case 'tree':
      return Tree;
    case 'form':
      return Form;
    case 'options':
      return Options;
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