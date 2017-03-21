import React from 'react'
import axios from 'axios'

export default class Signup extends React.Component{
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="container">
        <h2 className="form-signin-heading">Please Login or Sign up</h2>

        <a href="/auth/github">Login/signup with github </a>
      </div>
  )}
}