import React from 'react';
import {Link, browserHistory} from 'react-router';
import UserProfile from './UserProfile';
import Skills from './Skills';
import PostQuestionButton from './PostQuestionButton';
import PostQuestion from './PostQuestion';
import ClaimedQuestions from './ClaimedQuestions';
import OpenQuestions from './OpenQuestions';
import ClosedQuestions from './ClosedQuestions';

export default class RightColumn extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showButton: true,
      userOnlyQuestions: {},
    };
  }

  componentWillMount() {
    // console.log('inside RightColumn componentWillMount', this.props);
    // console.log('in RIghtCOlumn, Authenticated?', this.props.authenticated);  
    //do ajax call to get Helpers (those who claim current user's questions)
    //right now do it in App because the dummy data state is there
    console.log('RightColumn component will mount');
  }

  componentDidMount() {
    // console.log('CURRENT USER in RightCOlumn: ', this.props.userCurrent);
  }

  

  render() {

    var showQuestionForm = function() {
      this.setState({
        showForm: true,
        showButton: false
      });
    };

    var hideQuestionForm = function() {
      this.setState({
        showForm: false,
        showButton: true
      });
    };

    //currently we are not passing authenticated={this.props.authenticated} to OpenQuestions to hide the claim button from user dashboard
    return (
      <div className="col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 main">
        <UserProfile userCurrent={this.props.userCurrent} />
        <Skills />
        <PostQuestionButton 
          showButton={this.state.showButton} 
          showQuestionForm={showQuestionForm.bind(this)} />
        <PostQuestion 
          userCurrent={this.props.userCurrent} 
          addQuestion={this.props.addQuestion} 
          showForm={this.state.showForm} 
          hideQuestionForm={hideQuestionForm.bind(this)}/>
        <ClaimedQuestions 
          questionsClaimed={this.props.questionsClaimed}
          acceptHelper={this.props.acceptHelper} />
        <OpenQuestions 
          dashboard={this.props.dashboard}
          userCurrent={this.props.userCurrent} 
          questions={this.props.questions} />
        <ClosedQuestions />
      </div>
    );
  }
}
