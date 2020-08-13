import React from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import GetApplicationDetails from './GetApplicationDetails';
import ApplicationForm from './ApplicationForm';
import Admin from './Admin'

function Routes() {
    return (
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
            <Route exact path='/applications/closed'>
                <Admin status='closed' />
            </Route>
            <Route exact path='/applications/:id'>
                <GetApplicationDetails />
            </Route>
        </Switch>
    )
}

export default Routes