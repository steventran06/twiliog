import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {Redirect} from "react-router-dom"
import moment from 'moment'

const BlogDetails = (props) => {
  const {auth} = props;
  if(!auth.uid) return <Redirect to ="/signin"/>

  const id = props.match.params.id;
  const { blog } = props;
    if (blog) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content" key ={blog.id}>
              <span className="card-title">{blog.title}</span>
              <p>{blog.content}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by {blog.authorFirstName} {blog.authorLastName}</div>
              <div>{moment(blog.createAt.toDate()).calendar()}</div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      )
    }
  }

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const blogs = state.firestore.data.blogs;
  const blog = blogs ? blogs[id] : null
  return {
    blog: blog,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'blogs'
  }])
)(BlogDetails);