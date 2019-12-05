import { connect as reduxConnect } from 'react-redux';
import { createSelector } from 'reselect';

const empty = {
  warning: 'Component not set id!'
}

function selector(state, props) {
  return state[props.id] || empty;
}

function result(state) {
  return { state };
}

const mapStateToProps = createSelector(selector, result);
const connecter = reduxConnect(mapStateToProps);

function connect(item) {
  const component = connecter(item);
  component.defaultProps = {
    id: item.Naked.name.toLowerCase(),
  }
  return component;
}

export default connect;