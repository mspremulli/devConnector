import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addComment} from '../../actions/post'


const commentForm = ({postId, addComment}) => {
  const [text, setText] = useState('')
  return (
    <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1" onSubmit={
          (e) => {e.preventDefault();
        addComment(postId, {text});
        setText=('')}
        }>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
}

commentForm.propTypes = {
  addComment:PropTypes.func.isRequired,
  removeComment:PropTypes.func.isRequired,
}
const mapStateToProps =(state) => {
  comment: state.comment
}

export default connect(mapStateToProps, {addComment})(commentForm)
