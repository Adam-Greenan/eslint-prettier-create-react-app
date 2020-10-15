import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Projects from './containers/Projects'
import Project from './containers/Project/Project'
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Projects />
        </Route>
        <Route exact path="/projects/:id" render={(props) => <Project {...props} />} />
      </Switch>
    </div>
  );
}

export default App;