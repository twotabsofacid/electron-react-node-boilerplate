import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FPSStats from 'react-fps-stats';
import Home from './pages/Home.js';

export default function App() {
  return (
    <>
      <FPSStats />
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}
