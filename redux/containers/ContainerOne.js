import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//just call the actions you want to trigger inside this container
//these will be available as props in this container
import { actionOneIncrease, actionOneDecrease } from '../actions/index';

class ContainerOne extends Component {

  componentDidMount() {
    // console.log('this.props.StateOneCurrent', this.props.StateOneCurrent);
  }
  render() {
    return(
      <div className="counter">
        <h3>English Counter</h3>
        <button onClick={()=> this.props.actionOneIncrease()}> actionOneIncrease </button> &nbsp;
        <button onClick={()=> this.props.actionOneDecrease()}> actionOneDecrease </button>
        <p>The result: {this.props.StateOneCurrent} </p>
      </div>
    )
  }
}
//magic happens here. INstead of passing the new state down as props, we just connect it here!!! 
//Reducer returns new state, and we capture it in StateOneCurrent which will be rendered inside this smart component.
const mapStateToProps = state => {
  return {
    StateOneCurrent: state.reducer_One,
  }
}

//this bind all the actions to something that we don't know.
//and we don't know what's being pass here (as dispatch)
const mapDispatchToProps = dispatch => {
  return bindActionCreators( {
    actionOneIncrease,
    actionOneDecrease
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (ContainerOne);
