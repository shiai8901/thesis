import React from 'react'
import style from '../sass/PostQuestion.scss';
import axios from 'axios'

var PostQuestion = React.createClass({

  processQuestion: function() {
     event.preventDefault();

     //1. take data from form
     var questionData = {
      userId: this.props.userCurrent.id,
      title: this.refs.questionTitle.value,
      question: this.refs.questionBody.value,
      status: 'open',
      // deadline: ''
     }

     //2. add question back to App
    axios.post('/question', questionData)
    .then(function(res) {
      console.log('========== Success writing question to database');

    })
    .catch(function(err) {
      if (err) {
        console.log('Error writing question to database')
      }
    }); 

     //3. reset the form
     this.refs.questionForm.reset();

  },

  render: function() {
   
    if (this.props.showForm === true) {
      return (
        
        <div className="panel panel-default">
          <div className="panel-body grey noPadding">
            
            <form ref="questionForm" onSubmit={this.processQuestion} >
              
              <div className="form-group">
                <h3>Post a question</h3>
                <label>Title</label>
                <input ref="questionTitle" type="text" className="form-control" placeholder="" required/>
              </div>

              <div className="form-group">
                <label>Question</label>
                <textarea ref="questionBody" className="form-control" rows="5" required></textarea>
              </div>

              <p><button className="btn btn-primary btn-fill" type="submit" id="submit">Post</button> &nbsp;
                 <a onClick={this.props.hideQuestionForm} className="btn btn-default" href="#" role="button">Cancel</a>
              </p>

            </form>
          </div>

        </div>
      )
    } else {
      return (<div/>);
    }
  }
});

export default PostQuestion

