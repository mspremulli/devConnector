import axios from 'axios';
import {setAlert} from './alert';
import {GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST} from './types'

//Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts')

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

//Get a single post
export const getPost = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/post/${id}`)

    dispatch({
      type: GET_POST,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}


//Add like
export const addLike = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: {id, likes: res.data}
    })

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

//remove like
export const removeLike = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: {id, likes: res.data}
    })

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

//Delete post
export const deletePost = (id) => async dispatch => {
  try {
   await axios.delete(`/api/posts/${id}`)

    dispatch({
      type: DELETE_POST,
      payload: id
    })
    dispatch(setAlert('Post Removed', 'Success'))

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

//Add post
export const addPost = (formData) => async dispatch => {
  const config = {
    headers:{
      'Content-type': 'application/json'
    }
  }
  try {
   const res = await axios.post(`/api/posts/`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: red.data
    })

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}