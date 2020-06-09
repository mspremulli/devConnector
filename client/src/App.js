import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {Provider} from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store = {store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path ='/'>
            <Landing />
          </Route>
          <section className = "container">
            <Switch>
              <Route exact path ='/login'>
              <Login />
              </Route>
              <Route exact path ='/register'>
              <Register />
              </Route>
            </Switch>
          </section>
          
        </Fragment>
      </Router>
    </Provider>

  ); 
}

export default App;
