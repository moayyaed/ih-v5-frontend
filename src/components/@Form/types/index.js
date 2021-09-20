import React from 'react';

import Text from './@Text';
import Header from './@Header';
import Input from './@Input';
import InputLink from './@InputLink';
import Number from './@Number';
import Password from './@Password';
import Checkbox from './@Checkbox';
import Textarea from './@Textarea';
import List from './@List';
import Droplist from './@Droplist';
import DroplistLink from './@DroplistLink';
import Tags from './@Tags';
import Color from './@Color';
import Color2 from './@Color2';
import Slider from './@Slider';
import Url from './@Url';
import Img from './@Img';
import Image from './@Image';
import Images from './@Images';
import Shadow from './@Shadow';
import Animation from './@Animation';
import Actions from './@Actions';
import Combine from './@Combine';
import Debug from './@Debug';
import Html from './@Html';

import Layout from './@Layout';
import Container from './@Container';
import Template from './@Template';
import Dialog from './@Dialog';
import Button from './@Button';
import SmartButton from './@SmartButton';
import SmartButton2 from './@SmartButton2';
import Table from './@Table';
import Code from './@Code';
import Diagram from './@Diagram';
import Script from './@Script';
import Subtree from './@Subtree';
import Submenu from './@Submenu';
import PortalAuth from './@PortalAuth';
import Frame from './@Frame';
import Webconsole from './@Webconsole';
import Markdown from './@Markdown';
import Portal from './@Portal';


function getComponentByType(type) {
  switch (type) {
    case 'text':
      return Text;
    case 'cb':
      return Checkbox;
    case 'header':
      return Header;
    case 'input':
      return Input;
    case 'inputlink':
      return InputLink;
    case 'number':
      return Number;
    case 'password':
      return Password;
    case 'textarea':
      return Textarea;
    case 'table':
      return Table;
    case 'list':
      return List;
    case 'droplist':
      return Droplist;
    case 'droplistlink':
      return DroplistLink;
    case 'tags':
      return Tags;
    case 'color':
      return Color;
    case 'color2':
      return Color2;
    case 'slider':
      return Slider;
    case 'url':
      return Url;
    case 'img':
      return Img;
    case 'image':
      return Image;
    case 'images':
      return Images;
    case 'shadow':
      return Shadow;
    case 'animation':
      return Animation;
    case 'actions':
      return Actions;
    case 'combine':
      return Combine;
      
    case 'layout':
      return Layout;
    case 'container':
      return Container;
    case 'template':
      return Template;
    case 'dialog':
      return Dialog;
    case 'smartbutton':
      return SmartButton;
    case 'smartbutton2':
      return SmartButton2;
    case 'button':
      return Button;
    case 'code':
      return Code;
    case 'diagram':
      return Diagram;
    case 'script':
      return Script;
    case 'pluginform1':
    case 'subtree':
      return Subtree;
    case 'submenu':
      return Submenu;
    case 'portalauth':
        return PortalAuth;
    case 'frame':
      return Frame;
    case 'webconsole':
      return Webconsole;
    case 'debug':
      return Debug;
    case 'html':
      return Html;
    case 'markdown':
      return Markdown;
    case 'portal':
      return Portal;
    default:
      return Text;
  }
}

function components(id, item, data, cache, global, route, onChange, getStyle, mini = false, mode) {
  const component = getComponentByType(item.type);

  if (item.type === 'droplist') {
    return React.createElement(component, { key: item.prop, id, options: item, data, cache, global, route, onChange, getStyle, mini, mode });
  }
  return React.createElement(component, { key: item.prop, id, options: item, data, cache, global, route, onChange, getStyle, mini, mode });
}


export default components;