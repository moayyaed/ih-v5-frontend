import React, { Component } from 'react';
import Table from 'components/Table';


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  }
};

class AppPage extends Component {
  
  componentDidMount() {
    const { navid, pageid} = this.props.match.params;
  }

  render({ match, history } = this.props) {
    return (
      <Table key={match.params.pageid} match={match} history={history} id="table"/>
    );
  }
}


export default AppPage;