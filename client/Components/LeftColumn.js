import React from 'react'
import ReactStars from 'react-stars'
import axios from 'axios'


export default class LeftColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_img: this.props.userCurrent.profile_img,
      id: this.props.userCurrent.id
    }
    console.log(this.props);
    console.log(this.props.userCurrent.profile_img);
    console.log(this.state.profile_img);
  }

  componentDidMount() {
    var context = this;
    console.log(context.state.id);
    axios.get('/review-getByUserId/' + context.state.id )
      .then(function(response) {
        console.log('all reviews for one user IN LeftColumn ---------------> ', response.data);
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

        context.setState({
          averageOverall: Math.floor(overallTotal / count),
          averageKnowledge: Math.floor(knowledgeTotal / count),
          averageHelpfulness: Math.floor(helpfulnessTotal / count),
          averageExperience: Math.floor(experienceTotal / count),
        })
      })
      .catch(function(err) {
        console.log('error in get all reviews for user', err.message);
      });
  }

  render() {
    return (
      <div className="col-sm-4 col-md-3 sidebar">
      
        <div className="row placeholders">
          <div className="placeholder">
            <img src={this.props.userCurrent.profile_img} width="200px"/>
          </div>
        </div>
        
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr>
                <td><p>Overall Rating</p></td>
                <td>
                  <ReactStars
                    value={this.state.averageOverall}
                    count={5}
                    half={false} 
                    edit={false} />
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td><p>Knowledge</p></td>
                <td>
                  <ReactStars
                    value={this.state.averageKnowledge}
                    count={5}
                    half={false}
                    edit={false}/>
                  </td>
              </tr>
              <tr>
                <td><p>Helpfulness</p></td>
                <td>
                  <ReactStars
                    value={this.state.averageHelpfulness}
                    count={5}
                    half={false}
                    edit={false}/>
                </td>
              </tr>
              <tr>
                <td><p>Overall Experience</p></td>
                <td>
                  <ReactStars
                    value={this.state.averageExperience}
                    count={5}
                    half={false}
                    edit={false}/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    )
  }
}
