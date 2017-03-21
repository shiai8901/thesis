import React from 'react';
import { Link } from 'react-router';

export default React.createClass({

  constructProfileLink() {
    // return 'profile/' + this.props.details.github_id;
    return 'profile/' + this.props.details.id;
  },

  render() {
    return (
      <div className="col-xs-6 col-sm-3 placeholder">
        <img src={this.props.details.profile_img} width="200px"/>
        <h3><Link to={this.constructProfileLink()}>{this.props.details.name}</Link></h3>
        
        <p>&nbsp;</p>
        <p>Javascript (5)</p>
        <p>HTML (5)</p>
        <p>CSS (5)</p>
        
      </div>
    );
  }
});
