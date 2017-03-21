import React from 'react';
import axios from 'axios';

export default class HomepageSearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    var context = this;
    console.log(document.getElementsByName('textbox1')[0].value);
    axios.get('/search?term=' + document.getElementsByName('textbox1')[0].value) //+ document.getElementsByName("textbox1")[0].value)
      .then(function(response) {
        console.log('searchResp: ', response);
        context.setState({questions: response.data.map(quest => (
        quest.title + ': ' + quest.question)
        )
        });
      // comp.setState({questions: response.data[0].title});
      });
  }

  render() {
    return (
      <div>
        <div className="jumbotron heroImage">
        </div>
        
        <div className="container heroText">
          <div className="row">
            <div className="col-md-12">
              <h2><strong>Get Live Programming Help</strong></h2>
              <h4>... and help those with programming questions</h4>
              <div className="input-group">
                
                <input type="text" className="form-control" name="textbox1" placeholder="Search for questions to answer..."/>
                <span className="input-group-btn">
                  <button className="btn btn-default btn-fill" type="button" onClick={this.clickHandler}>Go!</button>
                </span>
                
                {this.state.questions.map(question => (
                    <p>{question}</p>
                  ))}

              </div>
            </div>
          </div> 
        </div>
      </div>
    );
  }
}
