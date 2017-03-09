import React from 'react'

export default React.createClass({

	renderReview: function(key) {
    return ( 
      <div key={key} index={key}>{this.props.content[key]}</div> 
    );
  },

	render() {
		return (
			<div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Reviews</h3>
					</div>
      		<div className="panel-body">
            { this.props.content ? (this.props.content).map(this.renderReview) : (<div><p>No review yet.</p></div>) }
      		</div>
      	</div>
			</div>
		)
	}
})