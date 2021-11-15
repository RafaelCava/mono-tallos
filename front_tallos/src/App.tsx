import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Groups from './pages/Groups';
import Chat from './components/Chat';
import Login from './pages/Login';
import ComponentProvider from './Context/ComponentProvider';

const App = () => (
  <ComponentProvider>
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/groups" component={Groups} exact />
        <Route path="/chat" component={Chat} exact />
      </Switch>
    </Router>
  </ComponentProvider>
);

export default App;
