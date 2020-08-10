import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NavBar from './components/NavBar'
import GetApplicationDetails from './components/GetApplicationDetails';
import ApplicationForm from './components/ApplicationForm';

function App() {

  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/applications/new'>
          <ApplicationForm />
        </Route>
        <Route exact path='/applications/:id'>
          <GetApplicationDetails />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
