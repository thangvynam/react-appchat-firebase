import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './component/Login/Login';
import firebaseconnect from './firebase/firebaseConnect';
import Home from './component/Home';
import { CHECK_USER } from './contsants/actionType';

class App extends Component {

  componentDidMount() {
    this.props.authListener();
  }
  render() {
    return (
      (this.props.appReducer.user? <Home/> : <Login/>)
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    appReducer: state.appReducer,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authListener() {
      
      firebaseconnect.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch({ type: CHECK_USER, user: user });
        } else {
          dispatch({ type: CHECK_USER, user: null });
        }

      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
