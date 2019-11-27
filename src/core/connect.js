import { connect as reduxConnect } from 'react-redux';
import { createSelector } from 'reselect';


function selector(state, props) {
  return state || {};
}

function result(state) {
  return { state };
}

const mapStateToProps = createSelector(selector, result);
const connect = reduxConnect(mapStateToProps);


export default connect;