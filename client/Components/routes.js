import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import About from './About'
import Home from './Home'
import Dashboard from './Dashboard'
// import DashboardPublic from './DashboardPublic'
import Collaborate from './Collaborate'
import ReviewPage from './ReviewPage'
import Graph from './Graph'
import PostQuestionPage from './PostQuestionPage'
import Signup from './Auth/Signup'
import Logout from './Auth/Logout'


module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    
    <Route path="/dashboard" component={Dashboard}/>
    <Route path="/profile/:userId" component={Dashboard}/>
    <Route path="/post-question" component={PostQuestionPage}/>
    <Route path="/about" component={About}/>
    <Route path="/collaborate" component={Collaborate}/>
    <Route path="/review/:questionId/:collaborateId" component={ReviewPage}/>
    <Route path="/graphs" component={Graph}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/logout" component={Logout}/>

  </Route>
);
