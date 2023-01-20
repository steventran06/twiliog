import React, { Component } from 'react'
import BlogList from '../blogs/BlogList'
import {connect} from "react-redux"
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Redirect} from "react-router-dom"

class Dashboard extends Component {
  render() {
    //console.log(this.props);
    const {blogs,auth} = this.props; 
    if(!auth.uid) return <Redirect to ="/signin"/>
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <BlogList blogs={blogs} />
          </div>
          <div className="col s12 m5 offset-m1">
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps =(state)=>{
  console.log(state);
  return {
  
  //  blogs : state.blog.blogs
  blogs: state.firestore.ordered.blogs,
  auth : state.firebase.auth
  }
}



export default compose (
   connect(mapStateToProps),
   firestoreConnect([
    { collection: 'blogs', orderBy :['createAt', 'desc']}
  ])
   )(Dashboard)