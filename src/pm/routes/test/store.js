import { createSelector } from 'reselect';
import { connect } from 'react-redux';


function selector(state, props) {
  return state[props.id || 'test'];
}

function result(state) {
  return { state };
}

const mapStateToProps = createSelector(selector, result);
const store = connect(mapStateToProps);


export default store;
