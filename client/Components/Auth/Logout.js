import React from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router'

export default React.createClass({

  handleLogout() {
    var context = this;

    axios.post('/logout')
    .then(function (response) {
      context.props.removeUser();
      browserHistory.push('/');
    })
    .catch(function(err) {
      console.log('There was an error logging out: ', err);
    });
  },

  render() {
    return (
      <div>
          <h2> Are you sure you want to log out? </h2>
          <button onClick={this.handleLogout}>Log out </button>
      </div>
  )}

})