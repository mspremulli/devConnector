import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layouts/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import {Provider} from 'react-redux';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import AddEducation from './components/profile-forms/AddEducation';
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
              <Route exact path ='/profiles'>
              <Profiles />
              </Route>
              <Route exact path ='/profile/:id'>
              <Profile />
              </Route>

              <PrivateRoute exact path = '/dashboard'>
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute exact path = '/create-profile'>
                <CreateProfile />
              </PrivateRoute>
              <PrivateRoute exact path = '/edit-profile'>
                <EditProfile />
              </PrivateRoute>
              <PrivateRoute exact path = '/add-experience'>
                <AddExperience />
              </PrivateRoute>
              <PrivateRoute exact path = '/add-education'>
                <AddEducation />
              </PrivateRoute>
              <PrivateRoute exact path = '/posts'>
                <Posts />
              </PrivateRoute>
              <PrivateRoute exact path = '/post/:id'>
                <Post />
              </PrivateRoute>
            </Switch>
          </section>
          
        </Fragment>
      </Router>
    </Provider>

  ); 
}

export default App;
