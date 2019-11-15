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

  render({ params, url } = this.props.match) {
    return (
      <Table key={params.pageid} tablesh={params.pagesh}tableid={params.pageid} id="table"/>
    );
  }
}


export default AppPage;