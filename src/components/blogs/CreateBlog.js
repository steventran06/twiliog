import React, { Component } from 'react'
import {createBlog} from "../../actions"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

class CreateBlog extends Component {
  state = {
    title: '',
    content: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
   // console.log(this.state);
    this.props.createBlog(this.state)
    this.props.history.push("/");
  }
  render() {
    const {auth} = this.props;
    if(!auth.uid) return <Redirect to ="/signin"/>

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Blog</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title">Blog Title</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content">Blog Content</label>
          </div>
          <div className="input-field">
            <button className="btn red accent-4 lighten-1">Create</button>
          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps =(state)=>{
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createBlog: (blog) => dispatch(createBlog(blog))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog)