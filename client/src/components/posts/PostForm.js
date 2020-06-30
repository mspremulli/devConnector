import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addpost } from '../../actions/post'

const PostForm = ({addpost}) => {
  const [text, setText] = useState('');


  return (
    <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1" onSubmit={
          (e) => {e.preventDefault();
        addpost({text});
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
  )
}

PostForm.propTypes = {
  addpost:PropTypes.func.isRequired,
}

const mapStateToProps = () =>{

}

export default connect(mapStateToProps)(PostForm)
