import React from 'react';
import { IndexLink } from 'react-router';
import axios from 'axios';
import NavLink from './NavLink';
import style from '../sass/App.scss';

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
      context.setState({questions: response.data});
    })
    .catch(function(err) {
      console.log('Error getting All Questions from DB');
    }); // -------- End of get all questions

    //Get all users
    axios.get('/users')
    .then(function(response) {
      context.setState({allUsers: response.data});
    })
    .catch(function(err) {
      console.log('Error getting All Users from DB');
      console.log(err);
    }); // -------- End of get all users

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

    axios.get('/question-for-one-user', { params: data })
    .then(function(response) {
      context.setState({currentUserQuestions: response.data});
    })
    .catch(function(err) {
      console.log('Error getting Current User\'s Questions data from DB');
      console.log(err);
    });
  }

  getUserClaimedQuestions(data) {
    var context = this;
    axios.get('/claim', { params: data })
    .then(function(response) {
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
    })
    .catch(function(err) {
      if (err) {
        console.log('Error writing question to database');
      }
    });  
  }

  getUserPublicQuestions(userId) {
    var context = this;
    var data = {
      userId: userId,
    };
    axios.get('/question-for-one-user', { params: data })
    .then(function(response) {
      context.setState({userPublicQuestions: response.data});
    })
    .catch(function(err) {
      console.log('Error getting User\'s Public Profile Questions for', userId);
    });
  }

  claimQuestion(currentUserId, learnerId, questionId) {
    axios.post('/claim', {id_helper: currentUserId, id_learner: learnerId, id_question: questionId})
    .then(function(res) {
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
      context.setState({userPublicProfile: response.data});
    })
    .catch(function(err) {
      if (err) {
        console.log('Error getting User Public Profile data from DB');
      }
    });
  }


  getUserReviews(userId) {
    var context = this;
    
    axios.get('/review-getByUserId/' + userId )
      .then(function(response) {
        console.log('all reviews for one user ---------------> ', response.data);
      
        var content = [];

        response.data.forEach(function(review) {
          content.push(review.content);
          console.log('review.content -------------> ',review.content);
        });

        context.setState({
          reviews: content
        });
      })
      .catch(function(err) {
        console.log('error in get all reviews for user', err.message);
      });
  }

  getUserRatings(userId) {
    var context = this;
    var data = {
      userId: userId
    };
    axios.get('/review-getByUserId/' + userId)
      .then(function(response) {
        console.log('all ratings for one user ---------------> ', response.data);
        var overallTotal = 0;
        var helpfulnessTotal = 0;
        var experienceTotal = 0;
        var knowledgeTotal = 0;
        
        var count = 0;

        response.data.forEach(function(review) {
          count += 1;
          overallTotal += review.overall;
          helpfulnessTotal += review.helpfulness;
          knowledgeTotal += review.knowledge;
          experienceTotal += review.experiment;
        });

        var averageOverall = Math.floor(overallTotal / count);
        var averageKnowledge = Math.floor(knowledgeTotal / count);
        var averageHelpfulness = Math.floor(helpfulnessTotal / count);
        var averageExperience = Math.floor(experienceTotal / count);

        var ratings = {
          averageOverall: averageOverall,
          averageKnowledge: averageKnowledge,
          averageExperience: averageExperience,
          averageHelpfulness: averageHelpfulness
        }
        context.setState({
          ratings: ratings
        })
      })
      .catch(function(err) {
        console.log('error in get all reviews for user', err.message);
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

        getUserReviews: this.getUserReviews.bind(this),
        getUserRatings: this.getUserRatings.bind(this),

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
