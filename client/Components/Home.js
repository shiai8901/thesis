import React from 'react';
import { Link } from 'react-router';
import OpenQuestions from './OpenQuestions';
import HomepageSearchBar from './HomepageSearchBar';
import HelperProfiles from './HelperProfiles';

export default class Home extends React.Component {

  render() {
    return (
      <div className="row">
      <HomepageSearchBar/>
        <div className="col-sm-1 col-md-1"/>
        
        <div className="col-sm-10 col-md-10">
          { /* OpenQuestions.js */}
          <OpenQuestions 
            userCurrent={this.props.userData.user}
            questions={this.props.userData.questions}
            claimQuestion={this.props.claimQuestion} />

          { /* FindHelpers Compoent */}
          <HelperProfiles allUsers={this.props.userData.allUsers} />
        </div>        
      </div>
    );
  }
}