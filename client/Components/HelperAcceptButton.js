import React from 'react';

var HelperAcceptButton = React.createClass({

  render: function() {
    return (
      <span>
        
          <button 
            onClick={() => 
              this.props.acceptHelper(
                this.props.details.learnerId, 
                this.props.details.helperId, 
                this.props.details.id
              )
            } className="btn btn-success btn-fill" role="button">Accept
            </button>
        
      </span>
    );
  }
});

export default HelperAcceptButton;
