import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {addLike, removeLike, deletePost} from '../../actions/post'
import PropTypes from 'prop-types'

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth, 
  post:{_id, text, name, avatar, user, likes, date}}) => {
  return (
    <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src="{avatar}"
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
             {text}
            </p>
             <p class="post-date">
                Posted on <Moment format = 'YYYY/MM/DD'>{date}</Moment>
            </p>
            <button onClick={(e) => addLike(id)}  type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
             {like.length > 0 &&(

              <span class='like-count'>{like.length}</span>
              )}
            </button>
            <button type="button" onClick={(e) => removeLike(id)} class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/_id`} class="btn btn-primary">
              Discussion {comment.length > 0 &&(

              <span class='comment-count'>{comment.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (

              <button     
              onClick={(e) => deletePost(_id)} 
              type="button"
              class="btn btn-danger"
            >
              <i class="fas fa-times"></i>
            </button>
            )}

          </div>
        </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike:PropTypes.func.isRequired,
  removeLike:PropTypes.func.isRequired,
  deletePost:PropTypes.func.isRequired,
}

const mapStateToProps =(state) ({
  auth:state.auth
})

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem)
