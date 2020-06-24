import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layouts/Alert';
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import {Provider} from 'react-redux';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store = {store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path ='/'>
            <Landing />
          </Route>
          <section className = "container">
          <Alert />
            <Switch>
              <Route exact path ='/login'>
              <Login />
              </Route>
              <Route exact path ='/register'>
              <Register />
              </Route>
              <PrivateRoute exact path = '/dashboard'>
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute exact path = '/create-profile'>
                <CreateProfile />
              </PrivateRoute>
              <PrivateRoute exact path = '/edit-profile'>
                <EditeProfile />
              </PrivateRoute>
            </Switch>
          </section>
          
        </Fragment>
      </Router>
    </Provider>

  ); 
}

export default App;
