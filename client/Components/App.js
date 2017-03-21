import React from 'react';
import { IndexLink } from 'react-router';
import axios from 'axios';
import NavLink from './NavLink';
import style from '../sass/App.scss';

//redux experiment
// import ContainerOne from '../containers/ContainerOne';
// import ContainerTwo from '../containers/ContainerTwo';

export default class App extends React.Component {

  constructor(props) {
    super(props); 

    this.state = {

      user_skills: {},
      ratings: {},
      questions: {},
      userPublicQuestions: {},
      questionsClaimed: {},
      currentUserQuestions: {},
      allUsers: [],
      userPublicProfile: {},
      user: {}
    };
    this.getUserQuestions = this.getUserQuestions.bind(this);
    this.getUserClaimedQuestions = this.getUserClaimedQuestions.bind(this);
  }

  componentWillMount() {
    //we can't call 'this' within axios, so need to hold it in 'context'
    var context = this;

    //this will set the user if there is a current session but no user
    if (!this.state.user.name) {
      //Check Authentication Session
      axios.get('/session')
      .then(function(response) {

        //check to make sure response is a user (has a name propterty)
        if (response.data.name) {
          context.setState({user: response.data});

          var data = {
            userId: response.data.id
          };
          //get users questions and claims
          context.getUserQuestions(data);
          context.getUserClaimedQuestions(data);
        } else {
          console.log('user is not authenticated');
        }

      }).catch(function(err) {
        console.log('Error checking User\'s Authentication Session');
        console.log(err);
      });
    } // ------- End of check authentication session

    //Get all questions
    axios.get('/question')
    .then(function(response) {
      // console.log('========== Success getting All Questions from DB');
      //response.data object is in an array, so need to get element 0
      // console.log('questions:', response);
      context.setState({questions: response.data});
    })
    .catch(function(err) {
      console.log('Error getting All Questions from DB');
    }); // -------- End of get all questions

    //Get all users
    axios.get('/users')
    .then(function(response) {
      // console.log('========== Success getting All Users from DB');
      //response.data object is in an array, so need to get element 0
      context.setState({allUsers: response.data});
    })
    .catch(function(err) {
      console.log('Error getting All Users from DB');
      console.log(err);
    }); // -------- End of get all users

    //get User's questions and claims if they already exist
    if (this.state.user.name) {
      var data = {
        userId: this.state.user.id
      };
      this.getUserQuestions(data);
      this.getUserClaimedQuestions(data);
    }

  }

  getUserQuestions(data) {
    var context = this;

    //do ajax call to get current user questions
    axios.get('/question-for-one-user', { params: data })
    .then(function(response) {
      // console.log('========== Success getting Current User\'s Questions data from DB');
      context.setState({currentUserQuestions: response.data});
    })
    .catch(function(err) {
      console.log('Error getting Current User\'s Questions data from DB');
      console.log(err);
    });
  }

  getUserClaimedQuestions(data) {
    var context = this;
        //do ajax call to get claimed questions
    axios.get('/claim', { params: data })
    .then(function(response) {
      // console.log('========== Success getting Current User\'s Claimed questions from DB', response);
      //response.data object is in an array, so need to get element 0
      context.setState({questionsClaimed: response.data});
    })
    .catch(function(err) {
      console.log('Error getting Current User\'s Claimed questions from DB');
    });
  }

  addQuestion(questionData) {
    var timeStamp = (new Date()).getTime();
    this.state.questions['id' + timeStamp] = questionData;
    
    axios.post('/question', questionData)
    .then(function(res) {
      // console.log('========== Success writing question to database');

    })
    .catch(function(err) {
      if (err) {
        console.log('Error writing question to database');
      }
    });  
  }

  getUserPublicQuestions(userId) {
    var context = this;
    //get user's questions
    var data = {
      userId: userId,
    };
    axios.get('/question-for-one-user', { params: data })
    .then(function(response) {
      // console.log('========== Success getting User\'s Public Profile Questions for', userId);
      // console.log(response.data);
      context.setState({userPublicQuestions: response.data});
    })
    .catch(function(err) {
      console.log('Error getting User\'s Public Profile Questions for', userId);
    });
  }

  claimQuestion(currentUserId, learnerId, questionId) {
    axios.post('/claim', {id_helper: currentUserId, id_learner: learnerId, id_question: questionId})
    .then(function(res) {
      // console.log('========== Success writing claim to database');
    })
    .catch(function(err) {
      if (err) {
        console.log('Error writing claim to database');
      }
    });
  }

  //user click on accept button
  acceptHelper(learnerId, helperId, questionId) {
    
    //create session table
    axios.post('/accept', {
      id_learner: learnerId, 
      id_helper: helperId, 
      id_question: questionId,
    })
    .then(function(res) {
      // console.log('========== Success saving collaborate session');
      // setState to include learnerId, helperId, questionId, roomNumber?
      // redirect to collaborate?
    })
    .catch(function(err) {
      if (err) {
        console.log('Error saving collaborate session');
      }
    });
  }

  getUserPublicProfile(userId) {
    var context = this;
    var data = {
      userId: userId,
    };
    axios.get('/public-profile', { params: data })
    .then(function(response) {
      // console.log('========== Success getting User Public Profile data from DB');
      context.setState({userPublicProfile: response.data});
    })
    .catch(function(err) {
      if (err) {
        console.log('Error getting User Public Profile data from DB');
      }
    });
  }

  removeUser() {
    this.setState({questionsClaimed: {}});
    this.setState({currentUserQuestions: {}});
    this.setState({user: {}});
  }

  render() {

    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        userData: this.state,
        getUserQuestions: this.getUserQuestions.bind(this),
        getUserClaimedQuestions: this.getUserClaimedQuestions.bind(this),
        addQuestion: this.addQuestion.bind(this),
        claimQuestion: this.claimQuestion.bind(this),
        acceptHelper: this.acceptHelper.bind(this),
        getUserPublicProfile: this.getUserPublicProfile.bind(this),
        getUserPublicQuestions: this.getUserPublicQuestions.bind(this),
        removeUser: this.removeUser.bind(this)
      })
    );
    
    /*
    <h3>App.js state</h3>
    <pre>
      {JSON.stringify(this.state, null, 2)}
    </pre>
    */
    
    return (
      <div>
        
        <NavLink userData={this.state}/>
        {childrenWithProps}

        <div className="row">
          <div className="col-sm-9 col-md-9">
            
          </div>
        </div>
      </div>
    );
  }
}
