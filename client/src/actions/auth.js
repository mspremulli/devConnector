import axios from 'axios';
import {setAlert} from './alert';
import {
  REGISTER_FAIL, 
  REGISTER_SUCCESS, 
  USER_LOADED, 
  // AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE
 } from './types';
import setAuthToken from '../utils/setAuthToken';


// import express from 'express';
// import cors from 'cors';
// const cors = require('cors');
// const express = require('express');
// const app = express();
// app.use(cors());




//Load User
export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: Audio
    });
  }

}


//Register User
export const register = ({name, email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({name, email, password});
    console.log('body', body);
    try {
      console.log('testing...')
      // const res = await axios.post('http://localhost:5000/api/users', body, config);
      const res = await axios.post('/api/users', body, config);
      console.log('testing...2')
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    }
    catch (err) {
      const errors = err.response.data.errors;
      if(errors) {
        errors.foreach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: REGISTER_FAIL
      });
    }
}

//Login User
export const login = ({email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({email, password});
    
    try {
      const res = await axios.post('/api/auth', body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    }

   

    catch (err) {
      const errors = err.response.data.errors;
      if(errors) {
        errors.foreach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: LOGIN_FAIL
      });
    }
}

//Logout

export const logout = () => dispatch => {
  dispatch({type:LOGOUT});
  dispatch({type:CLEAR_PROFILE});
}