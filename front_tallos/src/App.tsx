import React from 'react';
import './App.css';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Groups from './components/Groups/Groups';
import Chat from './components/Chat/Chat';

io('http://localhost:3000', { transports: ['websocket'] });

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Groups} exact />
        <Route path="/chat" component={Chat} exact />
      </Switch>
    </Router>
  );
}

export default App;
