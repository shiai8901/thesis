import React from 'react'
import style from '../sass/PostQuestion.scss';

var PostQuestion = React.createClass({

  processQuestion: function() {
     this.refs.questionForm.reset();
  },

  render: function() {
    return (
      <div className="row">
      <div className="col-sm-1 col-md-1"/>
      
      <div className="col-sm-10 col-md-10 main">

        <div className="panel panel-default">
          <div className="panel-body grey noPadding">
            
            <form ref="questionForm" onSubmit={this.processQuestion}>
              
              <div className="form-group">
                <h3>Post a question</h3>
                <label>Title</label>
                <input ref="questionTitle" type="text" className="form-control" placeholder="" required/>
              </div>

              <div className="form-group">
                <label>Question</label>
                <textarea ref="questionBody" className="form-control" rows="5" required></textarea>
              </div>

              <p><button className="btn btn-primary" type="submit" id="submit">Post</button> &nbsp;
                 <a className="btn btn-default" href="#" role="button">Cancel</a>
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
    )
  }
});

export default PostQuestion

