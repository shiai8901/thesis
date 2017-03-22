import React from 'react';
import QuestionItem from './QuestionItem';

var OpenQuestions = React.createClass({

  renderQuestion: function(key) {
    if (!this.props.questions) {
      return (
        <div>
          <p>You have no questions. To ask a question, click the "Post a Question" button</p>
        </div>
      );
    }
    return ( 
      <QuestionItem 
          key={key} 
          index={key} 
          authenticated={this.props.authenticated}
          userCurrent={this.props.userCurrent}
          details={this.props.questions[key]} 
          claimQuestion={this.props.claimQuestion}/> 
    );
  },

  checkIfInDashboard: function() {
    if (this.props.dashboard) {
      return (<h2>My Open Questions</h2>);
    } else {
      return (<p></p>);
    }
  },

  render: function() {
    return (
      <div>        
        { this.checkIfInDashboard() }
        <div>
            { Object.keys(this.props.questions).map(this.renderQuestion) }          
        </div>
      </div>
    );
  }

});

export default OpenQuestions;

