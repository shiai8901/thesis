import React from 'react';
import { Link } from 'react-router';
import HelperProfileItem from './HelperProfileItem';

export default React.createClass({

  renderProfile(key) {
    return (
      <HelperProfileItem key={key}
        index={key} 
        details={this.props.allUsers[key]} />
    );
  },

  render() {
    return (
      <div>
        <h2>Find Hackers</h2>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row placeholders">
              
              { Object.keys(this.props.allUsers).map(this.renderProfile) }
              
            </div>
          </div>
        </div>
      </div>
    );
  }
});
