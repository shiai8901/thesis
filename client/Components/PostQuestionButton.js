import React from 'react';

export default class PostQuestionButton extends React.Component {
  render() {
    if (this.props.showButton === true) {
      return (
        <div>
          <p><a onClick={this.props.showQuestionForm} className="btn btn-primary btn-fill btn-lg" role="button">Post a question...</a></p>
          <p>&nbsp;</p>
        </div>    
      );
    } else {
      return (<div></div>);
    }
  }
}
