import React from 'react'
import BlogSummary from './BlogSummary'
import {Link} from "react-router-dom"

const BlogList = ({blogs}) => {
  return (
    <div className="project-list section">  
     {blogs && blogs.map(blog =>{
       return (
         <Link to ={`/blog/${blog.id}`}>
         <BlogSummary blog ={blog} key ={blog.id} />
         </Link>
       )
     })}
    </div>
  )
}

export default BlogList
