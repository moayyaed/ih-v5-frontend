import { createSelector } from 'reselect';
import { connect } from 'react-redux';


function selector(state, props) {
  return state[props.id || 'test'];
}

function result(state) {
  return { state };
}

const mapStateToProps = createSelector(selector, result);
const con = connect(mapStateToProps);

function getDefaultProps(item) {
  if (item.Naked.defaultProps) {
    return item.Naked.defaultProps;
  }
  return { id: item.Naked.name.toLowerCase() };
}

function preparation(item) {
  const component = con(item);
  component.defaultProps = getDefaultProps(item);
  return component;
}

export default preparation;
