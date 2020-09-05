import React from 'react';
import 'antd/dist/antd.css';

import { BrowserRouter as Router } from 'react-router-dom';

import { useRoutes } from './routes';

function App() {
  const routes = useRoutes(false);

  return (
    <Router>
      <div>{routes}</div>
    </Router>
  );
}

export default App;
