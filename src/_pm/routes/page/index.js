import React from 'react';
import { useRouteMatch } from 'react-router-dom';

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

function Page() {
  const { path, url, params } = useRouteMatch();
  return (
    <div>
      {`${params.type} ${params.id}`}
    </div>
  );
}


export default Page;