import React from 'react'
import ReactStars from 'react-stars'
import axios from 'axios'

export default class ReviewPage extends React.Component {

	constructor(props) {
		super(props);
		console.log(this.props.params);
		this.state = {
			collaborateId: +this.props.params.collaborateId,
			questionId: this.props.params.questionId,
			question: {title: '', question: ''},
			helper: {profile_img: ''},
			overall: 0,
			knowledge: 0,
			helpfulness: 0,
			experience: 0,
			editStarBtn: 'Save',
			alert: false,
			closeQuestion: false
		}
		this.overallStar = this.overallStar.bind(this);
		this.knowleageStar = this.knowleageStar.bind(this);
		this.helpfulnessStar = this.helpfulnessStar.bind(this);
		this.overallExpStar = this.overallExpStar.bind(this);
		this.textareaChange = this.textareaChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCloseQuestion = this.handleCloseQuestion.bind(this);
	}

	componentWillMount() {
		var context = this;
		axios.get('/collaborate-review', {
			params: {
				collaborateId: this.state.collaborateId
			}
		})
		.then(function(collaborate) {
			console.log('collaborate.data in ReviewPage ---> ', collaborate.data);
			context.setState({
        learnerId: collaborate.data.id_learner,
        helperId: collaborate.data.id_helper,
        questionId: collaborate.data.id_question,
        learner: collaborate.data.Learner,
        helper: collaborate.data.Helper,
        question: collaborate.data.Question,
			});
			console.log('ReviewPage state ---> ', context.state);
		})
		.catch(function(err) {
			console.log(err.message);
		});
	}

	overallStar(newRating) {
	  this.setState({overall: newRating});
	}

	knowleageStar(newRating) {
  	this.setState({knowledge: newRating});
	}

	helpfulnessStar(newRating) {
  	this.setState({helpfulness: newRating})
	}

	overallExpStar(newRating) {
  	this.setState({experience: newRating})
	}

	textareaChange(event) {
    this.setState({content: event.target.value});
  }

	handleSubmit() {
		var context = this;
		var data = {
			id_learner: context.state.learnerId,
			id_helper: context.state.helperId,
			id_collaborate: context.state.collaborateId,
			content: context.state.content,
			knowledge: context.state.knowledge,
			helpfulness: context.state.helpfulness,
			overall: context.state.overall,
			experience: context.state.experience
		};
		console.log('data in submit: ', data);
		axios.post('/review-save', data)
		.then(function() {
			context.setState({alert: true});
			console.log('review been posted successfully.');
		})
		.catch(function(err) {
			console.log('error in saving review, ', err.message);
		});
	}

	handleCloseQuestion() {
		// this.setState({closeQuestion: true});

		var context = this;
		axios.post('/close-question', 
			{
				status: 'closed',
				id_question: context.state.questionId
			})
		.then(function() {
			this.setState({closeQuestion: true});
		})
		.catch(function(err) {
			console.log('error in closing question.', err.message);
		});
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-4 col-md-3 sidebar">
      
		        <div className="row placeholders">
		          <div className="placeholder">
		            <img src={this.state.helper.profile_img} width="200px"/>
		          </div>
		        </div>
		        
		        <div className="table-responsive">
		        	<h3>Rate your helper</h3>
		          <table className="table">
		            <tbody>
		              <tr>
		                <td>Overall</td>
		                <td>
		                	<ReactStars
		                	value={this.state.overall}
		                    count={5}
		                    half={false}
		                    onChange={this.overallStar}/>
		                </td>
		              </tr>
		              <tr>
		                <td>&nbsp;</td>
		                <td>&nbsp;</td>
		              </tr>
		              <tr>
		                <td>Knowledge</td>
		                <td>
		                	<ReactStars
		                	value={this.state.knowledge}
		                    count={5}
		                    half={false}
		                    onChange={this.knowleageStar}/>
		                </td>
		              </tr>
		              <tr>
		                <td>Helpfulness</td>
		                <td>
		                	<ReactStars
		                	value={this.state.helpfulness}
		                    count={5}
		                    half={false}
		                    onChange={this.helpfulnessStar}/>
		                </td>
		              </tr>
		              <tr>
		                <td>Overall Experience</td>
		                <td>
		                	<ReactStars
		                	value={this.state.experience}
		                    count={5}
		                    half={false}
		                    onChange={this.overallExpStar}/>
		                </td>
		              </tr>
		            </tbody>
		          </table>
		        </div>        
      		
      		</div>

					<div className="col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 main">
						<div className="panel panel-default">
	            <div className="panel-heading">
	              <h3 className="panel-title">{this.state.question.title}</h3>
	            </div>
	            <div className="panel-body">
	              <div id="review-question" >{this.state.question.question}</div>
	              <hr></hr>
	              {this.state.closeQuestion ? 
	              	(<div className="alert alert-success" role="alert">
								  Question is closed.
									</div>) : 
									(<div id="close-question">
										<strong>If you do not need further help with this question. You can close the question.</strong>
	              		<button onClick={this.handleCloseQuestion} type="button" className="btn btn-default pull-right">close the question</button>
	              	</div>)
	              }
	              	              	
	            </div>
	          </div>
						<div className="panel panel-default">
	            <div className="panel-heading">
	              <h3 className="panel-title">Comments</h3>
	            </div>
	            <div className="panel-body">
	              <div>
	                  <textarea className="form-control" id="review-comments" rows="12" value={this.state.content} onChange={this.textareaChange}></textarea>
	              </div>
	              <hr></hr>
	              <div>
	              {this.state.alert ? null: 
	              (<button onClick={this.handleSubmit} type="button" id="submit-review" className="btn btn-default pull-right">Submit</button>)} 
	            	</div>
		            {this.state.alert ? 
		            (<div className="alert alert-success" role="alert">
								  <strong>Thank you!</strong> You successfully submit the review.
								</div>) : null}
	            </div>
	          </div>
		      </div>

				</div>
			</div>
		)
	}
}