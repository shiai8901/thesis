import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//just call the actions you want to trigger inside this container
//these will be available as props in this container
import { actionTwoIncrease, actionTwoDecrease } from '../actions/index';

class ContainerTwo extends Component {

  render() {
    return(
      <div className="counter">
        <h3>Spanish Counter</h3>
        <button onClick={()=> this.props.actionTwoIncrease()}> actionTwoIncrease </button> &nbsp;
        <button onClick={()=> this.props.actionTwoDecrease()}> actionTwoDecrease </button>
        <p>The result: {this.props.StateTwoCurrent} </p>
      </div>
    )
  }
}
//magic happens here. INstead of passing the new state down as props, we just connect it here!!! 
//Reducer returns new state, and we capture it in StateOneCurrent which will be rendered inside this smart component.
const mapStateToProps = state => {
  return {
    StateTwoCurrent: state.reducer_Two,
  }
}

//this bind all the actions to something that we don't know.
//and we don't know what's being pass here (as dispatch)
const mapDispatchToProps = dispatch => {
  return bindActionCreators( {
    actionTwoIncrease,
    actionTwoDecrease
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (ContainerTwo);
