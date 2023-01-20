import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom'
/* import Navbar from './layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import BlogDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject' */

import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import BlogDetails from './components/blogs/BlogDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateBlog from './components/blogs/CreateBlog';
import Verify from './components/auth/Verify';
import history from './history.js'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route exact path='/verify'component={Verify} />
            <Route path='/blog/:id' component={BlogDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateBlog} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;