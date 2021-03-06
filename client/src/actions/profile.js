import axios from 'axios';
import {setAlert} from './alert';
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_PROFILE
} from './types';

//get current profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

//get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({type: CLEAR_PROFILE});

  try {
    const res = await axios.get('http://localhost:5000/api/profile/');
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

//get profile by id
export const getProfileById = (userId) => async dispatch => {
  dispatch({type: CLEAR_PROFILE});

  try {
    const res = await axios.get(`http://localhost:5000/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

//get github Repos
export const getGithubRepos = (username) => async dispatch => {
  dispatch({type: CLEAR_PROFILE});

  try {
    const res = await axios.get(`http://localhost:5000/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}


//create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers:{
        'Content': 'application/json'
      }
    }

    const res = await axios.post('http://localhost:5000/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

    if(!edit){
      history.push('/dashboard');

    }

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
} 

//add experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers:{
        'Content': 'application/json'
      }
    }

    const res = await axios.put('http://localhost:5000/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience added', 'success'));


  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

//add education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers:{
        'Content': 'application/json'
      }
    }

    const res = await axios.put('http://localhost:5000/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education added', 'success'));

  

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

//Delete Experience
export const deleteExperience =(id) => async dispatch => {
  try {
     const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Experience removed', 'success'));

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

//Delete Education
export const deleteEducation =(id) => async dispatch => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload:res.data
    })
    dispatch(setAlert('Education removed', 'success'));

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

//Delete Acount and profile
export const deleteAccount =(id) => async dispatch => {
  if(window.confirm('Are you sure? this can not be undone')){
    
    try {
      await axios.delete(`http://localhost:5000/api/profile/`);
      dispatch({
        type: CLEAR_PROFILE
      });
      dispatch({
        type: DELETE_PROFILE
      });
      dispatch(setAlert('Your account has been deleted', 'success'));

    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status}
      });
    }
  }

}

